import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

const HeaderDesktop = ({setShowSuggestion, openSidebar, searchQuery, setSearchQuery, setIsInputFocused, debouncedSearchQuery, total}) => {

    return (
        <div className="w-full md:h-[75px] h-[60px] flex justify-center items-center bg-custom-light border-b shadow-md">
        <div className="flex items-center w-full max-w-7xl px-4 justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/icones/logo_kerisnel.png" alt="Logo" className="h-10 md:h-14 w-auto" />
          </a>

          <div className="flex-1 mx-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsInputFocused={setIsInputFocused} setShowSuggestion={setShowSuggestion} debouncedSearchQuery={debouncedSearchQuery}/>
          </div>
          <div>
          </div>
          <div className="flex items-center gap-4 relative">
            <a href="/account">
              <img src="/icones/agriculteur.png" className="h-12 w-12 object-cover rounded-full border-2 border-green-600 p-1 bg-white hover:border-green-700" />
            </a>

            <button onClick={openSidebar} className="relative">
              <img src="/icones/brouette_vide.png" className="h-12 w-12 object-cover rounded-full border-2 border-green-600 p-1 bg-white hover:border-green-700" />
              {total > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">{total} €</span>
              )}
            </button>
          </div>
        </div>
      </div>
    
    );
};

export default HeaderDesktop;
