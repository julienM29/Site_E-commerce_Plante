import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import ProfilInformation from './ProfilInformation';
import Adresse from './Adresse';
import Commande from './Commande';
import ListeEnvie from './ListeEnvie';
import ModifyMDP from './ModifyPassword';
import ConsulteRecemment from './ConsulteRecemment';
const ProfilContent = ({ ongletActif, setOngletActif, isMobile }) => {
  const profilRef = useRef(null);
  const adresseRef = useRef(null);
  const commandeRef = useRef(null);
  const listeEnvieRef = useRef(null);
  const consulteRecemmentRef = useRef(null);
  const motDePasseRef = useRef(null);

  // Utiliser useEffect pour appliquer GSAP à chaque changement d'onglet
  useEffect(() => {
    // Réinitialisation des opacités et visibilité pour tous les onglets
    gsap.set([profilRef.current, adresseRef.current, commandeRef.current, listeEnvieRef.current, consulteRecemmentRef.current, motDePasseRef.current], { opacity: 0, visibility: 'hidden' });

    // Animer l'onglet actif
    switch (ongletActif) {
      case 'profil':
        gsap.set(profilRef.current, { visibility: 'visible' });
        gsap.to(profilRef.current, { opacity: 1, duration: 0.7 });
        break;
      case 'adresse':
        gsap.set(adresseRef.current, { visibility: 'visible' });
        gsap.to(adresseRef.current, { opacity: 1, duration: 0.7 });
        break;
      case 'commande':
        gsap.set(commandeRef.current, { visibility: 'visible' });
        gsap.to(commandeRef.current, { opacity: 1, duration: 0.7 });
        break;
      case 'listeEnvie':
        gsap.set(listeEnvieRef.current, { visibility: 'visible' });
        gsap.to(listeEnvieRef.current, { opacity: 1, duration: 0.7 });
        break;
      case 'consulteRecemment':
        gsap.set(consulteRecemmentRef.current, { visibility: 'visible' });
        gsap.to(consulteRecemmentRef.current, { opacity: 1, duration: 0.7 });
        break;
      case 'motDePasse':
        gsap.set(motDePasseRef.current, { visibility: 'visible' });
        gsap.to(motDePasseRef.current, { opacity: 1, duration: 0.7 });
        break;
      default:
        break;
    }
  }, [ongletActif]); // Exécute cette logique chaque fois que `ongletActif` change

  return (
    <div className="w-full bg-white rounded-3xl self-start shadow-lg">
      <div ref={profilRef}>
        {ongletActif === "profil" && <ProfilInformation setOngletActif={setOngletActif} isMobile={isMobile} />}
      </div>
      <div ref={adresseRef}>
        {ongletActif === "adresse" && <Adresse isMobile={isMobile}/>}
      </div>
      <div ref={commandeRef}>
        {ongletActif === "commande" && (
          <Commande isMobile={isMobile}/>
        )}
      </div>
      <div ref={listeEnvieRef}  >
        {ongletActif === "listeEnvie" && (
          <ListeEnvie isMobile={isMobile}/>
        )}
      </div>
      <div ref={consulteRecemmentRef}>
        {ongletActif === "consulteRecemment" && (
          < ConsulteRecemment isMobile={isMobile}/>
        )}
      </div>
      <div ref={motDePasseRef}>
        {ongletActif === "motDePasse" && (
          <ModifyMDP />
        )}
      </div>
    </div>
  );
};

export default ProfilContent;
