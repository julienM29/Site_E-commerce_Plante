import React, { useState } from 'react';
import ConteneurQuantity from '../shared/QuantityInput';

const DetailProduit = ({ nom, nomLatin, promotion, prixInitial, typePlant, litrageDisponible, dateLivraison, userID }) => {
  const [quantityProduct, setQuantityProduct] = useState(0);

  // Calcul du prix réduit si la promotion est différente de 0
  const prixReduit = promotion !== 0 ? (prixInitial * (1 - promotion / 100)).toFixed(2) : 0;

  return (
    <div className="flex h-full w-2/6 flex-col gap-6 order-3 border border-gray-200 shadow-md hover:shadow-xl transition-shadow p-5 bg-white rounded-2xl">

  {/* Nom du plant */}
  <div className="flex flex-col gap-2">
    <h2 className="text-3xl font-bold text-gray-800">{nom}</h2>
    <p className="italic text-xl text-gray-500">{nomLatin}</p>
  </div>

  {/* Prix du plant */}
  <div className="flex flex-col gap-2">
    <p className="text-xs bg-emerald-600 text-white py-1 px-3 w-fit font-semibold rounded-full uppercase tracking-wide">
      {typePlant}
    </p>
    <div className={`flex ${promotion !== 0 ? 'justify-between items-center' : 'justify-end'} w-full`}>
      {promotion !== 0 && (
        <p className="bg-red-600 text-white py-1 px-3 text-xs font-bold rounded-full uppercase tracking-widest">
          Promo -{promotion}%
        </p>
      )}
      {promotion !== 0 ? (
        <div className="flex flex-col items-end gap-1">
          <p className="text-4xl font-bold text-red-600">{prixReduit}€</p>
          <p className="text-base font-medium text-gray-400 line-through">{prixInitial}€</p>
        </div>
      ) : (
        <p className="font-semibold text-3xl text-emerald-800">{prixInitial}€</p>
      )}
    </div>
  </div>

  {/* Format des plants + form */}
  <div className="flex flex-col gap-6">
    
    {/* Informations principales du produit */}
    <div className="border border-gray-100 rounded-2xl bg-gray-50 p-6 shadow-inner flex flex-col gap-5">

  <h4 className="text-xl font-bold text-gray-800">Disponibilité & Livraison</h4>

  <div className="flex justify-between gap-6">

    {/* Colonne Gauche - Taille et expédition */}
    <div className="flex flex-col gap-4 w-1/2">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Taille disponible</p>
        <p className="text-gray-800 text-md font-medium">{litrageDisponible} L</p>
      </div>
       <div className="flex items-center gap-2">
        <img src="/icones/verifier.png" alt="Vérifier" className="w-5 h-5" />
        <p className="text-green-700 font-semibold text-sm">En stock</p>
      </div>
    </div>

    {/* Colonne Droite - Disponibilité */}
    <div className="flex flex-col gap-4 w-1/2 pl-4 border-l border-gray-200">
      
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-lg">📦</span>
        <p className="text-gray-600 text-sm">
          Livraison prévue le <span className="font-semibold text-gray-800">{dateLivraison}</span>
        </p>
      </div>
     <div className="flex items-center gap-2">
        <span className="text-emerald-500 text-xl">🚀</span>
        <p className="text-emerald-600 font-semibold text-sm">Expédition dès demain</p>
      </div>
    </div>

  </div>

</div>


    {/* Section pour la quantité et l'ajout au panier */}
    {userID ? (
      <div className="flex justify-between items-center gap-6">
        <ConteneurQuantity
          quantityProduct={quantityProduct}
          heightInput="11"
          paddingButton="3"
          setQuantityProduct={setQuantityProduct}
        />
        <button className="rounded-lg bg-emerald-900 text-white w-2/3 py-3 hover:bg-emerald-800 active:scale-95 transition transform">
          Ajouter au panier
        </button>
      </div>
    ) : (
      <div className="flex gap-3 items-center bg-yellow-100 border border-yellow-300 rounded-xl py-3 px-4">
        <p className="text-yellow-900 font-medium text-sm">
          Veuillez vous connecter pour ajouter ce produit à votre panier.
        </p>
        <a
          href="/login"
          className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Se connecter
        </a>
      </div>
    )}

  </div>
</div>

  );
};

export default DetailProduit;
