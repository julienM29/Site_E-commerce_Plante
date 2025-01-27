import { useState } from 'react';
import CustomDatePicker from '../DatePicker';

function InformationForm({ userInfo, handleChange, changeContent }) {
    // Fonction pour envoyer les modifications du profil
        const submitConexionForm = async (event) => {
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
    return (
        <div className="relative w-full flex justify-center px-6 py-8">
        <img
                    src="./icones/modifyInformation.png"
                    alt="Modifier les informations"
                    className="absolute top-3 right-2 w-7 h-7 cursor-pointer"
                    onClick={changeContent}
                />
           <form
           className="w-full max-w-2xl gap-7 flex flex-col items-center  "
           id="loginForm"
           onSubmit={submitConexionForm}
       >
           <div className="w-full flex gap-4">
               <div className="flex flex-col gap-2 w-1/2">
                   <label htmlFor="prenom">Prénom</label>
                   <input
                       type="text"
                       name="prenom"
                       id="prenom"
                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                       value={userInfo.prenom}
                       onChange={handleChange}
                   />
               </div>
               <div className="flex flex-col gap-2 w-1/2">
                   <label htmlFor="nom">Nom</label>
                   <input
                       type="text"
                       name="nom"
                       id="nom"
                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                       value={userInfo.nom}
                       onChange={handleChange}
                   />
               </div>
           </div>
           <div className="w-full flex gap-4">
               <div className="flex flex-col gap-2 w-1/2">
                   <label htmlFor="email">Email</label>
                   <input
                       type="text"
                       name="email"
                       id="email"
                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                       value={userInfo.email}
                       onChange={handleChange}
                   />
               </div>
               <div className="flex flex-col gap-2 w-1/2">
                   <label htmlFor="telephone">Téléphone</label>
                   <input
                       type="number"
                       name="telephone"
                       id="telephone"
                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-100"
                       value={userInfo.telephone}
                       onChange={handleChange}
                   />
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
           <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
               Mettre à jour
           </button>
       </form>
   </div>
    );
}

export default InformationForm;
