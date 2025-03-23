import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Force le scroll en haut
  }, [pathname]); // Exécute l'effet quand le chemin change

  return null;
};

export default ScrollToTop;
