import React, { useState } from 'react';
import logoPlant from '../assets/images/laf_111580_1_1000x.webp';
import logoPlant2 from '../assets/images/ACHICRIT1.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

function ProductPage() {
  const [urlImgPrincipal, setUrlImgPrincipal] = useState(logoPlant);

  const changeImg = (url) => {
    setUrlImgPrincipal(url);
  };

  const ButtonChangeImg = ({ urlImg, border, borderColor }) => {
    return (
      <button onClick={() => changeImg(urlImg)}>
        <img
          src={urlImg}
          alt=""
          className={`object-cover w-24 h-24 p-[2px] transition-all duration-300 hover:border-emerald-400 ${border} ${borderColor}`}
        />
      </button>
    );
  };

  const images = [logoPlant, logoPlant2];

  return (
    <>
      <div className="bg-custom-light py-4 min-h-screen flex flex-col items-center gap-6 px-6">
        <p className="text-left w-full">Route vers le produit contenant de multiples liens</p>
        <div className="flex flex-col gap-4">
          <img src={urlImgPrincipal} alt="Image principale" className="object-cover w-full h-[75vh]" />
          <div className="flex flex-col gap-4 justify-start w-full">
            <div className="flex gap-2">
              <ButtonChangeImg urlImg={logoPlant} border="border-4" borderColor="border-black" />
              <ButtonChangeImg urlImg={logoPlant2} border="border-0" borderColor="border-black" />
            </div>
          </div>
        </div>
<div className='w-full flex justify-center py-8 h-screen'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation= {{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swipper-pagination',
          type: 'bullets',
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>          <img src={urlImgPrincipal} alt="Image principale" className="object-cover w-full h-[75vh]" />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      
      <div className='button-Attrrangement'>
        <div className='button-swiper'>
          <div className='swiper-button-prev'></div>
          <div className='swiper-button-next'></div>
          <div className='swiper-pagination'></div>
        </div></div>
</Swiper>
      
      </div>
      </div>
    </>
  );
}

export default ProductPage;