import React, { useState } from 'react';
import ConteneurQuantity from '../QuantityInput';

const ConteneurDetailProduitPanierMobile = ({ panierIndex, produit }) => {
    const [prixUnite] = useState((produit.prix / produit.quantite).toFixed(2));

    return (
        <div className="flex flex-col gap-3 p-4 rounded-xl border shadow-sm bg-white">
            {/* Image + nom produit */}
            <div className="flex items-start gap-4">
                <img
                    src={`/images/${produit.image}`}
                    alt={produit.nom}
                    className="w-24 h-24 rounded-md border object-cover"
                />
                <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800">{produit.nom}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Les 2 pots / 9cm de diamètre
                    </p>
                </div>
            </div>

            {/* Disponibilité */}
            <div className="flex items-center gap-2 text-sm text-green-600">
                <img src="icones/verifier_white.png" alt="" className="w-5 h-5" />
                <span>En stock</span>
                <span className="text-gray-500">• Expédition dès demain</span>
            </div>

            {/* Quantité */}
            <div className="flex justify-between items-center text-sm text-gray-700 w-3/4">
                <span className='font-bold'>Quantité :</span>
                <ConteneurQuantity panierIndex={panierIndex} heightInput="9" paddingButton="3" />
            </div>

            <div className='flex justify-between'>
            <div className="flex gap-4 items-center text-sm text-gray-700 ">
                <span className='font-bold'>Prix unitaire :</span>
                <span className="text-base  ">{prixUnite} €</span>
            </div>

            <div className="flex gap-4 items-center text-sm text-gray-700  ">
                <span className='font-bold'>Total :</span>
                <span className="text-base font-semibold">{produit.prix.toFixed(2)} €</span>
            </div>
            </div>
        </div>
    );
};

export default ConteneurDetailProduitPanierMobile;
