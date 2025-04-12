import { useState } from 'react';
import CustomDatePicker from '../DatePicker';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import du CSS

function Information({ userInfo, changeContent, handleChange }) {
    console.log('user Info : ', userInfo)
const date = new Date(userInfo.date_naissance);
const formattedDate = date.toLocaleDateString('fr-FR');  // Format français
    return (
        <div className="relative w-full flex justify-center px-6 py-8">
            <button className="text-gray-600 hover:text-gray-900" onClick={changeContent}>
                <img
                    src="./icones/modifyInformation.png"
                    alt="Modifier"
                    className="absolute top-3 right-2 w-7 h-7 cursor-pointer"
                    data-tooltip-id="tooltip-modification"
                    data-tooltip-content="Modifier les informations"
                />
            </button>

            <Tooltip id="tooltip-modification" place="top" effect="solid" />
            <div className="w-full max-w-2xl gap-7 flex flex-col items-center  "
            >
                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="prenom">Prénom</label>
                        <div name="prenom"
                            id="prenom"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                        >{userInfo.prenom}</div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="nom">Nom</label>
                        <div name="nom"
                            id="nom"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                        >{userInfo.nom}</div>

                    </div>
                </div>
                <div className="w-full flex gap-4">
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="email">Email</label>
                        <div name="email"
                            id="email"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                        >{userInfo.email}</div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="telephone">Téléphone</label>
                        <div name="telephone"
                            id="telephone"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                        >{userInfo.telephone}</div>

                    </div>
                </div>
                <div className="w-full flex gap-4">
                    {userInfo.date_naissance && (
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="genre">Date de naissance</label>
                            <div name="telephone"
                                id="telephone"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                            >{formattedDate }</div>
                        </div>
                    )}
                    {userInfo.genre && (
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="genre">Genre</label>
                            <div name="telephone"
                                id="telephone"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 flex items-center"
                            >{userInfo.genre === 'homme' ? 'Homme' : userInfo.genre === 'femme' ? 'Femme' : 'Autre'}</div>
                        </div>

                    )}

                </div>
            </div>

        </div>
    );
}

export default Information;
