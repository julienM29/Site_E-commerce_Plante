import React, { useEffect } from 'react';
import ProfilInformationForm from './ProfilInformationForm';
const ProfilContent = ({  ongletActif }) => {

    return (
        <div className='flex-1 bg-white rounded-3xl p-2'>
            {ongletActif === "profil" && (
                <ProfilInformationForm />
            )}
            {ongletActif === "adresse" && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Adresse</h2>
                    <p>Ajoutez ou modifiez vos adresses pour la livraison.</p>
                </div>
            )}
            {ongletActif === "commande" && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Commande</h2>
                    <p>Consultez l'historique de vos commandes.</p>
                </div>
            )}
            {ongletActif === "listeEnvie" && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Liste d'envies</h2>
                    <p>Consultez l'historique de vos commandes.</p>
                </div>
            )}
            {ongletActif === "consulteRecemment" && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Consultés recemment</h2>
                    <p>Consultez l'historique de vos commandes.</p>
                </div>
            )}
            {ongletActif === "motDePasse" && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Chager de mot de passe </h2>
                    <p>Consultez l'historique de vos commandes.</p>
                </div>
            )}
        </div>
    );
};

export default ProfilContent;
