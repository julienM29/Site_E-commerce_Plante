import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import CommandeCard from '../../commande/CommandeCard';

const Commande = () => {
    const [commandes, setCommandes] = useState([]);

    const loadCommandes = async () => {
        try {
            const result = await checkUserConnect();
            const response = await fetch(`http://127.0.0.1:3000/getCommande/${result.user.id}`);
            const data = await response.json();
            setCommandes(data || []); // Sécurisation si l'API renvoie `null`
        } catch (error) {
            console.error('Erreur lors du chargement des commandes:', error);
        }
    };

    useEffect(() => {
        loadCommandes();
    }, []);

    return (
        <div>
            {commandes.length === 0 ? (
                <div className="w-full flex flex-col items-center gap-7 px-6 py-8">
                    <img src="./icones/colis_vide.png" alt="Colis vide" className="w-28 h-28" />
                    <p className="font-semibold text-lg">Découvrez nos produits</p>
                    <a href='/search' className="rounded-lg py-2 px-4 bg-rose-500 text-white hover:bg-rose-400">
                        Voir les produits
                    </a>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center gap-2 py-6 px-4 max-h-[65vh] overflow-y-auto ">
                    <h2 className='text-xl font-semibold'>Vos commandes</h2>
                    {commandes.map((commande, index) => (
                        <CommandeCard key={index} commande={commande} />
                    ))}
                </div>
            )}
        </div>
    );

};

export default Commande;
