import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import InformationForm from './InformationForm';
import Information from './Information';
import ModifyMDP from './ModifyPassword';
const ProfilInformation = ({setOngletActif, isMobile}) => {
    const [modifyInformation, setModifyInformation] = useState(false)
    const [userInfo, setUserInfo] = useState({
        id: '',
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        genre: '',
        date_naissance:'',
    });
    const [modifyMdp, setModifyMdp] = useState(false);
    const toggleModifyMdp = () => {
        setModifyMdp(prev => !prev);
    };
    


    // Fonction pour récupérer les informations de la session
    const getUserInfo = async () => {
        const result = await checkUserConnect();
        console.log("🔍 Infos utilisateur récupérées :", result);
        setUserInfo({
            id: result.user.id,
            prenom: result.user.prenom,
            nom: result.user.nom,
            email: result.user.email,
            telephone: result.user.telephone,
            date_naissance: result.user.date_naissance,
            genre: result.user.genre
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
            {modifyMdp ? (
                <ModifyMDP toggleModifyMdp={toggleModifyMdp} isMobile={isMobile}/>
            ) : modifyInformation ? (
                <InformationForm
                    userInfo={userInfo}
                    handleChange={handleChange}
                    changeContent={changeContent}
                    setOngletActif={setOngletActif}
                    isMobile={isMobile}
                />
            ) : (
                <Information
                    userInfo={userInfo}
                    handleChange={handleChange}
                    changeContent={changeContent}
                    toggleModifyMdp={toggleModifyMdp} // Tu peux passer ça ici
                    setOngletActif={setOngletActif}
                    isMobile={isMobile}
                />
            )}
        </div>
    );
    

};

export default ProfilInformation;
