import React, { useEffect, useState } from 'react';
import ProfilMenu from '../shared/ProfilMenu';
import ProfilContent from '../shared/ProfilContent';
function Profil() {
    const [ongletActif, setOngletActif] = useState('profil')

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
