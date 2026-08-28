import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import FolderGrid from '../components/FolderGrid';
import CreateFolderButton from '../components/CreateFolderButton';
import UploadZone from '../components/UploadZone';
import ShareModal from '../components/ShareModal';
import SearchBar from '../components/SearchBar';
import SortControl from '../components/SortControl';
import { getRootContents, getFolderContents } from '../services/folderService';
import { search } from '../services/searchService';

function sortItems(items, sortBy) {
  const copy = [...items];
  if (sortBy === 'name') {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'newest') {
    copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === 'oldest') {
    copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  return copy;
}

export default function DrivePage() {
  const { folderId } = useParams();
  const [trail, setTrail] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [sharingFile, setSharingFile] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['folder', folderId ?? 'root'],
    queryFn: () => (folderId ? getFolderContents(folderId) : getRootContents()),
    enabled: !searchResults,
  });

  useEffect(() => {
    if (!folderId) {
      setTrail([]);
    } else if (data?.data?.currentFolder) {
      const current = data.data.currentFolder;
      setTrail((prev) => {
        const existingIndex = prev.findIndex((t) => t.id === current.id);
        if (existingIndex !== -1) return prev.slice(0, existingIndex + 1);
        return [...prev, { id: current.id, name: current.name }];
      });
    }
  }, [folderId, data]);

  const handleFileClick = (file) => {
    const isPreviewable =
      file.mimeType?.startsWith('image/') || file.mimeType === 'application/pdf';
    if (isPreviewable) {
      setPreviewFile(file);
    } else {
      window.open(file.downloadUrl, '_blank');
    }
  };

  const handleSearch = async (query) => {
    setSearching(true);
    try {
      const res = await search(query);
      setSearchResults(res.data);
    } finally {
      setSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults(null);
  };

  const activeFolders = searchResults ? searchResults.folders : data?.data?.folders ?? [];
  const activeFiles = searchResults ? searchResults.files : data?.data?.files ?? [];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

        {!searchResults && <Breadcrumbs trail={trail} />}
        {searchResults && (
          <p className="text-sm text-slate-500 mb-4">
            Showing search results ({searchResults.totalFolders + searchResults.totalFiles} found)
          </p>
        )}

        {!searchResults && <CreateFolderButton parentFolderId={folderId} />}
        {!searchResults && <UploadZone folderId={folderId} />}

        <SortControl sortBy={sortBy} onChange={setSortBy} />

        {(isLoading || searching) && <p className="text-slate-400 text-sm">Loading...</p>}
        {error && <p className="text-red-600 text-sm">Failed to load folder contents.</p>}

        <FolderGrid
          folders={sortItems(activeFolders, sortBy)}
          files={sortItems(activeFiles, sortBy)}
          onFileClick={handleFileClick}
          onShareClick={setSharingFile}
        />
      </main>

      {previewFile && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="bg-white rounded-xl p-4 max-w-4xl max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-slate-800">{previewFile.name}</h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-slate-700 text-xl leading-none"
              >
                ✕
              </button>
            </div>
            {previewFile.mimeType?.startsWith('image/') ? (
              <img
                src={previewFile.downloadUrl}
                alt={previewFile.name}
                className="max-w-full max-h-[75vh]"
              />
            ) : (
              <iframe
                src={previewFile.downloadUrl}
                title={previewFile.name}
                className="w-[80vw] h-[75vh]"
              />
            )}
          </div>
        </div>
      )}

      {sharingFile && <ShareModal file={sharingFile} onClose={() => setSharingFile(null)} />}
    </div>
  );
}