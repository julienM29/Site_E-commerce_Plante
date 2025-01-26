import React, { useEffect, useState } from 'react';
import ProfilMenu from '../shared/profil/ProfilMenu';
import ProfilContent from '../shared/profil/ProfilContent';

function Profil() {
    const [ongletActif, setOngletActif] = useState('profil')
    const [userConnect, setUserConnect] = useState()
    const checkUserConnect = async () => {
        try {
            const response = await fetch('http://localhost:3000/userInfo', {
                method: 'GET',
                credentials: 'include', // Important pour envoyer les cookies
            });

            const result = await response.json();
            if(result.success === true){
                setUserConnect(true)
            
            console.log("🔍 Infos utilisateur récupérées :", result);
        } else {
            setUserConnect(false)
        }
        } catch (err) {
            console.error("❌ Erreur lors de la récupération des infos utilisateur :", err);
        }

    };
    useEffect(() => {
        checkUserConnect();
      }, []);
    return (
        <>
            <div className="bg-custom-light py-16 min-h-[78vh] w-full flex justify-center ">
                <div className='w-1/2 flex gap-6 h-3/4'>


                <ProfilMenu setOngletActif={setOngletActif} ongletActif={ongletActif} />
                <ProfilContent  ongletActif={ongletActif} />
                    
                </div>

            </div>
        </>
    )
}

export default Profil;
