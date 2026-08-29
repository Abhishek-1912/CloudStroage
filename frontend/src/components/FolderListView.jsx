import { Link } from 'react-router-dom';
import ItemMenu from './ItemMenu';

export default function FolderListView({
  folders,
  files,
  onFileClick,
  onShareClick,
  onRenameFolder,
  onTrashFolder,
  onRenameFile,
  onTrashFile,
  onStarToggle,
}) {
  if (folders.length === 0 && files.length === 0) {
    return <p className="text-slate-400 text-sm mt-8">This folder is empty.</p>;
  }

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 text-left">
          <tr>
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium w-32">Type</th>
            <th className="px-4 py-2 font-medium w-12"></th>
          </tr>
        </thead>
        <tbody>
          {folders.map((folder) => (
            <tr key={folder.id} className="border-t border-slate-100 hover:bg-slate-50 group">
              <td className="px-4 py-2">
                <Link to={`/drive/${folder.id}`} className="text-slate-700 hover:underline">
                  📁 {folder.name}
                </Link>
              </td>
              <td className="px-4 py-2 text-slate-400">Folder</td>
              <td className="px-4 py-2">
                <ItemMenu
                  onRename={() => {
                    const newName = prompt('Rename folder to:', folder.name);
                    if (newName) onRenameFolder(folder.id, newName);
                  }}
                  onTrash={() => onTrashFolder(folder.id)}
                />
              </td>
            </tr>
          ))}
          {files.map((file) => (
            <tr key={file.id} className="border-t border-slate-100 hover:bg-slate-50 group">
              <td className="px-4 py-2">
                <button onClick={() => onFileClick(file)} className="text-slate-700 hover:underline">
                  📄 {file.name}
                </button>
              </td>
              <td className="px-4 py-2 text-slate-400">{file.mimeType || 'File'}</td>
              <td className="px-4 py-2">
                <ItemMenu
                  onShare={() => onShareClick(file)}
                  onRename={() => {
                    const newName = prompt('Rename file to:', file.name);
                    if (newName) onRenameFile(file.id, newName);
                  }}
                  onTrash={() => onTrashFile(file.id)}
                  onStarToggle={() => onStarToggle(file)}
                  isStarred={file.starred}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}