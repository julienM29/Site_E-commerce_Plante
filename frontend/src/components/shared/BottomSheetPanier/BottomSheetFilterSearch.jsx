import React, { useState, useEffect } from 'react';
import BarreLivraisonGratuite from '../BarreLivraisonGratuite';
import ConteneurProduitPanier from '../ConteneurProduitPanier';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../filterSlice';
import { Sheet } from 'react-modal-sheet';
import Accordeon from '../filterBar/Accordeon';
import Promotion from '../filterBar/Promotion';
import ColorFilter from '../filterBar/Couleur';
import Exposition from '../filterBar/Exposition';
import Arrosage from '../filterBar/Arrosage';
import Feuillage from '../filterBar/feuillage';
import Parfum from '../filterBar/Parfum';
import Mellifere from '../filterBar/Mellifere';
import Emplacement from '../filterBar/Emplacement';
import Floraison from '../filterBar/Floraison';
import Recolte from '../filterBar/Recolte';

const BottomSheetFilterSearch = ({ openSheet, handleClose, handleSetFilter, filters, isMobile, searchByParams }) => {

    return (
        <Sheet
            isOpen={openSheet}
            onClose={handleClose}
            snapPoints={[1, 0.5]}
        >
            <Sheet.Container>
                <Sheet.Header>
                    <div className="flex flex-col gap-6 items-center justify-center py-4 bg-gray-200 rounded-t-lg">
                        <div className="w-16 h-1 bg-gray-400 rounded-full" />
                        <h2 className="w-full flex items-start  px-4 text-lg font-semibold">
                            Filtres de recherche
                        </h2>
                    </div>
                </Sheet.Header>
                <Sheet.Content onClick={(e) => e.stopPropagation()}>

                    <div className="flex flex-col h-[90vh] px-4 py-6">
                        <div
                            className="flex-1 overflow-y-auto space-y-6"
                            style={{ scrollbarGutter: 'stable' }}
                        >
                            {/* <h2 className="text-xl font-semibold  ">Filtres de recherche</h2> */}
                            {filters.text && (
                                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg px-4 py-2 mb-4">
                                    <p className="text-sm">
                                        Vous recherchez actuellement un produit avec le mot-clé : <strong>"{filters.text}"</strong>
                                    </p>
                                    <button
                                        onClick={() => {
                                            handleSetFilter({ ...filters, text: '' });
                                        }}
                                        className="text-sm underline text-yellow-700 mt-2"
                                    >
                                        Supprimer cette recherche par nom
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-around   py-5">
                                <Accordeon setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                                <Promotion setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                            </div>

                            <section className='flex flex-col gap-4 border-t-4 py-5'>
                                <h3 className="text-lg font-medium ">Couleur</h3>
                                <ColorFilter setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                            </section>
                            <div className="grid grid-cols-2 gap-2 border-t-4 py-5">
                                <Exposition setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                                <Arrosage setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-t-4 py-5">
                                <Feuillage setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                                <Parfum setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                                <Mellifere setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                            </div>
                            <Emplacement setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                            <Floraison setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                            <Recolte setFilters={handleSetFilter} filters={filters} isMobile={isMobile} />
                            <div className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg border-t border-gray-200 px-4 py-4 flex flex-col items-center gap-3 z-50  ">
                                <button
                                    onClick={() => {
                                        handleClose();
                                        searchByParams();
                                    }}
                                    className="w-full bg-emerald-600 text-white rounded-2xl px-6 py-3  "
                                >
                                    Appliquer les filtres
                                </button>
                            </div>

                        </div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop onTap={handleClose} />
        </Sheet>

    );
};

export default BottomSheetFilterSearch;

