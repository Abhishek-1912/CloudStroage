export default function SortControl({ sortBy, onChange }) {
  return (
    <div className="flex items-center gap-2 mb-4 text-sm">
      <label className="text-slate-500">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value)}
        className="border border-slate-300 rounded-lg px-2 py-1"
      >
        <option value="name">Name (A-Z)</option>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}