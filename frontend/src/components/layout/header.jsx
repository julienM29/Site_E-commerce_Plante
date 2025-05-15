import React, { useEffect, useState, useRef } from 'react';
import { gsap } from "gsap";
import Carroussel from '../shared/Carrousel';

import { ToastContainer } from 'react-toastify';
import SideBarPanier2 from '../shared/sideBarPanier/sideBarPanier2';
import Suggestion from '../shared/inputSearch/Suggestion';
import { useDispatch, useSelector } from 'react-redux';
import HeaderDesktop from './headerDesktop';
import HeaderMobile from './headerMobile';
import { useMediaQuery } from 'react-responsive'; // ou un custom hook
import { useNavigate } from "react-router-dom";
import BottomSheetPanier from '../shared/BottomSheetPanier/BottomSheetPanier';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBottomSheetPanierOpen, setIsBottomSheetPanierOpen] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [dataPlantsSuggestion, setDataPlantsSuggestion] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false); // État pour suivre si l'input est focus
  const [selectedIndex, setSelectedIndex] = useState(null); // Index de la suggestion sélectionnée
  const [loading, setLoading] = useState(false); // État de chargement des suggestions
  const filters = useSelector((state) => state.filters);

  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const { total } = useSelector((state) => state.myState);
  const isDesktop = useMediaQuery({ minWidth: 768 }); // md: breakpoint de Tailwind
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // Fonction d'ouverture de la sidebar
  const openSidebar = () => {

    if (isDesktop) {
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      setIsSidebarOpen(true);
    } else {
      setIsBottomSheetPanierOpen(true);
    }
  };

  // Fonction de fermeture de la sidebar
  const closeSidebar = () => {
    if (isDesktop) {
      gsap.to(sidebarRef.current, {
        x: "+100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
      setIsSidebarOpen(false);
    } else {
      setIsBottomSheetPanierOpen(false);

    }

  };

  // Fonction de recherche avec l'API
  const searchByText = async () => {
    if (debouncedSearchQuery.trim() === '') return;

    setLoading(true); // Lancer le chargement des suggestions
    try {
      const response = await fetch(`http://localhost:3000/getSuggestion/${debouncedSearchQuery}`, { method: "POST", credentials: "include" });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setDataPlantsSuggestion(data.products || []);
    } catch (error) {
      console.error('Erreur lors du chargement des plantes:', error);
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };


  // Utilisation de useEffect pour gérer le debounce sur le searchQuery
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.text !== '') {
        setDebouncedSearchQuery(filters.text);
      } else {
        setDebouncedSearchQuery('');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [filters.text]);

  // Utilisation de useEffect pour lancer la recherche dès que debouncedSearchQuery change
  useEffect(() => {
    if (debouncedSearchQuery && isInputFocused) {
      setShowSuggestion(true);
      searchByText();
    } else {
      setShowSuggestion(false);
    }
  }, [debouncedSearchQuery, isInputFocused]);

  // Gestionnaire pour les suggestions
  const handleSuggestionClick = (suggestion) => {
    navigate(`/produit/${suggestion}`);
    setShowSuggestion(false);  // Fermer la suggestion après sélection
  };
  // Gestion des touches du clavier pour la navigation dans les suggestions
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && selectedIndex < dataPlantsSuggestion.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    } else if (e.key === "Enter" && selectedIndex !== null) {
      handleSuggestionClick(dataPlantsSuggestion[selectedIndex].nom);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      <ToastContainer />
      {isDesktop ?
        <HeaderDesktop setShowSuggestion={setShowSuggestion}
          openSidebar={openSidebar}
          setIsInputFocused={setIsInputFocused}
          debouncedSearchQuery={debouncedSearchQuery}
          total={total}
          isMobile={isMobile}
        />
        :
        <HeaderMobile
          setShowSuggestion={setShowSuggestion}
          openSidebar={openSidebar}
          setIsInputFocused={setIsInputFocused}
          debouncedSearchQuery={debouncedSearchQuery}
          total={total}
          isMobile={isMobile}
        />
      }

      <Carroussel taille={isDesktop ? 'text-lg' : 'text-sm'} />

       
      {showSuggestion && (
        <Suggestion
          data={dataPlantsSuggestion}
          onClickSuggestion={handleSuggestionClick}  // Ajoutez cette prop à votre composant Suggestion
        />
      )}

      <div className={`cursor-pointer fixed inset-0 z-10 transition-opacity duration-500 ${isSidebarOpen ? 'bg-black/40 opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`} onClick={closeSidebar} />
      <SideBarPanier2 sidebarRef={sidebarRef} closeSidebar={closeSidebar} />
      <BottomSheetPanier closeSidebar={closeSidebar} isOpen={isBottomSheetPanierOpen} />

    </>
  );
}

export default Header;
