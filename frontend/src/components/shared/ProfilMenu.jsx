import React, { useEffect } from 'react';

const ProfilMenu = ({ setOngletActif, ongletActif }) => {
    const ButtonMenu = ({ image, titre, titreOngletActif }) => {
        return (
            <div
                className={`relative group flex justify-center items-center gap-2 cursor-pointer ${ongletActif === titreOngletActif ? "bg-zinc-100" : ""
                    }`}
                onClick={() => setOngletActif(titreOngletActif)}
            >
                <div
                    className={`absolute left-0 top-0 bottom-0 w-1  ${ongletActif === titreOngletActif ? "bg-zinc-600" : "group-hover:bg-zinc-600"
                        } transition-all duration-300`}
                ></div>
                <button className="w-5/6 flex items-center gap-2 bg-transparent p-2">
                    <img src={`/icones/${image}`} alt="" className="w-5 h-5" />
                    <div
                        className={`text-center  ${ongletActif === titreOngletActif ? "font-bold" : "group-hover:font-bold"
                            }`}
                    >
                        {titre}
                    </div>
                </button>
            </div>

        )
    }
    return (
        <div className="w-[280px] rounded-3xl bg-white border shadow-lg flex flex-col gap-4 h-auto">
            <div className="flex gap-6 items-center rounded-2xl border-b p-5 shadow-lg">
                <p className="rounded-full bg-zinc-400 p-2 text-2xl">MJ</p>
                <div className="flex flex-col">
                    <p className="text-xl">Miossec Julien</p>
                    <div className="flex gap-2 items-center">
                        <img src="/icones/horloge.png" alt="" className="w-5 h-5" />
                        <p>06:03:05 PM</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 py-2 border-b">
                <ButtonMenu image='profil.png' titre='Profil' titreOngletActif='profil' />
                <ButtonMenu image='profil_adress.png' titre='Adresse' titreOngletActif='adresse' />
            </div>

            <div className="flex flex-col gap-2 py-2 border-b">
                <ButtonMenu image='profil_commande.png' titre='Commande' titreOngletActif='commande' />
            </div>

            <div className="flex flex-col gap-2 py-2 border-b">
                <ButtonMenu image="profil_coeur.png" titre="Liste d'envie" titreOngletActif="listeEnvie" />
                <ButtonMenu image="profil_listing_view.png" titre="Consultés recemment" titreOngletActif="consulteRecemment" />
            </div>

            <div className="flex flex-col justify-between gap-2 py-2 pb-5 border-b">
                <ButtonMenu image="profil_password.png" titre="Changer le mot de passe" titreOngletActif="motDePasse" />
                <ButtonMenu image="se-deconnecter.png" titre="Déconnexion" titreOngletActif="deconnexion" />
            </div>
        </div>
    );
};

export default ProfilMenu;
