import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import SearchBar from './SearchBar';

const HeaderMobile = ({
  setShowSuggestion,
  searchQuery,
  setSearchQuery,
  setIsInputFocused,
  debouncedSearchQuery,
  openSidebar,
  total,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-custom-light border-b shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b-2">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/icones/logo_kerisnel.png" alt="Logo" className="h-10 md:h-14 w-auto" />
          </a>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsInputFocused={setIsInputFocused}
            setShowSuggestion={setShowSuggestion}
            debouncedSearchQuery={debouncedSearchQuery}
          />

          <div className="flex sm:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white bg-emerald-700 hover:bg-emerald-800"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 sm:hidden">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="fixed inset-0 flex items-start justify-end p-4">
          <Dialog.Panel className="w-full max-w-xs bg-white rounded-lg shadow-lg p-4 space-y-4">
            <div className="flex justify-between items-center border-b-4 pb-4">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <a href="/" className="flex items-center gap-2 text-lg font-medium hover:bg-gray-100 rounded p-2">
              <img src="/icones/logo_kerisnel.png" alt="Logo" className="h-10 w-10" />
              <span>Accueil</span>
            </a>

            <a
              href="/account"
              className="flex gap-2 items-center text-lg font-medium hover:bg-gray-100 rounded p-2"
            >
              <img
                src="/icones/agriculteur.png"
                className="h-10 w-10 object-cover rounded-full border-2 border-green-600 p-1 bg-white"
              />
              <span>Profil</span>
            </a>

            <button
              onClick={() => {
                openSidebar();
                setIsOpen(false);
              }}
              className="relative flex items-center gap-2 text-lg font-medium hover:bg-gray-100 rounded p-2"
            >
              <img
                src="/icones/brouette_vide.png"
                className="h-10 w-10 object-cover rounded-full border-2 border-green-600 p-1 bg-white"
              />
              <span>Panier</span>
              {total > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                  {total} €
                </span>
              )}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </nav>
  );
};

export default HeaderMobile;
