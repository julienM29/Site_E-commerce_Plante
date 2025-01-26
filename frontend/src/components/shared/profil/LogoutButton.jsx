import { useState } from 'react';

function LogoutButton() {
    const logoutUser = async () => {
        console.log('logoutUser dans LogoutButton.jsx')
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({}), // ✅ Ajouter un body JSON vide
        });
        const result = await response.json();
        if (result.success) {
            console.log("✅ Déconnexion réussie !");
            // Redirection seulement après vérification
            window.location.href = '/';
        }
    };
    return (
        <div
            className={`relative group flex justify-center items-center gap-2 cursor-pointer  `}

        >
            <div
                className={`absolute left-0 top-0 bottom-0 w-1 group-hover:bg-zinc-600 transition-all duration-300`}
            ></div>
            <button className="w-5/6 flex items-center gap-2 bg-transparent p-2" onClick={() => logoutUser()}>
                <img src={`/icones/se-deconnecter.png`} alt="" className="w-5 h-5" />
                <div
                    className={`text-center group-hover:font-bold `}
                >
                    Déconnexion
                </div>
            </button>
        </div>
    );
}

export default LogoutButton;
