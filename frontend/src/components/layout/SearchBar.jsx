import React from 'react';

const SearchBar = ({searchQuery, setSearchQuery, setIsInputFocused, setShowSuggestion, debouncedSearchQuery}) => {
    const submitSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
      };
      const handleFocus = () => setIsInputFocused(true);

      const handleBlur = (e) => {
        // Laisser l'input ouvert si on clique sur une suggestion
        if (!e.relatedTarget || !e.relatedTarget.closest('.suggestion-item')) {
          setIsInputFocused(false);
          if (!debouncedSearchQuery.trim()) {
            setTimeout(() => setShowSuggestion(false), 200);
          }
        }
      };
    return (
        <div className="flex-1 mx-6">
        <form onSubmit={submitSearch} className="relative search-container">
          <input
            type="search"
            placeholder="Que cherchez-vous aujourd'hui ? 🌱"
            className="py-2 pl-10 pr-4 w-full rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:outline-none focus:border-green-600
                    focus:ring-green-600 border border-green-700 transition-all hover:bg-white hover:ring-1 hover:ring-green-500 duration-300 ease-in-out transform focus:scale-[1.01]"
            value={searchQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 hover:scale-110 transition-transform">
            🔍
          </button>
        </form>
      </div>
    
    );
};

export default SearchBar;
