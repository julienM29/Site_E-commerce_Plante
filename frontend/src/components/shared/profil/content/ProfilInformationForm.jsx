import React, { useEffect, useState } from 'react';
import CustomDatePicker from '../DatePicker';
import { checkUserConnect } from '../../CheckUserInformation';
const ProfilInformationForm = () => {
    const [userInfo, setUserInfo] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        genre: '',
    });

    // Fonction pour envoyer les modifications du profil
    const submitConexionForm = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Par exemple, envoie des informations au backend pour mettre à jour
        const response = await fetch('http://127.0.0.1:3000/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
            credentials: 'include', // Assure que les cookies sont envoyés
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Profil mis à jour:', data);
        } else {
            console.error('Erreur lors de la mise à jour du profil');
        }
    };

    // Fonction pour récupérer les informations de la session
    const getUserInfo = async () => {
            const result = await checkUserConnect();

            console.log("🔍 Infos utilisateur récupérées :", result);
            setUserInfo({
                prenom: result.user.prenom,
                nom: result.user.nom,
                email: result.user.email,
                telephone: '',
            })
    };





    // Appeler la fonction pour récupérer les informations au montage du composant
    useEffect(() => {
        getUserInfo();
    }, []);

    // Gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form
            className="w-full max-sm:px-6 px-8 gap-7 flex flex-col items-center"
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
                        value={userInfo.prenom}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        name="nom"
                        id="nom"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={userInfo.nom}
                        onChange={handleChange}
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
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                        type="number"
                        name="telephone"
                        id="telephone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={userInfo.telephone}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="w-full flex gap-4">

                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="prenom">Date de naissance</label>
                    <CustomDatePicker />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="genre">Genre</label>
                    <div className="flex gap-4 items-center h-auto">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="genre"
                                id="genre-homme"
                                value="homme"
                                checked={userInfo.genre === 'homme'}
                                onChange={handleChange}
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
                                checked={userInfo.genre === 'femme'}
                                onChange={handleChange}
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
                                checked={userInfo.genre === 'autre'}
                                onChange={handleChange}
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
    );
};

export default ProfilInformationForm;
