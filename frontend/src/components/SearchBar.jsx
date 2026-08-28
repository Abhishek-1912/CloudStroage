import { useState } from 'react';

export default function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search files and folders..."
        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-slate-500 px-2 hover:text-slate-800"
        >
          Clear
        </button>
      )}
    </form>
  );
}