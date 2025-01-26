import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import ProfilInformationForm from './ProfilInformationForm';
import Adresse from './Adresse';

const ProfilContent = ({ ongletActif }) => {
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
    <div className="flex-1 bg-white rounded-3xl p-2">
      <div ref={profilRef}>
        {ongletActif === "profil" && <ProfilInformationForm />}
      </div>
      <div ref={adresseRef}>
        {ongletActif === "adresse" && <Adresse />}
      </div>
      <div ref={commandeRef}>
        {ongletActif === "commande" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Commande</h2>
            <p>Consultez l'historique de vos commandes.</p>
          </div>
        )}
      </div>
      <div ref={listeEnvieRef}>
        {ongletActif === "listeEnvie" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Liste d'envies</h2>
            <p>Consultez l'historique de vos commandes.</p>
          </div>
        )}
      </div>
      <div ref={consulteRecemmentRef}>
        {ongletActif === "consulteRecemment" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Consultés récemment</h2>
            <p>Consultez l'historique de vos commandes.</p>
          </div>
        )}
      </div>
      <div ref={motDePasseRef}>
        {ongletActif === "motDePasse" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Changer de mot de passe</h2>
            <p>Consultez l'historique de vos commandes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilContent;
