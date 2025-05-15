import React, { useState, useEffect } from 'react';
import ProductGrid from '../shared/ProductGrid';
import FilterBar from '../shared/FilterBar';
import { useSearchParams } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';
import { fetchProductsByParams, fetchTypes } from '../shared/search/SearchUtils';
import { useMediaQuery } from 'react-responsive';
import { Sheet } from 'react-modal-sheet';
import { useSelector, useDispatch } from 'react-redux'; // Importer useSelector et useDispatch
import { setAllFilters, resetFilters } from '../../filterSlice';
import BottomSheetFilterSearch from '../shared/BottomSheetPanier/BottomSheetFilterSearch';
const SearchMobile = () => {
    const [types, setTypes] = useState([]);
    const [dataPlants, setDataPlants] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [filtersReset, setFiltersReset] = useState(false);

    // Utiliser useSelector pour récupérer les filtres depuis Redux
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const handleSetFilter  = (newFilters) => {
        dispatch(setAllFilters(newFilters));
    };
    const [productFound, setProductFound] = useState(false);
    const [openSheet, setOpenSheet] = useState(false); // Contrôle l'ouverture du Drawer

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const loadTypesPlant = async () => {
        try {
            const data = await fetchTypes();
            setTypes(data || []);
        } catch (error) {
            console.error('Erreur lors du chargement des types:', error);
        }
    };

    const searchByParams = async () => {
        try {
            setLoading(true);
            const data = await fetchProductsByParams(filters);
            setDataPlants(data || []);
            setProductFound(data && data.length > 0);
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    const resetFiltersHandler = () => {
        // Réinitialiser tous les filtres via Redux
        dispatch(resetFilters());
        setFiltersReset(true);
    };

    const handleOpen = () => setOpenSheet(true);
    const handleClose = () => setOpenSheet(false);

    useEffect(() => {
        loadTypesPlant();
        searchByParams();
    }, []);

    useEffect(() => {
        if (filtersReset) {
            searchByParams();
            setFiltersReset(false);
        }
    }, [filters, filtersReset]);

    return (
        <div className="bg-custom-light min-h-screen flex flex-col items-center py-4">
            <div className="w-11/12 flex flex-col gap-4">

                {/* Bouton pour ouvrir les filtres (Drawer) */}
                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-emerald-700 text-white rounded-xl shadow-lg" onClick={handleOpen}>
                        Filtrer les produits
                    </button>
                </div>

                <BottomSheetFilterSearch
                    openSheet={openSheet}
                    handleClose={handleClose}
                    handleSetFilter={handleSetFilter}
                    filters={filters}
                    isMobile={isMobile}
                    searchByParams={searchByParams}
                    
                />

                {loading ? (
                    <div className="h-screen flex justify-center items-center">
                        <OrbitProgress color="#32cd32" size="large" />
                    </div>
                ) : (
                    <>
                        {!productFound ? (
                            <div className="flex flex-col items-center text-center gap-4 mt-20">
                                <img src="/icones/product_not_found.png" alt="Aucun produit" className="w-20 h-20" />
                                <p className="text-xl font-semibold">Aucun produit trouvé</p>
                                <p className="text-gray-500">Essayez d'autres filtres</p>
                                <button
                                    onClick={resetFiltersHandler}
                                    className="mt-4 bg-emerald-600 text-white rounded-2xl px-6 py-2 shadow-md"
                                >
                                    Réinitialiser
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="text-md mb-2">{dataPlants.length} résultats</p>
                                <ProductGrid data={dataPlants} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchMobile;
