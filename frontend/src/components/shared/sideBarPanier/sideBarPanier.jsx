import React, { useState, useEffect } from 'react';
import BarreLivraisonGratuite from '../BarreLivraisonGratuite';
import ConteneurProduitPanier from '../ConteneurProduitPanier';
import { checkUserConnect } from '../CheckUserInformation';

const SideBarPanier = ({ sidebarRef, closeSidebar }) => {
    const [produits, setProduits] = useState({});
    const [panier, setPanier] = useState({
        id: '',
        user_id: '',
        createdAt: '',
        nb_produits: '',
    });

    const [prixTotalPanier, setPrixTotalPanier] = useState(0);
    const [userId, setUserId] = useState();
    // Fonction pour récupérer les informations de la session
    const getUserInfo = async () => {
        const result = await checkUserConnect();

        // console.log("🔍 Infos utilisateur récupérées :", result);
        setUserId({
            id: result.user.id,
        })
    };
    const getPanier = async (user_id) => {
        try {
            const response = await fetch(`http://localhost:3000/getPanier/${user_id}`, { method: "POST", credentials: "include" });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Convertir les chaînes en tableaux
            const { produits_id, detail_panier_id, detail_panier_prix_total, detail_panier_quantite, images_urls, noms_produits } = data.panier;

            // Convertir chaque champ en tableau et convertir les valeurs appropriées en nombres
            const produitsIdArray = produits_id.split(', ').map(Number); // Transforme la chaîne en tableau de nombres
            const detailPanierIdArray = detail_panier_id.split(', ').map(Number);
            const detailPanierPrixTotalArray = detail_panier_prix_total.split(', ').map(parseFloat); // Convertit en nombres à virgule flottante
            const detailPanierQuantiteArray = detail_panier_quantite.split(', ').map(Number);
            const imagesUrlsArray = images_urls.split(', '); // Pas besoin de conversion
            const nomsProduitsArray = noms_produits.split(', ');

            if (produitsIdArray.length !== detailPanierIdArray.length || produitsIdArray.length !== detailPanierPrixTotalArray.length || produitsIdArray.length !== detailPanierQuantiteArray.length || produitsIdArray.length !== imagesUrlsArray.length || produitsIdArray.length !== nomsProduitsArray.length) {
                throw new Error("Les tableaux ont des longueurs inconsistantes.");
            }

            // Organiser les données dans un objet produits
            const produits = produitsIdArray.reduce((acc, produitId, index) => {
                acc[produitId] = {
                    id: produitId,
                    nom: nomsProduitsArray[index],
                    detailId: detailPanierIdArray[index],
                    prixTotal: detailPanierPrixTotalArray[index],
                    quantite: detailPanierQuantiteArray[index],
                    imageUrl: imagesUrlsArray[index],
                };
                return acc;
            }, {});

            // Mise à jour de l'état avec les informations du panier
            setProduits(produits);
            setPanier({
                id: data.panier.id,
                user_id: data.panier.user_id,
                createdAt: data.panier.created_at,
                nb_produits: produitsIdArray.length,
            });


            // Calcul du prix total avec réduction à 2 décimales
            const prixTotal = detailPanierPrixTotalArray.reduce((total, prix) => total + prix, 0).toFixed(2);
            setPrixTotalPanier(prixTotal); // Assure-toi que le prix total soit correctement formaté à 2 décimales

        } catch (error) {
            console.error('Erreur lors du chargement du panier:', error);
            // Ajouter éventuellement un état pour afficher une erreur à l'utilisateur, par exemple:
            // setError("Une erreur est survenue lors du chargement de votre panier.");
        }
    };
    const deleteDetailPanier = async (detail_panier_id) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteDetailPanier/${detail_panier_id}`, {
                method: "POST",
                credentials: "include"
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            console.log("Produit supprimé avec succès !");

            // Mettre à jour l'état local après suppression
            setProduits((prevProduits) => {
                const newProduits = { ...prevProduits };
                const produitIdToRemove = Object.values(prevProduits).find(p => p.detailId === detail_panier_id)?.id;

                if (produitIdToRemove) {
                    delete newProduits[produitIdToRemove];
                }

                return newProduits;
            });

            // Mettre à jour le panier avec le nouveau nombre de produits et recalculer le total
            setPanier((prevPanier) => ({
                ...prevPanier,
                nb_produits: Object.keys(produits).length - 1, // -1 car on supprime un produit
            }));

        } catch (error) {
            console.error("Erreur de suppression d'un produit dans le panier :", error);
            toast.error("Impossible de supprimer le produit !");
        }
    };



    useEffect(() => {
        getUserInfo();
    }, []);

    // useEffect pour récupérer le panier seulement quand userId est défini
    useEffect(() => {
        if (userId) {
            getPanier(userId.id);
        }
    }, [userId]);


    return (
        <div ref={sidebarRef} className="fixed flex flex-col items-center top-0 right-0 w-1/5 bg-white h-screen border-l shadow-lg transform translate-x-full z-20">
            {/* En tête de la side barre */}
            <div className="w-full flex items-center justify-around h-[10%] bg-custom-light px-4 py-2">
                <div className="text-3xl font-semibold tracking-wide flex gap-2">
                    <p>Panier</p>
                    <p> - {panier.nb_produits} produits</p>
                </div>
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeSidebar}
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>

            </div>
            {/* Contenu */}
            <div className="w-11/12 h-3/4 flex flex-col gap-2 py-4 overflow-y-auto overflow-x-hidden scrollbar-none ">
                <BarreLivraisonGratuite prixPanier={prixTotalPanier}></BarreLivraisonGratuite>
                {Object.values(produits).map((produit) => (
                    <ConteneurProduitPanier
                        onDelete={() => deleteDetailPanier(produit.detailId)}
                        key={produit.id}
                        detail_panier_id={produit.detailId}
                        imgProduit={produit.imageUrl}
                        prixTotalProduit={produit.prixTotal}
                        nomProduit={produit.nom}
                        quantiteProduit={produit.quantite}
                    />
                ))}

            </div>
            <div className='h-[15%] bg-custom-light w-full flex flex-col gap-4 justify-center items-center'>

                <button type="submit" className="w-3/4 font-bold flex justify-center bg-gradient-to-r from-emerald-600 to-emerald-300 hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-400  text-white rounded-full text-md px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out">
                    <a href="/panier">Aller au panier - 49euros</a>
                </button>
                <button onClick={closeSidebar} className="w-3/4 flex justify-center items-center font-semibold  text-md text-emerald-600 underline-offset-4 hover:underline">
                    Continuer vos achats

                </button>
            </div>
        </div>
    );
};

export default SideBarPanier;

