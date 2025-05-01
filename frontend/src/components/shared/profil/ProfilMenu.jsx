import React, { useEffect } from 'react';
import LogoutButton from './LogoutButton';
const ProfilMenu = ({ setOngletActif, ongletActif, isMobile }) => {



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
    return isMobile ?
        <div className="flex flex-col items-center p-4 gap-4 w-full">
            {/* User Header */}
            <div className="flex flex-col items-center text-center gap-1">
                <div className="bg-zinc-400 rounded-full p-3 text-white text-2xl">MJ</div>
                <p className="text-lg font-semibold">Miossec Julien</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <img src="/icones/horloge.png" className="w-4 h-4" alt="Horloge" />
                    <span>06:03:05 PM</span>
                </div>
            </div>

            {/* Menu (horizontal scrollable) */}
            <div className="flex overflow-x-auto justify-between w-full ">
                {[
                    { icon: 'profil.png', label: 'Profil', key: 'profil' },
                    { icon: 'profil_adress.png', label: 'Adresse', key: 'adresse' },
                    { icon: 'profil_commande.png', label: 'Commande', key: 'commande' },
                    { icon: 'profil_coeur.png', label: "Liste d'envie", key: 'listeEnvie' },
                    { icon: 'profil_listing_view.png', label: 'Consultés', key: 'consulteRecemment' },
                ].map(({ icon, label, key }) => (
                    <button
                        key={key}
                        onClick={() => setOngletActif(key)}
                        className={`flex flex-col items-center   ${ongletActif === key ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}
                    >
                        <img src={`/icones/${icon}`} className="w-6 h-6 mb-1" alt={label} />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </div>

        </div>

        :
        <div className="w-[280px] rounded-3xl bg-white border shadow-lg flex flex-col gap-4 self-start">
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
                <LogoutButton />
            </div>
        </div>
};

export default ProfilMenu;
