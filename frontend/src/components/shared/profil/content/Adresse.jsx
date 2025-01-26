import React, { useEffect, useState } from 'react';
const Adresse = () => {
const [adresseUser, setAdresseUser] = useState({
        prenom: '',
        nom: '',
        telephone: '',
        adresse1: '',
        adresse2: '',
        code_postal: '',
        ville: '',
        pays: '',
    });
  
    // Gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdresseUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
// Fonction pour envoyer les modifications du profil
const submitAdressForm = async (event) => {
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
    return (
        <form
            className="w-full max-sm:px-6 px-8 gap-7 flex flex-col items-center"
            id="loginForm"
            onSubmit={submitAdressForm}
        >
            <div className="w-full flex gap-4">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        id="prenom"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={adresseUser.prenom}
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
                        value={adresseUser.nom}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="w-full flex gap-4">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                        type="number"
                        name="telephone"
                        id="telephone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={adresseUser.telephone}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="w-full flex gap-4">
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="adresse1">Adresse ligne 1</label>
                    <input
                        type="text"
                        name="adresse1"
                        id="adresse1"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={adresseUser.adresse1}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="adresse2">Adresse ligne 2</label>
                    <input
                        type="text"
                        name="adresse2"
                        id="adresse2"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={adresseUser.adresse2}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="w-full flex gap-4">
                <div className="flex flex-col gap-2 w-1/3">
                    <label htmlFor="pays">Pays</label>
                    <input
                        type="text"
                        name="pays"
                        id="pays"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={adresseUser.pays}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                    <label htmlFor="code_postal">Code postal</label>
                    <input
                        type="text"
                        name="code_postal"
                        id="code_postal"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={adresseUser.code_postal}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                    <label htmlFor="ville">Ville</label>
                    <input
                        type="text"
                        name="ville"
                        id="ville"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                        value={adresseUser.ville}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                Sauvegarder
            </button>
        </form>
    );
};

export default Adresse;
