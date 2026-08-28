import { useQuery, useQueryClient } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import { getTrash } from '../services/trashService';
import api from '../services/api';

export default function TrashPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['trash'],
    queryFn: getTrash,
  });

  const restoreFolder = async (id) => {
    await api.post(`/api/folders/${id}/restore`);
    queryClient.invalidateQueries({ queryKey: ['trash'] });
  };

  const restoreFile = async (id) => {
    await api.post(`/api/files/${id}/restore`);
    queryClient.invalidateQueries({ queryKey: ['trash'] });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Trash</h2>

        {isLoading && <p className="text-slate-400 text-sm">Loading...</p>}
        {error && <p className="text-red-600 text-sm">Failed to load trash.</p>}

        {data && data.data.folders.length === 0 && data.data.files.length === 0 && (
          <p className="text-slate-400 text-sm">Trash is empty.</p>
        )}

        {data && (
          <div className="space-y-2">
            {data.data.folders.map((folder) => (
              <div
                key={folder.id}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
              >
                <span className="text-sm text-slate-700">📁 {folder.name}</span>
                <button
                  onClick={() => restoreFolder(folder.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Restore
                </button>
              </div>
            ))}
            {data.data.files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
              >
                <span className="text-sm text-slate-700">📄 {file.name}</span>
                <button
                  onClick={() => restoreFile(file.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}