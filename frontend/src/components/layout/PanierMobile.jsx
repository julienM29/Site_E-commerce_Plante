import React from 'react';
import BarreLivraisonGratuite from '../shared/BarreLivraisonGratuite';
import SwiperPromotion from '../shared/SwipperPromotion';
import ConteneurDetailProduitPanierMobile from '../shared/panier/ConteneurDetailProduitPanierMobile';

const PanierMobile = ({ total, panier, userID, validerAchat, garantie, handleGarantie, dataSelectionPlants, dataCookie }) => {
    return (
        <div className="bg-custom-light py-8 px-4 min-h-screen w-full flex flex-col gap-10">

            {/* Titre + Barre livraison */}
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-3xl font-bold text-gray-700 text-center">Panier</h1>
                <BarreLivraisonGratuite prixPanier={total} />
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col gap-6 w-full">

                {/* Panier produits */}
                <div className="bg-white rounded-2xl p-4 border shadow-md">
                    {userID ? (
                        panier.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {panier.map((produit, index) => (
                                    <ConteneurDetailProduitPanierMobile
                                        key={produit.id}
                                        panierIndex={index}
                                        produit={produit}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <img src="/icones/brouette_vide.png" alt="Panier vide" className="w-16 h-16" />
                                <p className="text-xl font-semibold text-gray-700">Votre panier est vide...</p>
                                <div className="bg-yellow-100/80 p-4 rounded-lg border border-yellow-300 text-center">
                                    <p className="text-sm text-gray-600">Connectez-vous pour voir votre panier et y ajouter des produits.</p>
                                    <a
                                        href="/login"
                                        className="mt-3 inline-block bg-emerald-700 hover:bg-emerald-500 text-white font-semibold rounded-full px-4 py-2 text-sm"
                                    >
                                        Se connecter
                                    </a>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-sm text-center">
                            Connectez-vous pour afficher le panier et pouvoir le valider.
                        </div>
                    )}
                </div>

                {/* Bloc récap prix et commande */}
                <div className="bg-white rounded-2xl p-4 border shadow-md flex flex-col gap-4">
                    <p className="text-base font-medium text-center text-gray-700">
                        Livraison entre le 04/01/2025 et le 09/01/2025
                    </p>
                    <div className="flex justify-between text-lg font-semibold">
                        <p>Total</p>
                        <p>{total} EUR</p>
                    </div>
                    <p className="text-sm text-gray-600">
                        Livraison 6.90€ (en relais), offerte dès 59€
                    </p>

                    {userID && panier.length > 0 ? (
                        <button
                            onClick={validerAchat}
                            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-300 text-white font-semibold rounded-full py-2.5 text-center shadow-md hover:shadow-lg transition-all"
                        >
                            Commander
                        </button>
                    ) : panier.length === 0 ? (
                        <button
                            disabled
                            className="w-full bg-gray-300 text-gray-600 rounded-full py-2.5 text-center cursor-not-allowed"
                        >
                            Commander
                        </button>
                    ) : null}
                </div>

                {/* Garantie */}
                <div className="bg-white rounded-2xl p-4 border shadow-md flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <img src="icones/garantie.png" alt="Garantie" className="w-16 h-16" />
                        <div className="flex flex-col gap-2 text-sm">
                            <p className="font-semibold text-base">Garantie Plant Protect <span className="text-emerald-600">3.90€</span></p>
                            <p>Protégez-vous de toute mauvaise surprise lors de la période de reprise végétale.</p>
                            <a href="#" className="text-emerald-600 underline text-sm">En savoir plus</a>
                        </div>
                    </div>
                    <button
                        onClick={handleGarantie}
                        className={`w-full ${garantie ? 'bg-emerald-700' : 'bg-gradient-to-r from-emerald-600 to-emerald-300'} text-white font-semibold rounded-full py-2.5 shadow-md`}
                    >
                        {garantie !== 0 ? "Retirer" : "Ajouter"}
                    </button>
                </div>

                {/* Blocs marketing */}
                <div className="flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-2">
                        <h2 className="text-lg font-bold text-emerald-600 text-center">Paiement sécurisé avec</h2>
                        <div className="grid grid-cols-2 gap-2 w-full">
                            {["logo_cb.jpeg", "master_card.png", "visa.png", "paypal.png"].map((src, i) => (
                                <img key={i} src={`icones/${src}`} alt={src} className="w-full h-12 object-contain border p-1 rounded-md" />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-2">
                        <h2 className="text-lg font-bold text-emerald-600">Qualité Kerisnel</h2>
                        <p className="text-sm text-center text-gray-700">40 ans d'expertise pour votre jardin</p>
                        <img src="icones/quality.png" alt="Qualité" className="w-20 object-contain" />
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-2">
                        <h2 className="text-lg font-bold text-emerald-600">Avis clients vérifiés</h2>
                        <img src="icones/avis_client.jpeg" alt="Avis clients" className="w-20 object-contain" />
                    </div>
                </div>
            </div>

            {/* Meilleures ventes */}
            <div className="w-full flex flex-col gap-6" id="meilleurs_ventes">
                <h2 className="text-3xl font-semibold text-gray-700 text-center">Les meilleures ventes</h2>
                <SwiperPromotion nbSlides={1} products={dataSelectionPlants} userID={userID} dataCookie={dataCookie} />
            </div>
        </div>
    );
};

export default PanierMobile;
