import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import AdresseForm from '../../adresse/AdresseForm';
import AdresseContent from '../../adresse/AdresseContent';

const Adresse = () => {
    const [userId, setUserId] = useState(null);
    const [addAdresse, setAddAdresse] = useState(false);
    const [idAdresseToModif, setIdAdresseToModif] = useState(null);

    const changeContent = () => {
        setAddAdresse(prev => !prev);
    };
    // Fonction pour vérifier si l'utilisateur est connecté
    const isUserConnected = async () => {
        const result = await checkUserConnect();
        setUserId(result.user.id); // Mise à jour de l'ID de l'utilisateur
    };
    
    // Exécution de la fonction de vérification lors du premier rendu
    useEffect(() => {
        isUserConnected();
    }, []);

    // Fonction pour gérer les changements dans les inputs



    return (
        <div>
            {addAdresse ? (
                <AdresseForm userId={userId} changeContent={changeContent} idAdresseToModif={idAdresseToModif}/>
            ) : (
                <AdresseContent userId={userId} changeContent={changeContent} setIdAdresseToModif={setIdAdresseToModif}/>
            )}
        </div>
    );
};

export default Adresse;
