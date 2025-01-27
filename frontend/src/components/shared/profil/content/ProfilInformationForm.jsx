import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import InformationForm from './InformationForm';
import Information from './Information';
const ProfilInformationForm = () => {
    const [modifyInformation, setModifyInformation] = useState(false)
    const [userInfo, setUserInfo] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        genre: '',
    });



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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const changeContent = () => {
        setModifyInformation(prev => !prev);
    };
    


    // Appeler la fonction pour récupérer les informations au montage du composant
    useEffect(() => {
        getUserInfo();
    }, []);



    return (
        <div>
            {modifyInformation ? (
                <Information userInfo={userInfo} handleChange={handleChange} changeContent={changeContent}/>
            ) : (
                <InformationForm userInfo={userInfo} handleChange={handleChange} changeContent={changeContent} />
            )}
        </div>
    );

};

export default ProfilInformationForm;
