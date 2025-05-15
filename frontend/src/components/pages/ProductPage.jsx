import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import DetailProduit from '../shared/DetailProduit';
import { useParams } from 'react-router-dom';
import EsthetiqueProduct from '../shared/productPage/EsthetiqueProduct';
import JardinageProduct from '../shared/productPage/JardinageProduct';
import EmplacementProduct from '../shared/productPage/EmplacementProduct';
import { Link } from "react-router-dom";
import ProductPageDesktop from '../layout/ProductPageDesktop';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import SwiperPromotion from '../shared/SwipperPromotion';
import TitreSection from '../shared/homePage/TitreSection';
import { getUserInfoAndWishList } from '../shared/UserUtils';
import { useGsapProductPage } from '../../useGsapProductPage';
import { useMediaQuery } from 'react-responsive'; // ou un custom hook
import ProductPageMobile from '../layout/ProductPageMobile';

const ProductPage = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [dataPlants, setDataPlants] = useState({});
  const [dataPlantsSuggestions, setDataPlantsSuggestions] = useState([]);
  const [tabImages, setTabImages] = useState([]);  // Utilisation de useState pour tabImages
  const { id } = useParams();
  const [userID, setUserID] = useState();
  const [dataCookie, setDataCookie] = useState();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  const formattedDate = threeDaysLater.toLocaleDateString("fr-FR"); // Format : "15/03/2025"
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGsapProductPage(dataPlantsSuggestions);

  const handleSlideChange = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

  const loadPlants = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/loadProduct/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.product && data.product.length > 0) {
        const product = data.product[0];
        setDataPlants(product);

        // Split des images en tableau et mise à jour de tabImages
        const imagesArray = product.images ? product.images.split(', ') : [];
        setTabImages(imagesArray);
      } else {
        setDataPlants({});
        setTabImages([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const searchSuggestions = async (type_id, produit_id) => {
    try {
      const response = await fetch(`http://localhost:3000/loadSuggestionProduct/${type_id}/${produit_id}`);
      const data = await response.json();
      setDataPlantsSuggestions(data.products || []);
    } catch (error) {
      console.error('Erreur lors du chargement des plantes:', error);
    }
  };
  const updateRecentlyViewedProductCookie = async (newProductId) => {
    await fetch(`http://localhost:3000/updateRecentlyViewProduct/${userID}/${newProductId}`, {
      method: 'POST',
    });
  };



  useEffect(() => {
    loadPlants();
  }, [id]); // recharge les données produit quand `id` change
  
  useEffect(() => {
    getUserInfoAndWishList(setUserID, setDataCookie);
  }, []); // reste indépendant, ne dépend pas de `id`
  useEffect(() => {
    if (userID) {
      updateRecentlyViewedProductCookie(id)
    }
  }, [userID]);
  useEffect(() => {
    searchSuggestions(dataPlants.id_type, dataPlants.id);
  }, [dataPlants])
  const ImgPlants = ({ url, onClick, isActive }) => {
    return (
      <div
        className={`transition ease-in-out hover:scale-110 duration-300 w-20 h-20 overflow-hidden cursor-pointer hover:border-emerald-400 hover:border-4 ${isActive ? 'border-4 border-emerald-400 ' : ''}`}
        onClick={onClick}
      >
        <img src={`/images/${url}`} alt="Thumbnail" className="w-full h-full object-cover" />
      </div>
    );
  };

  return (isMobile ?
    <ProductPageMobile
      dataPlants={dataPlants}
      handleSlideChange={handleSlideChange}
      tabImages={tabImages}
      formattedDate={formattedDate}
      userID={userID}
      dataPlantsSuggestions={dataPlantsSuggestions}
      dataCookie={dataCookie}
      swiperRef={swiperRef}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      ImgPlants={ImgPlants}

      isMobile={isMobile}
    />
    :
    <ProductPageDesktop
      dataPlants={dataPlants}
      DetailProduit={DetailProduit}
      EsthetiqueProduct={EsthetiqueProduct}
      JardinageProduct={JardinageProduct}
      EmplacementProduct={EmplacementProduct}
      TitreSection={TitreSection} Link={Link}
      SwiperPromotion={SwiperPromotion}
      Swiper={Swiper}
      SwiperSlide={SwiperSlide}
      EffectFade={EffectFade}
      handleSlideChange={handleSlideChange}
      tabImages={tabImages}
      ImgPlants={ImgPlants}
      formattedDate={formattedDate}
      userID={userID}
      dataPlantsSuggestions={dataPlantsSuggestions}
      dataCookie={dataCookie}
      swiperRef={swiperRef}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}

    />
    
  );
};

export default ProductPage;
