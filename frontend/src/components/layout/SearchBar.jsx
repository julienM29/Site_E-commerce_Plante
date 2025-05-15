import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../filterSlice';
import { Search } from 'lucide-react';

const SearchBar = ({filters, setIsInputFocused, setShowSuggestion, debouncedSearchQuery, setSearchVisible, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Permet de détecter les changements de route

  // Fonction pour soumettre la recherche
  const submitSearch = async (e) => {
    e.preventDefault();
    if (filters.text.trim()) { // Vérifie filters.text (au lieu de searchQuery)
      // Met à jour Redux avec la recherche
      dispatch(setFilter({ name: 'text', value: filters.text }));
      setIsInputFocused(false);
      setShowSuggestion(false);
      if(isMobile){
      setSearchVisible(false);
      }
      navigate(`/search`);
    }
  };

  // Fonction pour gérer le focus de l'input
  const handleFocus = () => setIsInputFocused(true);

  // Fonction pour gérer le blur (perte de focus)
  const handleBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest('.suggestion-item')) {
      setIsInputFocused(false);
      if (!debouncedSearchQuery.trim()) {
        setTimeout(() => setShowSuggestion(false), 200);
      }
    }
  };

  // Fonction pour gérer la modification de l'input
  const handleInputChange = (e) => {
    const query = e.target.value;
    // Mets à jour le filtre global (Redux) avec le texte recherché
    dispatch(setFilter({ name: 'text', value: query }));
  };
  useEffect(() => {
    if (!location.pathname.includes('search')) { // Si l'utilisateur quitte la page search
      dispatch(setFilter({ name: 'text', value: '' })); // Réinitialise filters.text
    }
  }, [location, dispatch]);
  const inputClasses = `w-full py-4 pl-12 pr-4 text-base md:text-lg bg-gray-100 rounded-full border border-green-700
  focus:bg-white focus:ring-2 focus:ring-green-700 focus:outline-none transition-all duration-300 shadow-sm hover:bg-white
  focus:shadow-lg focus:scale-105`;

const desktopInputClasses = `py-2 pl-10 pr-10 w-full rounded-2xl md:rounded-full bg-gray-100 focus:bg-white
  focus:ring-2 focus:outline-none focus:border-green-800 focus:ring-green-800 border md:border-2 border-green-800
  transition-all hover:bg-white hover:ring-1 hover:ring-green-800 duration-300 ease-in-out transform focus:scale-[1.01]`;

  return (
    <div className={`flex-1 ${isMobile ? '' : 'mx-6'} relative`}>
  <form onSubmit={submitSearch} className="relative group">
    <label htmlFor="search-input" className="sr-only">Rechercher</label>

    <input
      id="search-input"
      type="search"
      placeholder="Que cherchez-vous aujourd'hui ?"
      className={`
        w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
        placeholder-gray-400 text-sm md:text-base transition-all duration-200 ease-in-out
        shadow-sm hover:shadow-md
        ${isMobile ? '' : 'bg-white'}
      `}
      value={filters.text || ''}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleInputChange}
      autoComplete="off"
    />

    {/* Icône de recherche */}
    <button
      type="submit"
      className={`
        absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full 
        ${filters.text ? 'text-emerald-700 hover:bg-emerald-100 hover:scale-110' : 'text-gray-400 cursor-not-allowed'} 
        transition-all duration-200 ease-in-out
      `}
      aria-label="Rechercher"
    >
      <Search size={20} />
    </button>
  </form>
</div>

  );
};

export default SearchBar;
