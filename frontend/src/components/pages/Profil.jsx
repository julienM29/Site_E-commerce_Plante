import React, { useEffect, useState } from 'react';
import ProfilMenu from '../shared/profil/ProfilMenu';
import ProfilContent from '../shared/profil/content/ProfilContent';
import UserForm from './UserForm';
import { checkUserConnect } from '../shared/CheckUserInformation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profil() {
    const [ongletActif, setOngletActif] = useState('profil');
    const [userConnect, setUserConnect] = useState('loading');  // null pour indiquer que la vérification est en cours

    // Fonction asynchrone pour vérifier la connexion de l'utilisateur
    const isUserConnected = async () => {
        const connected = await checkUserConnect();  // Attendre que la promesse soit résolue
        setUserConnect(connected.success);  // Mise à jour de l'état en fonction du résultat
    };

    // Exécution de la fonction de vérification lors du premier rendu
    useEffect(() => {
        isUserConnected();
        const toastMessage = localStorage.getItem("toastMessage");
        if(toastMessage){
            console.log('prout')
            toast.success(toastMessage, {
                position: "top-center",  // Position du toast
                autoClose: 3000,         // Durée d'affichage du toast
                style: {
                    marginTop: '10vh',  // 40% de la hauteur de l'écran
                }
            });
            
              setTimeout(() => {
                localStorage.removeItem("toastMessage");
            }, 500);
        }

    }, []); // Cela ne s'exécute qu'une seule fois, lors du premier rendu

    if (userConnect === 'loading') {
        return <div className="bg-custom-light py-16 min-h-[78vh] w-full flex justify-center">
            <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
                <div className="flex justify-center items-center mt-[50vh]">
                    <div className="fas fa-circle-notch fa-spin fa-5x text-violet-600"></div>
                </div>
            </div>
        </div>;  // Remplacer par un spinner ou un autre indicateur de chargement
    }

    if (userConnect === false) {
        return <UserForm />;
    }

    // Si l'utilisateur est connecté, afficher le profil
    return (
        <div className="bg-custom-light items-center h-[80vh] w-full flex justify-center">
            <div className="w-[55%] flex gap-4 items-start h-[90%]">
                <ProfilMenu setOngletActif={setOngletActif} ongletActif={ongletActif} />
                <ProfilContent ongletActif={ongletActif} />
            </div>
        </div>
    );
}

export default Profil;
