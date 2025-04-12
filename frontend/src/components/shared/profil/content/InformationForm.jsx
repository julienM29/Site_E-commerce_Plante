import { useState, useEffect } from 'react';
import CustomDatePicker from '../DatePicker';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import du CSS
import { useNavigate, useLocation } from "react-router-dom";

function InformationForm({ userInfo, changeContent }) {
        const navigate = useNavigate();  // Hook pour changer de page
    
    // Créer un état pour les modifications
    const [userInfoModif, setUserInfoModif] = useState(userInfo);
    // Fonction pour gérer les changements dans le formulaire
    const handleUserInfoChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Si c'est une case à cocher, on met à jour le genre en fonction de la case cochée
            setUserInfoModif((prevState) => ({
                ...prevState,
                genre: checked ? value : '', // Si coché, on met à jour, sinon on vide
            }));
        } else {
            setUserInfoModif((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Fonction pour envoyer les modifications du profil
    const submitConexionForm = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Envoie des informations au backend pour mettre à jour
        const response = await fetch(`http://127.0.0.1:3000/updateProfil/${userInfo.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfoModif),
            credentials: 'include', // Assure que les cookies sont envoyés
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Profil mis à jour:', data);
            window.location.reload();
        } else {
            console.error('Erreur lors de la mise à jour du profil');
        }
    };

    // Fonction pour annuler les modifications
    const cancelModifications = () => {
        setUserInfoModif(userInfo); // Restaure les données originales
        changeContent(); // Appel à la fonction pour quitter la page de modification
    };

    return (
        <div className="relative w-full flex justify-center px-6 py-8">
            {/* Bouton pour quitter la modification */}
            <button
                className="text-gray-600 hover:text-gray-900"
                onClick={cancelModifications}
                data-tooltip-id="tooltip-stopModification"
                data-tooltip-content="Annuler les modifications"
            >
                <img
                    src="./icones/out_form_information.png"
                    alt="Annuler les modifications"
                    className="absolute top-3 right-2 w-7 h-7 cursor-pointer"
                />
            </button>
            <Tooltip id="tooltip-stopModification" place="top" effect="solid" />

            {/* Formulaire de modification */}
            <form
                className="w-full max-w-2xl gap-7 flex flex-col items-center"
                id="loginForm"
                onSubmit={submitConexionForm}
            >
                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="prenom">Prénom</label>
                        <input
                            type="text"
                            name="prenom"
                            id="prenom"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                            value={userInfoModif.prenom}
                            onChange={handleUserInfoChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="nom">Nom</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                            value={userInfoModif.nom}
                            onChange={handleUserInfoChange}
                        />
                    </div>
                </div>

                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                            value={userInfoModif.email}
                            onChange={handleUserInfoChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="telephone">Téléphone</label>
                        <input
                            type="number"
                            name="telephone"
                            id="telephone"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                            value={userInfoModif.telephone}
                            onChange={handleUserInfoChange}
                        />
                    </div>
                </div>

                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="date_naissance">Date de naissance</label>
                        <CustomDatePicker handleUserInfoChange={handleUserInfoChange} date_naissance={userInfoModif.date_naissance}/>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="genre">Genre</label>
                        <div className="flex gap-4 items-center h-full">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id="genre-homme"
                                    value="homme"
                                    checked={userInfoModif.genre === 'homme'}
                                    onChange={handleUserInfoChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="genre-homme" className="ml-2">Homme</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id="genre-femme"
                                    value="femme"
                                    checked={userInfoModif.genre === 'femme'}
                                    onChange={handleUserInfoChange}
                                    className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <label htmlFor="genre-femme" className="ml-2">Femme</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id="genre-autre"
                                    value="autre"
                                    checked={userInfoModif.genre === 'autre'}
                                    onChange={handleUserInfoChange}
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor="genre-autre" className="ml-2">Autre</label>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Mettre à jour
                </button>
            </form>
        </div>
    );
}

export default InformationForm;
