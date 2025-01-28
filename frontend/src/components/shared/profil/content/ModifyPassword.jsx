import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';

const ModifyMDP = () => {
    const [userInfo, setUserInfo] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        genre: '',
    });
    const [newMotDePasse, setNewMotDePasse] = useState()
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState()
    // Fonction pour récupérer les informations de la session
    const getUserInfo = async () => {
        const result = await checkUserConnect();

        // console.log("🔍 Infos utilisateur récupérées :", result);
        setUserInfo({
            prenom: result.user.prenom,
            nom: result.user.nom,
            email: result.user.email,
            telephone: '',
        })
    };



    // Gérer les changements dans les champs du formulaire
    const newMDPChange = (value) => {
        setNewMotDePasse(value);
    };
    const confirmNewMDPChange = (value) => {
        setConfirmationMotDePasse(value);
    };
    const submitChangeMDPForm = async (event) => {
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

    // Appeler la fonction pour récupérer les informations au montage du composant
    useEffect(() => {
        getUserInfo();
    }, []);


    return (
        <div className="w-full  gap-7 flex flex-col items-center px-6 py-8">
            <div className='w-1/2 flex flex-col items-center gap-2'>
                <img src="./icones/profil_password.png" alt="" className='w-28 h-28' />
                <p className='text-lg'>Modifier le mot de passe de</p>
                <p className='font-semibold text-xl'>{userInfo.email}</p>
            </div>
            <form
                className="w-full max-w-2xl gap-7 flex flex-col items-center  "
                id="loginForm"
                onSubmit={submitChangeMDPForm}
            >

                <div className="w-3/4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="newMDP">Nouveau mot de passe</label>
                        <input
                            type="text"
                            name="newMDP"
                            id="newMDP"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                            onChange={(e) => newMDPChange(e.target.value)}
                            placeholder='Entrez un nouveau mot de passe'

                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmationMDP">Confirmez le nouveau mot de passe</label>
                        <input
                            type="text"
                            name="confirmationMDP"
                            id="confirmationMDP"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                            onChange={(e) => confirmNewMDPChange(e.target.value)}
                            placeholder='Confirmez le nouveau mot de passe'

                        />
                    </div>
                </div>

                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Mettre à jour
                </button>
            </form>


        </div>
    );

};

export default ModifyMDP;
