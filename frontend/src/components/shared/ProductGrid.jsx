import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ConteneurPlant from "./ConteneurPlant";
import { checkUserConnect } from '../shared/CheckUserInformation';

const ProductGrid = ({ data }) => {
  const [userID, setuserID] = useState();
  const [dataCookie, setDataCookie] = useState();
  const wishList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/checkWishList`, {
        credentials: "include",
      });
      const dataWishList = await response.json();
      setDataCookie(dataWishList.wishList);
    } catch (error) {
      console.error("Erreur lors de la vérification de la wishlist:", error);
    } 
};

  // Fonction pour récupérer les informations de la session
  const getUserInfo = async () => {
    const result = await checkUserConnect();
    const resultIDUser = result.user.id;
    setuserID(resultIDUser)
  };

  const itemsPerPage = 20;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = data.slice(offset, offset + itemsPerPage);
  useEffect(() => {
    getUserInfo();
    wishList();
  }, []);
  return (
    <div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full ">
  {currentItems.map((plant, index) => (
    <div key={index} className="w-full">
      <ConteneurPlant
        taille={'full'}
        id={plant.id}
        primaryImage={`/images/${plant.images[0]}`}
        secondaryImage={`/images/${plant.images[1]}`}
        altPrimary="photo 1 de la plante"
        altSecondary="photo 2 de la plante"
        nom={plant.nom}
        descriptionRapide={plant.famille}
        prixInitial={plant.prix}
        reduction={plant.promotion || null}
        infoStock="disponible"
        idUser={userID}
        isWishlisted={dataCookie?.includes(plant.id)}
        hauteur = {500}
      />
    </div>
  ))}
</div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center mt-6"}
        pageClassName={"items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform rounded-md border-2 border-gray-500 hover:bg-emerald-600 hover:text-white"}
        activeClassName={"bg-emerald-600 text-white font-bold"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default ProductGrid;