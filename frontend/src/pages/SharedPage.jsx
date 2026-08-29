import { useQuery } from '@tanstack/react-query';
import PageLayout from '../components/PageLayout';
import { getSharedWithMe } from '../services/shareService';

export default function SharedPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['sharedWithMe'],
    queryFn: getSharedWithMe,
  });

  const handleOpen = (file) => {
    window.open(file.downloadUrl, '_blank');
  };

  return (
    <PageLayout>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Shared with me</h2>

      {isLoading && <p className="text-slate-400 text-sm">Loading...</p>}
      {error && <p className="text-red-600 text-sm">Failed to load shared files.</p>}
      {data && data.data.length === 0 && (
        <p className="text-slate-400 text-sm">No files have been shared with you yet.</p>
      )}

      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.data.map((file) => (
            <button
              key={file.id}
              onClick={() => handleOpen(file)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition"
            >
              <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-slate-700 text-center truncate w-full">{file.name}</span>
            </button>
          ))}
        </div>
      )}
    </PageLayout>
  );
}