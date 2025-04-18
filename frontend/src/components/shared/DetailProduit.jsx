import React, { useState } from 'react';
import ConteneurQuantity from '../shared/QuantityInput';

const DetailProduit = ({ nom, nomLatin, promotion, prixInitial, typePlant, litrageDisponible, dateLivraison }) => {
  const [quantityProduct, setQuantityProduct] = useState(0);

  // Calcul du prix réduit si la promotion est différente de 0
  const prixReduit = promotion !== 0 ? (prixInitial * (1 - promotion / 100)).toFixed(2) : 0;

  return (
    <div className="flex h-full w-2/3 flex-col gap-6 order-3">
      {/* Nom du plant */}
      <div className='flex flex-col gap-2'>
        <h2 className='text-5xl font-semibold'>{nom}</h2>
        <p className="italic font-semibold text-xl">{nomLatin}</p>
      </div>

      {/* Prix du plant */}
      <div className='flex flex-col gap-2'>
        <div className={`flex ${promotion !== 0 ? 'justify-between items-center' : 'w-full justify-end'} `}>
          {/* Badge de réduction */}
          {promotion !== 0 && (
            <p className="bg-red-700 py-1 px-2 text-white font-semibold text-xl w-fit rounded-md">
              -{promotion}%
            </p>
          )}
          {/* Prix */}
          {promotion !== 0 ? (
            <div className="flex flex-col items-end gap-2">
              <p className="text-red-700 font-semibold text-3xl">{prixReduit}€</p>
              <p className="font-semibold text-xl">
                <del>{prixInitial}€</del>
              </p>
            </div>
          ) : (
            <p className="font-semibold text-3xl text-end">{prixInitial}€</p>
          )}
        </div>
        <p className="bg-emerald-600 text-white py-2 px-5 w-fit font-semibold text-lg rounded-lg">{typePlant}</p>
      </div>

      {/* Format des plants + form */}
      <div className='flex flex-col gap-6'>
        {/* Informations principales du produit */}
        <div className="border rounded-2xl flex flex-col gap-4 py-3 px-4 bg-white">
          <h4 className="text-lg font-semibold ">Disponibilité & Livraison</h4>

          <div className="flex justify-between items-center">
            {/* Taille et expédition */}
            <div className="flex flex-col gap-2">
              <p><span className="font-semibold">Taille disponible : </span> {litrageDisponible} L</p>
              <p className="text-emerald-500 font-medium">🚀 Expédition dès demain !</p>
            </div>

            {/* Disponibilité et livraison */}
            <div className="flex flex-col gap-2 border-l pl-4">
              <div className="flex items-center gap-2">
                <img src="/icones/verifier.png" alt="Vérifier" className="w-6 h-6" />
                <span className="font-medium text-gray-700">En stock</span>
              </div>
              <p className="text-gray-600 text-sm">📦 Livraison prévue le <span className="font-medium text-gray-700">{dateLivraison}</span></p>
            </div>
          </div>
        </div>


        {/* Section pour la quantité et l'ajout au panier */}
        <div className='flex justify-between items-center gap-6'>
          <ConteneurQuantity
            quantityProduct={quantityProduct}
            heightInput='11'
            paddingButton='3'
            setQuantityProduct={setQuantityProduct}
          />
          <button className="rounded-lg bg-emerald-900 text-white w-2/3 py-2">
            Ajouter au panier
          </button>
        </div>
      </div>


      <div className='p-2 bg-white rounded-lg border shadow-lg flex flex-col gap-2'>
        <div className='flex gap-2'>
          <img src="/icones/verifier_white.png" alt="" className='w-6 h-6' />
          <p><span className='font-semibold'>Avis client </span>- *****</p>
        </div>
        <div className='flex gap-2'>
          <img src="/icones/verifier_white.png" alt="" className='w-6 h-6' />
          <p><span className='font-semibold'>Payement sécurisé </span></p>
        </div>
        <div className='flex gap-2'>
          <img src="/icones/verifier_white.png" alt="" className='w-6 h-6' />
          <p><span className='font-semibold'>Livraison gratuite </span>dès 59 € d'achats</p>
        </div>
        <div className='flex gap-2'>
          <img src="/icones/verifier_white.png" alt="" className='w-6 h-6' />
          <p>Payement <span className='font-semibold'>en 3x sans frais</span> dès 60 €</p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduit;
