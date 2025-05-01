import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useGsapAnimations = (dataPromotionsPlants, dataNouveautesPlants, dataSelectionPlants) => {

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (dataPromotionsPlants.length > 0 || dataNouveautesPlants.length > 0 || dataSelectionPlants.length > 0) {

        // Promotions
        if (dataPromotionsPlants.length > 0) {
          gsap.from("#promotion", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#promotion",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          gsap.from('.lienInspiration', {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '.lienInspiration',
              start: "top 80%",
            },
          });
          gsap.from('.navigationBouton', {
            opacity: 0,
            scale: 0.9,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.navigationBouton',
              start: 'top 80%',
            },
          });
          
          
        }

        // Meilleures ventes
        if (dataSelectionPlants.length > 0) {
          gsap.from("#meilleures_ventes", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#meilleures_ventes",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        // Nouveautés
        if (dataNouveautesPlants.length > 0) {
          gsap.from("#nouveautés", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#nouveautés",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        ScrollTrigger.refresh();
      }
    });

    return () => ctx.revert(); // 🧹 Nettoyage propre avec context
  }, [dataPromotionsPlants, dataNouveautesPlants, dataSelectionPlants]);
};
