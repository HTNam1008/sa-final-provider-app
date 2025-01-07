import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search payments by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;