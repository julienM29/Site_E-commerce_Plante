import React, { useEffect, useState, useRef } from 'react';
import logoKerisnel from '../assets/images/plante.png';
import logoProfil from '../assets/icones/agriculteur.png';
import logoPanier from '../assets/icones/brouette_vide.png';
import LogoProduit from '../assets/images/jardin.avif'
import BarreLivraisonGratuite from './BarreLivraisonGratuite';
import ConteneurProduitPanier from './ConteneurProduitPanier';
import { gsap } from "gsap";

function Header() {
  const [message, setMessage] = useState('');
  const sidebarRef = useRef(null);

  // Fonction pour ouvrir la sidebar
  const openSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: 0, // Déplace la sidebar en position visible
      duration: 0.5, // Durée de l'animation
      ease: "power3.out", // Ease pour une animation fluide
    });
  };

  // Fonction pour fermer la sidebar
  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "+100%", // Déplace la sidebar hors de l'écran
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  return (
    <>
              {/* Header */}
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
            <button type="button" className="rounded-full border-4 border-green-800 bg-white p-2" onClick={openSidebar}>
              <img src={logoPanier} alt="Brouette vide" className="object-scale-down h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
              {/* SideBar */}
      <div ref={sidebarRef} className="fixed flex flex-col items-center top-0 right-0 w-1/5 bg-white h-screen border-l shadow-lg transform translate-x-full z-20">
          {/* En tête de la side barre */}
          <div className="w-full flex items-center justify-around h-[10%] bg-custom-light px-4 py-2">
            <div className="text-3xl font-semibold tracking-wide flex gap-2">
              <p>Panier</p>
              <p> - Nombre produit</p>
            </div>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

          </div>
          {/* Contenu */}
          <div className='w-11/12 flex flex-col gap-2 py-4'>
            <BarreLivraisonGratuite prixPanier='17'></BarreLivraisonGratuite>
            <ConteneurProduitPanier imgProduit={LogoProduit} prixTotalProduit='20' nomProduit='Arbre à papillions' quantiteProduit='2'></ConteneurProduitPanier>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow justify-center w-full">

        </div>
      </div>
    </>
  );
}

export default Header;
