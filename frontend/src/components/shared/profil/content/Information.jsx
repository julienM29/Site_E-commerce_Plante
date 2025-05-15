import { useState } from 'react';
import CustomDatePicker from '../DatePicker';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import du CSS

function Information({ userInfo, changeContent, handleChange, setOngletActif, isMobile, toggleModifyMdp }) {
    const date = new Date(userInfo.date_naissance);
    const formattedDate = date.toLocaleDateString('fr-FR');  // Format français
    return (
        <div className="relative w-full flex flex-col items-center gap-6 px-6 pt-4 pb-6">
            {/* Bouton modifier (affiché uniquement si ce n'est pas mobile) */}
            {!isMobile && (
                <button className="text-gray-600 hover:text-gray-900" onClick={changeContent}>
                    <img
                        src="./icones/modifyInformation.png"
                        alt="Modifier"
                        className="absolute top-5 right-5 w-7 h-7 cursor-pointer"
                        data-tooltip-id="tooltip-modification"
                        data-tooltip-content="Modifier les informations"
                    />
                </button>
            )}
    
            {/* Tooltip pour le bouton modifier */}
            <Tooltip id="tooltip-modification" place="top" effect="solid" />
    
            <div className="w-full max-w-2xl gap-7 flex flex-col items-center py-6">
                {/* Informations utilisateur */}
                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="prenom" className="font-semibold">Prénom</label>
                        <div
                            name="prenom"
                            id="prenom"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                        >{userInfo.prenom}</div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="nom" className="font-semibold">Nom</label>
                        <div
                            name="nom"
                            id="nom"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                        >{userInfo.nom}</div>
                    </div>
                </div>
    
                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <div
                            name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                        >{userInfo.email}</div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="telephone" className="font-semibold">Téléphone</label>
                        <div
                            name="telephone"
                            id="telephone"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                        >{userInfo.telephone}</div>
                    </div>
                </div>
    
                <div className="w-full flex gap-4">
                    {userInfo.date_naissance && (
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="date_naissance" className="font-semibold">Date de naissance</label>
                            <div
                                name="date_naissance"
                                id="date_naissance"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                            >{formattedDate}</div>
                        </div>
                    )}
                    {userInfo.genre && (
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="genre" className="font-semibold">Genre</label>
                            <div
                                name="genre"
                                id="genre"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                            >{userInfo.genre === 'homme' ? 'Homme' : userInfo.genre === 'femme' ? 'Femme' : 'Autre'}</div>
                        </div>
                    )}
                </div>
    
                {/* Section mobile pour modifier les informations ou mot de passe */}
                {isMobile && (
                    <div className="w-full flex flex-col gap-4 items-center justify-center py-3">
                        <button onClick={changeContent} className="flex items-center gap-2">
                            <img src="./icones/modifyInformation.png" alt="Modifier les informations" className="w-5 h-5" />
                            <span className="text-blue-500 font-semibold underline-offset-4 underline">Modifier les informations</span>
                        </button>
                        <button
                            className="flex items-center gap-2 p-2"
                            onClick={() => toggleModifyMdp()}
                            aria-label="Modifier le mot de passe"
                        >
                            <img src={`/icones/profil_password.png`} alt="Modifier mot de passe" className="w-5 h-5" />
                            <div className="text-center text-blue-500 font-semibold underline-offset-4 underline">
                                Modifier le mot de passe
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default Information;
