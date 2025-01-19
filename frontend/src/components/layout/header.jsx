import React, { useEffect, useState, useRef } from 'react';
import BarreLivraisonGratuite from '../shared/BarreLivraisonGratuite';
import ConteneurProduitPanier from '../shared/ConteneurProduitPanier';
import { gsap } from "gsap";

function Header() {
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);

  // Lors de l'ouverture/fermeture de la sidebar, on modifie le style du body
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'; // Désactive le scroll
    } else {
      document.body.style.overflow = ''; // Restaure le scroll
    }

    // Nettoyage au démontage du composant
    return () => {
      document.body.style.overflow = ''; // Restaure le scroll si le composant est démonté
    };
  }, [isSidebarOpen]); // Le hook se déclenche chaque fois que `isSidebarOpen` change
  // Fonction pour ouvrir la sidebar
  const openSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: 0, // Déplace la sidebar en position visible
      duration: 0.5, // Durée de l'animation
      ease: "power3.out", // Ease pour une animation fluide
    });
    setIsSidebarOpen(true);
  };

  // Fonction pour fermer la sidebar
  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "+100%", // Déplace la sidebar hors de l'écran
      duration: 0.5,
      ease: "power3.inOut",
    });
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Header */}
      <div className="w-full flex justify-center bg-custom-green">
        <div className="flex w-11/12 gap-8 items-center py-2">
          {/* Logo section */}
          <a href='/' className="flex items-center gap-2">
            <img src="images/plante.png" alt="Logo" className="object-scale-down h-12 w-12" />
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
              <img src="icones/agriculteur.png" alt="Agriculteur" className="object-scale-down h-10 w-10" />
            </a>
            <button type="button" className="rounded-full border-4 border-green-800 bg-white p-2" onClick={openSidebar}>
              <img src="icones/brouette_vide.png" alt="Brouette vide" className="object-scale-down h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
      <div className={`cursor-pointer fixed inset-0 z-10  transition-opacity duration-500 ${isSidebarOpen ? 'bg-black/40  opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`} onClick={closeSidebar} />

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
            onClick={closeSidebar}
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
        <div className="w-11/12 h-3/4 flex flex-col gap-2 py-4 overflow-y-auto overflow-x-hidden scrollbar-none ">
          <BarreLivraisonGratuite prixPanier='17'></BarreLivraisonGratuite>
          <ConteneurProduitPanier imgProduit="jardin.avif" prixTotalProduit='20' nomProduit='Arbre à papillions' quantiteProduit='2'></ConteneurProduitPanier>
          <ConteneurProduitPanier imgProduit="jardin.avif" prixTotalProduit='20' nomProduit='Arbre à papillions' quantiteProduit='2'></ConteneurProduitPanier>
          <ConteneurProduitPanier imgProduit="jardin.avif" prixTotalProduit='20' nomProduit='Arbre à papillions' quantiteProduit='2'></ConteneurProduitPanier>
          <ConteneurProduitPanier imgProduit="jardin.avif" prixTotalProduit='20' nomProduit='Arbre à papillions' quantiteProduit='2'></ConteneurProduitPanier>
          <ConteneurProduitPanier imgProduit="jardin.avif" prixTotalProduit='20' nomProduit='Arbre à papillions' quantiteProduit='2'></ConteneurProduitPanier>
          <ConteneurProduitPanier imgProduit="jardin.avif" prixTotalProduit='20' nomProduit='Arbre à papillions' quantiteProduit='2'></ConteneurProduitPanier>
        </div>
        <div className='h-[15%] bg-custom-light w-full flex flex-col gap-4 justify-center items-center'>
          
          <button type="submit" className="w-3/4 font-bold flex justify-center bg-gradient-to-r from-emerald-600 to-emerald-300 hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-400  text-white rounded-full text-md px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out">
            <a href="/panier">Aller au panier - 49euros</a>
          </button>
          <button onClick={closeSidebar} className="w-3/4 flex justify-center items-center font-semibold  text-md text-emerald-600 underline-offset-4 hover:underline">
            Continuer vos achats 
            
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
