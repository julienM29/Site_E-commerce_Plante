import React, { useEffect, useState, useRef } from 'react';
import { gsap } from "gsap";
import Carroussel from '../shared/Carrousel';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import SideBarPanier from '../shared/sideBarPanier/sideBarPanier';
import SideBarPanier2 from '../shared/sideBarPanier/sideBarPanier2';
function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();  // Hook pour changer de page

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
  const submitSearch = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("Recherche soumise :", searchQuery);
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Met à jour l'URL
    }
  };
  return (
    <>
      {/* Header */}
      <ToastContainer />
      <div className="w-full flex justify-center bg-custom-light border-b shadow-md">
        <div className="flex w-10/12 justify-around items-center py-3">
          {/* Logo section */}
          <div className='w-1/6 flex justify-center'>
          <a href='/' className="flex items-center gap-2">
            <img src="/icones/logo_kerisnel.png" alt="Logo" className=" h-20 w-24" />
          </a>
          </div>
          <div className='flex gap-6 flex-1'>
            <div className="w-2/12 items-center justify-center flex gap-2">
              <button
                type="submit"
                className=" bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-lg  px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out"
              >
                <a href="/search" className='flex gap-2'>
                <span> Les plantes</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg></a>
              </button>
            </div>
            <div className=" relative text-gray-600 focus-within:text-gray-400 w-10/12">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                  onClick={submitSearch}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="py-2 text-lg text-white bg-gray-900 rounded-2xl pl-10  focus:bg-white focus:text-gray-900 w-full"
                placeholder="Rechercher un plant..."
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitSearch(e);
                  }
                }}
              />
            </div>
          </div>
          {/* Icon section */}
          <div className="w-1/6 flex justify-evenly">
            <a href="/account" className="rounded-full border-4 border-green-800 bg-white p-2">
              <img src="/icones/agriculteur.png" alt="Agriculteur" className="object-scale-down h-10 w-10" />
            </a>
            <button type="button" className="rounded-full border-4 border-green-800 bg-white p-2" onClick={openSidebar}>
              <img src="/icones/brouette_vide.png" alt="Brouette vide" className="object-scale-down h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
      < Carroussel />

      <div className={`cursor-pointer fixed inset-0 z-10  transition-opacity duration-500 ${isSidebarOpen ? 'bg-black/40  opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`} onClick={closeSidebar} />

      {/* SideBar */}
      <SideBarPanier2 sidebarRef={sidebarRef} closeSidebar={closeSidebar}/>
    </>
  );
}

export default Header;
