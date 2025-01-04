import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ConteneurPlant from "./ConteneurPlant";
import { logoPlant, logoPlant2 } from '../../assets/images';

// Simule une liste de produits pour tester
const generateProducts = (count) => {
    const products = [];
    for (let i = 0; i < count; i++) {
      products.push({
        id: i,
        primaryImage: "https://via.placeholder.com/350x350",
        secondaryImage: "https://via.placeholder.com/350x350/cccccc",
        altPrimary: `Image principale ${i + 1}`,
        altSecondary: `Image secondaire ${i + 1}`,
        nom: `Plante ${i + 1}`,
        descriptionRapide: `Description rapide ${i + 1}`,
        prixInitial: "12.50",
        prixReduit: "0",
        reduction: "0",
        infoStock: "Disponible",
      });
    }
    return products;
  };
// const ProductGrid = ({ products }) => {
    const ProductGrid = ({  }) => {
        const products = generateProducts(50); // 50 produits simulés

  const itemsPerPage = 20;
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = products.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {currentItems.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl flex flex-col font-semibold w-[300px] border shadow-lg"
          >
            <ConteneurPlant
                primaryImage={logoPlant}
                secondaryImage={logoPlant2}
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="disponible"
                taille="300"
              />
          </div>
        ))}
      </div>
      <ReactPaginate
  previousLabel={"previous"}
  nextLabel={"next"}
  pageCount={pageCount}
  onPageChange={handlePageClick}
  containerClassName={"flex justify-center items-center mt-6"} // Conteneur principal
  pageClassName={
    "items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-white border-2 border-gray-500 dark:text-gray-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-gray-200"
  } // Classe pour chaque numéro de page
  pageLinkClassName={"focus:outline-none"} // Lien de page
  activeClassName={
    "bg-emerald-600 dark:text-gray-50 font-bold dark:bg-emerald-600 "
  } // Classe pour la page active
  previousClassName={
    "flex items-center px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-white rounded-md cursor-not-allowed dark:bg-white border-2 border-gray-500 dark:text-gray-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white"
  } // Bouton précédent
  nextClassName={
    "flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-white border-2 border-gray-500 dark:text-gray-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-gray-200"
  } // Bouton suivant
  breakClassName={
    "items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-white dark:text-gray-100 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-gray-200"
  } // Classe pour les ellipses (...)
  disabledClassName={"opacity-50 cursor-not-allowed"} // Boutons désactivés
/>


    </div>
  );
};

export default ProductGrid;
