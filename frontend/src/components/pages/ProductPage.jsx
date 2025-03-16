import React, { useState, useEffect, useRef } from 'react';
import Swiper3Plants from '../shared/Swiper3Plants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import CaracteristiqueProduit from '../shared/CaracteristiqueProduit';
import DetailProduit from '../shared/DetailProduit';
import { useParams } from 'react-router-dom';
import EsthetiqueProduct from '../shared/productPage/EsthetiqueProduct';
import JardinageProduct from '../shared/productPage/JardinageProduct';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const ProductPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [dataPlants, setDataPlants] = useState({});
  const [tabImages, setTabImages] = useState([]);  // Utilisation de useState pour tabImages
  const { id } = useParams();

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

  useEffect(() => {
    loadPlants();
  }, []);

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

  const PlantSuggestions = () => (
    <div className="w-full flex flex-col items-center gap-6">
      <h2 className="text-3xl font-semibold">Vous pourriez aussi aimer ceci...</h2>
      <div className='w-4/5 flex justify-center'>
        <Swiper3Plants />
      </div>
    </div>
  );

  return (
    <div className="bg-custom-light py-6 flex flex-col items-center gap-6">
      <div className="w-3/4 flex flex-col gap-4 pb-6">
        <p className="text-left w-full text-gray-500">
          Accueil / Plantes / {dataPlants.type} / {dataPlants.famille} / {dataPlants.nom} 
        </p>

        <div className="w-full flex flex-col xl:flex-row justify-center items-start gap-8">
          <div className="w-3/6 order-1 xl:order-2">
            <Swiper
              slidesPerView={1}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              modules={[EffectFade]}
              className="clientSwiper"
            >
              {tabImages.map((url, index) => (
                <SwiperSlide key={index}>
                  <img src={`/images/${url}`} alt={`Slide ${index + 1}`} className="w-full h-[70vh] object-cover rounded-md cursor-pointer" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="py-1 max-xl:w-full w-1/6 h-full xl:top-0 order-2 xl:order-1 custom-controls flex xl:flex-col justify-start items-center gap-4">
            {tabImages.map((url, index) => (
              <ImgPlants
                key={index}
                url={url}
                isActive={activeIndex === index}
                onClick={() => handleSlideChange(index)}
              />
            ))}
          </div>

          <DetailProduit
            nom={dataPlants.nom || 'Nom de la plante'}
            nomLatin={dataPlants.nom_latin || 'Nom latin'}
            promotion={dataPlants.promotion}
            prixInitial={dataPlants.prix || 'Non spécifié'}
            typePlant={dataPlants.type || 'Type non spécifié'}
            litrageDisponible={dataPlants.litragesDispo || 'Non spécifié'}
          />
        </div>
      </div>
      <div className='bg-white py-6 flex flex-col w-full items-center gap-4 border'>
      <div className='flex w-[60%] flex-col gap-8 '>
        <h2 className='w-full text-start text-4xl font-semibold text-green-800'>Caractéristiques</h2>
        <div className='w-full flex divide-x-2'>
          <EsthetiqueProduct periodeFloraison={dataPlants.periode_floraison}  
          hauteurMin={dataPlants.hauteur_min} 
          hauteurMax={dataPlants.hauteur_max} 
          fleurCouper={dataPlants.fleurs_pour_couper} 
          couleur={dataPlants.couleur} 
          persistant={dataPlants.persistan_feuillage} 
          parfum={dataPlants.parfum} 
          port={dataPlants.port} 
          largeurMin={dataPlants.largeur_maturité_min} 
          largeurMax={dataPlants.largeur_maturité_max} 
          couleurFeuille={dataPlants.couleur_feuilles} />
          <JardinageProduct 
          rusticite={dataPlants.rusticite}
          periodePlantation={dataPlants.periode_plantation} 
          culturePotBac={dataPlants.culture_pot_bac} 
          frequenceArrosage={dataPlants.frequence_arrosage} 
          mellifere={dataPlants.mellifere} 
          protectionFroid={dataPlants.protection_froid} 
          vitesseCroissance={dataPlants.vitesse_croissance} 
          distancePlantationMin={dataPlants.distance_plantation_min} 
          distancePlantationMax={dataPlants.distance_plantation_max} 
          precaution={dataPlants.precaution} 
          periodeRecolte={dataPlants.periode_recolte} 
          greffe={dataPlants.greffe} />
        </div>
      </div>
    </div>
      
      <PlantSuggestions />
    </div>
  );
};

export default ProductPage;
