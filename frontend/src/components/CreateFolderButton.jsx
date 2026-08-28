import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createFolder } from '../services/folderService';

export default function CreateFolderButton({ parentFolderId }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createFolder(name, parentFolderId ?? null);
    setName('');
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ['folder', parentFolderId ?? 'root'] });
  };

  return (
    <div className="mb-4">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + New Folder
        </button>
      ) : (
        <form onSubmit={handleCreate} className="flex gap-2 items-center">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Folder name"
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="text-sm bg-blue-600 text-white px-3 py-2 rounded-lg">
            Create
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm text-slate-500 px-2"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}