import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import { getStarred, unstarFile } from '../services/starService';
import { useQueryClient } from '@tanstack/react-query';

export default function StarredPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['starred'],
    queryFn: getStarred,
  });

  const handleUnstar = async (fileId) => {
    await unstarFile(fileId);
    queryClient.invalidateQueries({ queryKey: ['starred'] });
  };

  const handleOpen = (file) => {
    window.open(file.downloadUrl, '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Starred</h2>

        {isLoading && <p className="text-slate-400 text-sm">Loading...</p>}
        {error && <p className="text-red-600 text-sm">Failed to load starred files.</p>}
        {data && data.data.length === 0 && (
          <p className="text-slate-400 text-sm">No starred files yet.</p>
        )}

        {data && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.data.map((file) => (
              <div
                key={file.id}
                className="relative group flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition"
              >
                <button
                  onClick={() => handleUnstar(file.id)}
                  className="absolute top-2 right-2 text-amber-500 hover:text-amber-600"
                  title="Unstar"
                >
                  ★
                </button>
                <button onClick={() => handleOpen(file)} className="flex flex-col items-center gap-2 w-full">
                  <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-slate-700 text-center truncate w-full">{file.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}