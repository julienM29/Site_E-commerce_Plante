import React, { useState, useEffect } from 'react';
import ProductGrid from '../shared/ProductGrid';
import FilterBar from '../shared/FilterBar';
import { useSearchParams } from "react-router-dom";
import { OrbitProgress } from 'react-loading-indicators';
import { fetchProductsByParams, fetchTypes } from '../shared/search/SearchUtils';
import { useMediaQuery } from 'react-responsive';
import { Sheet } from 'react-modal-sheet';
import Feuillage from '../shared/filterBar/feuillage';
import Parfum from '../shared/filterBar/Parfum';
import Mellifere from '../shared/filterBar/Mellifere';
import ColorFilter from '../shared/filterBar/Couleur';
import Accordeon from '../shared/filterBar/Accordeon';
import Promotion from '../shared/filterBar/Promotion';
import Exposition from '../shared/filterBar/Exposition';
import Arrosage from '../shared/filterBar/Arrosage';
import Emplacement from '../shared/filterBar/Emplacement';
import Floraison from '../shared/filterBar/Floraison';
import Recolte from '../shared/filterBar/Recolte';

const SearchMobile = () => {
    const [types, setTypes] = useState([]);
    const [dataPlants, setDataPlants] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [filtersReset, setFiltersReset] = useState(false);

    const [filters, setFilters] = useState({
        text: searchParams.get("q") || null,
        color: null,
        minPrice: null,
        maxPrice: null,
        exposition: null,
        arrosage: null,
        emplacement: null,
        floraison: null,
        recolte: null,
        persistant: null,
        type: searchParams.get("t") || null,
        promotion: searchParams.get("p") ? true : null,
    });
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

    const resetFilters = () => {
        setFilters({
            text: null,
            color: null,
            minPrice: null,
            maxPrice: null,
            exposition: null,
            arrosage: null,
            emplacement: null,
            floraison: null,
            recolte: null,
            persistant: null,
            type: null,
            promotion: null,
        });
        setFiltersReset(true);

    };

    const handleOpen = () => setOpenSheet(true);
    const handleClose = () => setOpenSheet(false);
    const FilterGroup = ({ title, children }) => (
        <section className='flex flex-col gap-4 border-t-4 py-5'>
            <h3 className="text-lg font-medium ">{title}</h3>
            <div>{children}</div>
        </section>
    );
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
                    <button className="px-4 py-2 bg-emerald-700 text-white rounded-xl shadow-lg"
                        onClick={handleOpen}>
                        Filtrer les produits
                    </button>
                </div>

                {/* Drawer pour les filtres */}
                <Sheet
                    isOpen={openSheet}
                    onClose={handleClose}
                    snapPoints={[1, 0.5]}
                >
                    <Sheet.Container>
                        <Sheet.Header />
                        <Sheet.Content>

                            <div className="flex flex-col h-[90vh] px-4">
                                <div
                                    className="flex-1 overflow-y-auto space-y-6"
                                    style={{ scrollbarGutter: 'stable' }}
                                >                                    <h2 className="text-xl font-semibold  ">Filtres de recherche</h2>

                                    <div className="flex justify-around border-t-4 py-5">
                                        <Accordeon setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                        <Promotion setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                    </div>
                                    <FilterGroup title="Couleur">
                                        <ColorFilter setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                    </FilterGroup>
                                    <div className="grid grid-cols-2 gap-2 border-t-4 py-5">
                                        <Exposition setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                        <Arrosage setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 border-t-4 py-5">
                                        <Feuillage setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                        <Parfum setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                        <Mellifere setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                    </div>
                                    <Emplacement setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                    <Floraison setFilters={setFilters} filters={filters} isMobile={isMobile} />
                                    <Recolte setFilters={setFilters} filters={filters} isMobile={isMobile} />

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
                        </Sheet.Content>
                    </Sheet.Container>

                    <Sheet.Backdrop />
                </Sheet>


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
                                <button onClick={resetFilters}
                                    className="mt-4 bg-emerald-600 text-white rounded-2xl px-6 py-2 shadow-md">
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
