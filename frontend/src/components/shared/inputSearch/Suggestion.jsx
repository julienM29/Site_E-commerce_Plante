import React, { useEffect, useState, useRef } from 'react';

function Suggestion({ data }) {
    console.log('dans suggestion et data plant suggestion : ', data)
    return (
        <>
            <div className="absolute left-1/2 top-[80px] transform -translate-x-1/2 z-20 bg-black/30 backdrop-blur-md rounded-xl p-4 w-[80vw] max-w-2xl">
                <div className="bg-white p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4">Résultats de recherche</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {data.map((item) => (
                            <a href={`/produit/${item.id}`} key={item.id} className="bg-white rounded-lg shadow-lg border p-2 hover:shadow-xl transition">
                                <img src={`/images/${item.image}`} alt={item.image} className="w-full h-40 object-cover rounded-t-lg" />
                                <div className="p-2">
                                    <h2 className="text-base font-semibold truncate">{item.nom}</h2>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Suggestion;
