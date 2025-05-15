import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';

const HeaderDesktop = ({setShowSuggestion, openSidebar, setIsInputFocused, debouncedSearchQuery, total, isMobile}) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

    return (
        <div className="w-full md:h-[75px] h-[60px] flex justify-center items-center bg-custom-header  shadow-md">
        <div className="flex items-center w-full max-w-7xl px-4 justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/icones/logo_kerisnel.png" alt="Logo" className="h-10 md:h-14 w-auto" />
          </a>

          <div className="flex-1 mx-6">
          <SearchBar
              filters={filters}
              setIsInputFocused={setIsInputFocused}
              setShowSuggestion={setShowSuggestion}
              debouncedSearchQuery={debouncedSearchQuery}
              isMobile={isMobile}

            />          
            </div>
          <div>
          </div>
          <div className="flex items-center gap-4 relative">
            

            <button onClick={openSidebar} className="relative">
              <img src="/icones/brouette_vide.png" className="h-12 w-12 object-cover rounded-full border border-green-800 p-1 bg-white hover:border-green-900" />
              {total > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">{total} €</span>
              )}
            </button>
            <a href="/account">
              <img src="/icones/agriculteur.png" className="h-12 w-12 object-cover rounded-full border border-green-800 p-1 bg-white hover:border-green-900" />
            </a>
          </div>
        </div>
      </div>
    
    );
};

export default HeaderDesktop;
