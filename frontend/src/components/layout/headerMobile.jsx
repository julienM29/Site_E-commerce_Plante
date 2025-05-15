import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BottomSheetFilterSearch from '../shared/BottomSheetPanier/BottomSheetFilterSearch';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { openBottomSheet, closeBottomSheet } from '../../bottomSheet';
import { setAllFilters } from '../../filterSlice';

const HeaderMobile = ({
  setShowSuggestion,
  setIsInputFocused,
  debouncedSearchQuery,
  openSidebar,
  total,
  isMobile
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.bottomSheet.isOpen);
  const [searchVisible, setSearchVisible] = useState(false);
  const filters = useSelector((state) => state.filters);
  const navigate = useNavigate();

  const handleSetFilter = (newFilters) => {
    dispatch(setAllFilters(newFilters));
  };

  const searchByParams = async () => {
    try {
      let urlQuery = "?";
      for (const [key, value] of Object.entries(filters)) {
        if (value !== null) {
          urlQuery += `${key}=${encodeURIComponent(value)}&`;
        }
      }
      urlQuery = urlQuery.slice(0, -1);
      navigate(`/search${urlQuery}`);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

  return (
    <nav className="bg-custom-header  sticky top-0 z-50 shadow-md ">
        <div className="w-full flex flex-col items-center gap-2  py-5 px-4">
          <div className="flex w-full justify-between ">
            <a href="/" aria-label="Accueil" className="flex items-center">
              <img src="/icones/logo_kerisnel.png" alt="Logo Kerisnel" className="h-10 w-12" />
            </a>
            <div className='flex gap-6'>
            <button onClick={openSidebar} aria-label="Panier" className="relative">
              <img
                src="/icones/brouette_vide.png"
                alt="Panier"
                className="h-9 w-9 object-cover rounded-full border border-green-800 bg-white p-1"
              />
              {total > 0 && (
                <span className="absolute -top-3 -right-5 bg-red-500 text-white text-[10px] font-semibold min-w-[20px] h-5 px-[4px] flex items-center justify-center rounded-full shadow-md leading-none">
                  {total} €
                </span>

              )}
            </button>

            <a href="/account" aria-label="Mon compte">
              <img
                src="/icones/agriculteur.png"
                alt="Compte"
                className="h-9 w-9 object-cover rounded-full border border-green-800 bg-white p-1"
              />
            </a>
            </div>
          </div>
          <div className="flex w-full gap-6">
          <button
              onClick={() => dispatch(openBottomSheet())}
              aria-label="Menu"
              className="p-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          <SearchBar
              filters={filters}
              setIsInputFocused={setIsInputFocused}
              setShowSuggestion={setShowSuggestion}
              debouncedSearchQuery={debouncedSearchQuery}
              setSearchVisible={setSearchVisible}
              isMobile={isMobile}
            />
            </div>
        </div>

      {/* BottomSheet pour les filtres */}
      <BottomSheetFilterSearch
        openSheet={isOpen}
        handleClose={() => dispatch(closeBottomSheet())}
        handleSetFilter={handleSetFilter}
        filters={filters}
        isMobile={isMobile}
        searchByParams={searchByParams}
      />
    </nav>
  );
};

export default HeaderMobile;
