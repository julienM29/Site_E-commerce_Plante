import { useState } from 'react';
import CustomDatePicker from '../DatePicker';

function Information({ userInfo, changeContent, handleChange }) {

    return (
        <div className="relative w-full flex justify-center px-6 py-8">

            <img
                src="./icones/modifyInformation.png"
                alt="Quitter la modification"
                className="absolute top-3 right-2 w-7 h-7 cursor-pointer"
                onClick={changeContent}
            />
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

                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="prenom">Date de naissance</label>
                        <CustomDatePicker />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                        <label htmlFor="genre">Genre</label>
                        <div className="flex gap-4 items-center h-full">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id="genre-homme"
                                    value="homme"
                                    checked={userInfo.genre === 'homme'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="genre-homme" className="ml-2">Homme</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id="genre-femme"
                                    value="femme"
                                    checked={userInfo.genre === 'femme'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <label htmlFor="genre-femme" className="ml-2">Femme</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    id="genre-autre"
                                    value="autre"
                                    checked={userInfo.genre === 'autre'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor="genre-autre" className="ml-2">Autre</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Information;
