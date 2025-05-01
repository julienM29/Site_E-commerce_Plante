import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useGsapProductPage = (dataPlantsSuggestions) => {
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.caracteristique', {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: '.caracteristique',
                  start: "top 80%",
                },
              });
              if (dataPlantsSuggestions.length > 0) {
                gsap.from("#swipperSuggestion", {
                  opacity: 0,
                  y: 50,
                  duration: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: "#swipperSuggestion",
                    start: "top 80%",
                    toggleActions: "play none none none",
                  },
                });
              }
            ScrollTrigger.refresh();
          
        });
    
        return () => ctx.revert(); // 🧹 Nettoyage propre avec context
      }, [dataPlantsSuggestions]);
};
