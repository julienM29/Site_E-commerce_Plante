import React, { useEffect, useState, useRef } from 'react';
import { gsap } from "gsap";
import Carroussel from '../shared/Carrousel';
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import SideBarPanier2 from '../shared/sideBarPanier/sideBarPanier2';
import Suggestion from '../shared/inputSearch/Suggestion';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // État pour suivre si l'input est focus

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [dataPlantsSuggestion, setDataPlantsSuggestion] = useState([]);

  const navigate = useNavigate();  // Hook pour changer de page
  const location = useLocation();

  const sidebarRef = useRef(null);
  const { total } = useSelector((state) => state.myState);

  // Fonction de gestion de navigation
  const handleNavigation = () => {
    if (location.pathname === "/panier") {
      navigate("/panier");
    } else {
      openSidebar();
    }
  };

  // Fonction d'ouverture de la sidebar
  const openSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    setIsSidebarOpen(true);
  };

  // Fonction de fermeture de la sidebar
  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "+100%",
      duration: 0.5,
      ease: "power3.inOut",
    });
    setIsSidebarOpen(false);
  };

  // Fonction pour soumettre la recherche
  const submitSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Fonction pour rechercher les plantes via une API
  const searchByText = async () => {
    if (debouncedSearchQuery.trim() === '') return; // Ne faire aucune recherche si le texte est vide

    try {
      const response = await fetch(`http://localhost:3000/getSuggestion/${debouncedSearchQuery}`, { method: "POST", credentials: "include" });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      console.log('bonjour data : ', data.products)
      setDataPlantsSuggestion(data.products || []);
    } catch (error) {
      console.error('Erreur lors du chargement des plantes:', error);
    }
  };

  // Utilisation de useEffect pour gérer le debounce sur le searchQuery
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== '') {
        setDebouncedSearchQuery(searchQuery);
      } else {
        setDebouncedSearchQuery('');
      }
    }, 800);

    return () => clearTimeout(timer); // Nettoyer le timer lors du changement du searchQuery
  }, [searchQuery]);

  // Utilisation de useEffect pour lancer la recherche dès que debouncedSearchQuery change
  useEffect(() => {
    if (debouncedSearchQuery && isInputFocused) {
      setShowSuggestion(true);
      searchByText();
    } else {
      setShowSuggestion(false); // Fermer les suggestions si l'input est vide ou pas focus
    }
  }, [debouncedSearchQuery, isInputFocused]);

  const handleFocus = () => {
    setIsInputFocused(true);  // Marquer l'input comme étant focus
  };

  const handleBlur = () => {
    setIsInputFocused(false); // Marquer l'input comme perdu de focus

    // Si le champ de recherche est vide, fermer les suggestions
    if (!debouncedSearchQuery.trim()) {
      setShowSuggestion(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Remplir l'input avec la suggestion
    setShowSuggestion(false);   // Fermer les suggestions
    navigate(`/search?q=${encodeURIComponent(suggestion)}`); // Aller à la page de recherche
  };

  // Fermeture des suggestions si l'utilisateur clique à l'extérieur
  useEffect(() => {
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowSuggestion(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <ToastContainer />
      <div className="w-full h-[85px] flex justify-center bg-custom-light border-b shadow-md">
        <div className="flex w-10/12 justify-around items-center">
          {/* Logo section */}
          <div className='w-1/6 flex justify-center'>
            <a href='/' className="flex items-center gap-2">
              <img src="/icones/logo_kerisnel.png" alt="Logo" className=" h-20 w-24" />
            </a>
          </div>
          <div className='flex gap-6 flex-1'>
            {/* Button to navigate */}
            <div className="w-2/12 items-center justify-center flex gap-2">
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-lg px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out"
              >
                <a href="/search" className='flex gap-2'>
                  <span> Les plantes</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </button>
            </div>

            {/* Search input */}
            <div className="relative text-gray-600 focus-within:text-gray-400 w-10/12 search-container">
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
                className="py-2 text-lg text-white bg-gray-900 rounded-2xl pl-10 focus:bg-white focus:text-gray-900 w-full"
                placeholder="Rechercher un plant..."
                autoComplete="off"
                value={searchQuery}
                onFocus={handleFocus}  
                onBlur={handleBlur}
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
<button
      type="button"
      className={`rounded-full border-4 ${total > 0 ? 'border-red-700' : 'border-green-800'} bg-white p-2`}
      onClick={handleNavigation}
    >
      <img src="/icones/brouette_vide.png" alt="Brouette vide" className="object-scale-down h-10 w-10" />
    </button>

          </div>
        </div>
      </div>

      {/* Carrousel */}
      <Carroussel />

      {/* Suggestions de recherche */}
      {showSuggestion && dataPlantsSuggestion.length > 0 && (
        <Suggestion 
          data={dataPlantsSuggestion} 
          onClick={handleSuggestionClick} 
        />
      )}

      {/* Sidebar */}
      <div className={`cursor-pointer fixed inset-0 z-10  transition-opacity duration-500 ${isSidebarOpen ? 'bg-black/40 opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`} onClick={closeSidebar} />
      <SideBarPanier2 sidebarRef={sidebarRef} closeSidebar={closeSidebar} />
    </>
  );
}

export default Header;
