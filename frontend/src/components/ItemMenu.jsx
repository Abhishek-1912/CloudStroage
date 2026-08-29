import { useState, useRef, useEffect } from 'react';

export default function ItemMenu({ onRename, onTrash, onShare, onStarToggle, isStarred }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 px-2 py-1 rounded transition"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10 w-36">
          {onStarToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onStarToggle();
              }}
              className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {isStarred ? '★ Unstar' : '☆ Star'}
            </button>
          )}
          {onShare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onShare();
              }}
              className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Share
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              onRename();
            }}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Rename
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              onTrash();
            }}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Move to Trash
          </button>
        </div>
      )}
    </div>
  );
}