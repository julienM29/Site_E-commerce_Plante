import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useGsapPanier = (dataSelectionPlants) => {
    useEffect(() => {
        let ctx = gsap.context(() => {
            
              if (dataSelectionPlants.length > 0) {
                gsap.from("#meilleurs_ventes", {
                  opacity: 0,
                  y: 50,
                  duration: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: "#meilleurs_ventes",
                    start: "top 80%",
                    toggleActions: "play none none none",
                  },
                });
              }
            ScrollTrigger.refresh();
          
        });
    
        return () => ctx.revert(); // 🧹 Nettoyage propre avec context
      }, [dataSelectionPlants]);
};
