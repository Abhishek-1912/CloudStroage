import { Link } from 'react-router-dom';

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

export default function FolderGrid({ folders, files, onFileClick, onShareClick }) {
  if (folders.length === 0 && files.length === 0) {
    return <p className="text-slate-400 text-sm mt-8">This folder is empty.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {folders.map((folder) => (
        <Link
          key={folder.id}
          to={`/drive/${folder.id}`}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition"
        >
          <FolderIcon />
          <span className="text-sm text-slate-700 text-center truncate w-full">
            {folder.name}
          </span>
        </Link>
      ))}

      {files.map((file) => (
  <div
    key={file.id}
    className="relative group flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition"
  >
    <button onClick={() => onFileClick(file)} className="flex flex-col items-center gap-2 w-full">
      <FileIcon />
      <span className="text-sm text-slate-700 text-center truncate w-full">{file.name}</span>
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onShareClick(file);
      }}
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-xs bg-white border border-slate-200 rounded-full px-2 py-1 hover:bg-slate-100 transition"
    >
      Share
    </button>
  </div>
))}
    </div>
  );
}