import { Link } from 'react-router-dom';
import { useState } from 'react';
import ItemMenu from './ItemMenu';

function FolderIcon() {
  return (
    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function FolderGrid({
  folders,
  files,
  onFileClick,
  onShareClick,
  onRenameFolder,
  onTrashFolder,
  onRenameFile,
  onTrashFile,
  onStarToggle
}) {
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  const startRename = (id, currentName) => {
    setRenamingId(id);
    setRenameValue(currentName);
  };

  const submitRename = (isFolder, id) => {
    if (renameValue.trim()) {
      if (isFolder) onRenameFolder(id, renameValue.trim());
      else onRenameFile(id, renameValue.trim());
    }
    setRenamingId(null);
  };

  if (folders.length === 0 && files.length === 0) {
    return <p className="text-slate-400 text-sm mt-8">This folder is empty.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="relative group flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition"
        >
          <div className="absolute top-2 right-2">
            <ItemMenu
              onRename={() => startRename(folder.id, folder.name)}
              onTrash={() => onTrashFolder(folder.id)}
            />
          </div>
          {renamingId === folder.id ? (
            <>
              <FolderIcon />
              <input
                autoFocus
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={() => submitRename(true, folder.id)}
                onKeyDown={(e) => e.key === 'Enter' && submitRename(true, folder.id)}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-center border border-blue-300 rounded px-1 w-full"
              />
            </>
          ) : (
            <Link to={`/drive/${folder.id}`} className="flex flex-col items-center gap-2 w-full">
              <FolderIcon />
              <span className="text-sm text-slate-700 text-center truncate w-full">
                {folder.name}
              </span>
            </Link>
          )}
        </div>
      ))}

      {files.map((file) => (
        <div
          key={file.id}
          className="relative group flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition"
        >
          <div className="absolute top-2 right-2">
<ItemMenu
  onShare={() => onShareClick(file)}
  onRename={() => startRename(file.id, file.name)}
  onTrash={() => onTrashFile(file.id)}
  onStarToggle={() => onStarToggle(file)}
  isStarred={file.starred}
/>
          </div>
          {renamingId === file.id ? (
            <>
              <FileIcon />
              <input
                autoFocus
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={() => submitRename(false, file.id)}
                onKeyDown={(e) => e.key === 'Enter' && submitRename(false, file.id)}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-center border border-blue-300 rounded px-1 w-full"
              />
            </>
          ) : (
            <button
              onClick={() => onFileClick(file)}
              className="flex flex-col items-center gap-2 w-full"
            >
              <FileIcon />
              <span className="text-sm text-slate-700 text-center truncate w-full">
                {file.name}
              </span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}