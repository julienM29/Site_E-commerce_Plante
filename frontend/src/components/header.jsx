import React, { useEffect, useState } from 'react';
import logoKerisnel from '../assets/images/plante.png';
import logoProfil from '../assets/icones/agriculteur.png';
import logoPanier from '../assets/icones/brouette_vide.png';

function Header() {
  const [message, setMessage] = useState('');
  

  return (
    <>
      <div className="w-full flex justify-center bg-custom-green">
        <div className="flex w-11/12 gap-8 items-center py-2">
          {/* Logo section */}
          <a href='/' className="flex items-center gap-2">
            <img src={logoKerisnel} alt="Logo" className="object-scale-down h-12 w-12" />
            <p className="text-3xl">Kerisnel</p>
          </a>

          {/* Form section with search bar */}
          <form method="GET" className="flex-1">
            <div className="relative text-gray-600 focus-within:text-gray-400 w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="py-2 text-lg text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
          </form>

          {/* Icon section */}
          <div className="flex gap-2">
            <a href="/login" className="rounded-full border-4 border-green-800 bg-white p-2">
              <img src={logoProfil} alt="Agriculteur" className="object-scale-down h-10 w-10" />
            </a>
            <a href="#" className="rounded-full border-4 border-green-800 bg-white p-2">
              <img src={logoPanier} alt="Brouette vide" className="object-scale-down h-10 w-10" />
            </a>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Header;
