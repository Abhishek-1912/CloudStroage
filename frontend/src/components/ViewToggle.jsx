export default function ViewToggle({ view, onChange }) {
  return (
    <div className="inline-flex border border-slate-300 rounded-lg overflow-hidden text-sm">
      <button
        onClick={() => onChange('grid')}
        className={`px-3 py-1.5 ${view === 'grid' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}
      >
        Grid
      </button>
      <button
        onClick={() => onChange('list')}
        className={`px-3 py-1.5 ${view === 'list' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}
      >
        List
      </button>
    </div>
  );
}