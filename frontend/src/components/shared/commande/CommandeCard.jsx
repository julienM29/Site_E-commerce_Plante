import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";

const CommandeCard = ({ commande }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [statutLivraison, setStatutLivraison] = useState(false);

    const date = new Date(commande.created_at);
    const formattedDate = date.toLocaleDateString("fr-FR"); // Format : "15/03/2025"
    const prixTotalProduits = commande.detail_panier_prix_total;
    const tabPrixTotalProduits = prixTotalProduits.split(',').map(Number); // Convertir directement en tableau de nombres
    const nbProduits = tabPrixTotalProduits.length;

    const calculateTotal = (tabPrix) => {
        let prixTotal = tabPrix.reduce((acc, prix) => acc + prix, 0);
        if (Number(commande.garantie) === 1) {
            prixTotal = prixTotal + 3.90;
        }
        return prixTotal;
    };

    const total = useMemo(() => calculateTotal(tabPrixTotalProduits), [tabPrixTotalProduits, commande.garantie]);

    const ids = commande.produits_id ? commande.produits_id.split(',').map(id => Number(id.trim())) : [];
    const noms = commande.noms_produits ? commande.noms_produits.split(',').map(nom => nom.trim()) : [];
    const images = commande.images_urls ? commande.images_urls.split(',').map(img => img.trim()) : [];
    const quantites = commande.detail_panier_quantite ? commande.detail_panier_quantite.split(',').map(qty => Number(qty.trim())) : [];
    const prix = commande.detail_panier_prix_total ? commande.detail_panier_prix_total.split(',').map(prix => parseFloat(prix.trim())) : [];

    const checkLivraisonStatus = (date_commande) => {
        const currentDate = new Date();
        const threeDaysLater = new Date(date_commande);
        threeDaysLater.setDate(threeDaysLater.getDate() + 3);
        return currentDate >= threeDaysLater;
    };

    useEffect(() => {
        const isLivraisonDelayed = checkLivraisonStatus(commande.created_at);
        setStatutLivraison(isLivraisonDelayed);
    }, [commande.created_at]);

    return (
        <div className="w-full bg-white rounded-3xl border shadow-lg p-5">
            {/* En-tête de la commande */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">Commande #{commande.id}</h3>
                    <p className="text-sm text-gray-500">Passée le {formattedDate}</p>
                </div>
                <button
                    className="text-blue-500 hover:text-blue-700 font-medium"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    {isOpen ? "▲ Masquer" : "▼ Voir détails"}
                </button>
            </div>

            {/* Détails principaux */}
            <div className="mt-3 flex justify-between items-center">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${statutLivraison ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                    {statutLivraison ? "Commande reçue" : "En cours de livraison"}
                </span>
                <span className="font-semibold">Total : {total.toFixed(2)}€</span>
            </div>

            {/* Contenu caché : Liste des produits */}
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100 py-2 pt-4' : 'max-h-0 opacity-0 py-0'}`}
            >
                <div className="border-t mt-4 pt-4"> {/* Ajout de la bordure et de l'espace en haut */}
                    <ul className="space-y-3"> {/* Ajout de l'espace entre chaque élément de la liste */}
                        {Array.from({ length: nbProduits }).map((_, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <div className="w-1/4 flex justify-center">
                                    <img
                                        src={`/images/${images[index]}`}
                                        alt={noms[index]}
                                        className="w-20 object-cover rounded-lg shadow-sm"
                                    />
                                </div>
                                <div className="flex-1 h-full">
                                    <Link className="hover:underline hover:text-blue-600 underline-offset-2 font-medium" to={`/produit/${ids[index]}`}>
                                        {noms[index]}
                                    </Link>
                                    <p className="text-md text-gray-500">Quantité : {quantites[index]}</p>
                                </div>
                                <div className="w-1/4">{prix[index].toFixed(2)}€</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CommandeCard;
