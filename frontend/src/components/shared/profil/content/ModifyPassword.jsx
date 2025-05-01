import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import des icônes

const ModifyMDP = () => {
    const [userInfo, setUserInfo] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        genre: '',
        id: '',
    });
    const [ancienMotDePasse, setAncienMotDePasse] = useState()
    const [ancienMotDePasseVisible, setAncienMotDePasseVisible] = useState(false); // Etat pour contrôler la visibilité

    const [newMotDePasse, setNewMotDePasse] = useState()
    const [newMotDePasseVisible, setNewMotDePasseVisible] = useState(false); // Etat pour contrôler la visibilité

    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState()
    const [confirmationMotDePasseVisible, setConfirmationMotDePasseVisible] = useState(false); // Etat pour contrôler la visibilité

    const [erreurMessageMotDePasse, setErrorMessageMDPIncorrect] = useState(null)
    const [verifNewMDP, setVerifNewMDP] = useState(''); // Etat pour la vérification des nouveaux mots de passe

    // Fonction pour récupérer les informations de la session
    const getUserInfo = async () => {
        const result = await checkUserConnect();
        setUserInfo({
            prenom: result.user.prenom,
            nom: result.user.nom,
            email: result.user.email,
            telephone: '',
            id: result.user.id
        })
    };

    const handleChangeMotDePasse = (e) => {
        setAncienMotDePasse(e.target.value)
        if (erreurMessageMotDePasse) {
            setErrorMessageMDPIncorrect(null)
        }
    }

    // Gérer les changements dans les champs du formulaire
    const newMDPChange = (value) => {
        setNewMotDePasse(value);

        // Vérifier si les mots de passe ne correspondent pas
        if (confirmationMotDePasse) {
            if (value !== confirmationMotDePasse) {
                setVerifNewMDP('Les mots de passe ne correspondent pas');
            } else {
                setVerifNewMDP(''); // Réinitialiser le message si les mots de passe correspondent
            }
        }
    };

    const confirmNewMDPChange = (value) => {
        setConfirmationMotDePasse(value);

        // Vérifier si les mots de passe ne correspondent pas
        if (newMotDePasse) {
            if (value !== newMotDePasse) {
                setVerifNewMDP('Les mots de passe ne correspondent pas');
            } else {
                setVerifNewMDP(''); // Réinitialiser le message si les mots de passe correspondent
            }
        }
    };

    const submitChangeMDPForm = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        const response = await fetch('http://localhost:3000/modifyPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_user: userInfo.id,
                motDePasseActuelSaisi: ancienMotDePasse,
                nouveauMotDePasse: newMotDePasse
            }),
            credentials: 'include',
        });
        const data = await response.json();

        if (data.success) {
            localStorage.setItem("toastMessage", "Mot de passe modifié avec succès !");
            window.location.href = "/account";
        } else {
            if (data.message) {
                console.log("❌ Erreur mot de passe :", data.message);
                setErrorMessageMDPIncorrect(data.message);
            }
            console.error('Erreur lors de la mise à jour du profil');
        }
    };

    const togglePasswordVisible = () => {
        setAncienMotDePasseVisible(prevState => !prevState);
    };

    const toggleNewPasswordVisible = () => {
        setNewMotDePasseVisible(prevState => !prevState);
    };

    const toggleConfirmationPasswordVisible = () => {
        setConfirmationMotDePasseVisible(prevState => !prevState);
    };

    useEffect(() => {
        getUserInfo();
    }, []);


    return (
        <div className="w-full gap-7 flex flex-col items-center py-4">
            <div className='w-1/2 flex flex-col items-center gap-2'>
                <img src="./icones/profil_password.png" alt="" className='w-24 h-24' />
                <p className='text-lg'>Modifier le mot de passe de</p>
                <p className='font-semibold text-xl'>{userInfo.email}</p>
            </div>

            <form
                className="w-full max-w-2xl gap-4 flex flex-col items-center"
                id="loginForm"
                onSubmit={submitChangeMDPForm}
            >

                <div className="w-3/4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="ancienMDP">Ancien mot de passe</label>
                        <div className="relative flex items-center">
                            <input
                                type={ancienMotDePasseVisible ? "text" : "password"}
                                name="ancienMDP"
                                id="ancienMDP"
                                className={`h-10 mt-1 rounded px-4 w-full bg-gray-100 border 
                                    ${erreurMessageMotDePasse ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'} focus:outline-none focus:ring-1`}
                                                                onChange={(e) => handleChangeMotDePasse(e)}
                                placeholder="Entrez l'ancien mot de passe"
                            />
                            <div
                                className="absolute right-3 text-xl cursor-pointer"
                                onClick={togglePasswordVisible}
                            >
                                {ancienMotDePasseVisible ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {erreurMessageMotDePasse && (
                        <p className="min-h-[20px] text-red-600 text-sm">{erreurMessageMotDePasse}</p>
                         )} 

                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="newMDP">Nouveau mot de passe</label>
                        <div className="relative flex items-center">
                            <input
                                type={newMotDePasseVisible ? "text" : "password"}
                                name="newMDP"
                                id="newMDP"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring-1"
                                onChange={(e) => newMDPChange(e.target.value)}
                                placeholder='Entrez un nouveau mot de passe'
                            />
                            <div
                                className="absolute right-3 text-xl cursor-pointer"
                                onClick={toggleNewPasswordVisible}
                            >
                                {newMotDePasseVisible ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="confirmationMDP">Confirmez le nouveau mot de passe</label>
                        <div className="relative flex items-center">
                            <input
                                type={confirmationMotDePasseVisible ? "text" : "password"}
                                name="confirmationMDP"
                                id="confirmationMDP"
                                className={`h-10 mt-1 rounded px-4 w-full bg-gray-100 border 
                                    ${verifNewMDP ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'} focus:outline-none focus:ring-1`}
                                    onChange={(e) => confirmNewMDPChange(e.target.value)}
                                    placeholder='Confirmez le nouveau mot de passe'
                            />
                            <div
                                className="absolute right-3 text-xl cursor-pointer"
                                onClick={toggleConfirmationPasswordVisible}
                            >
                                {confirmationMotDePasseVisible ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <p className="min-h-[20px] text-red-600 text-sm">{verifNewMDP}</p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800  text-white  px-4 py-2 rounded-lg transition-colors disabled:opacity-50"

                    // className="mt-4 bg-blue-500 text-white p-2 rounded "
                    disabled={newMotDePasse !== confirmationMotDePasse}
                >
                    Mettre à jour
                </button>

            </form>
        </div>
    );
};

export default ModifyMDP;
