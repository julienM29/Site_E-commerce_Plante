import React, { useEffect, useState } from 'react';

function Footer() {
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;

      if (width < 640) setScreenSize('xs (<640px)');
      else if (width >= 640 && width < 768) setScreenSize('sm (640px - 767px)');
      else if (width >= 768 && width < 1024) setScreenSize('md (768px - 1023px)');
      else if (width >= 1024 && width < 1280) setScreenSize('lg (1024px - 1279px)');
      else if (width >= 1280 && width < 1536) setScreenSize('xl (1280px - 1535px)');
      else setScreenSize('2xl (≥1536px)');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);
  return (
    <>
    <div className='flex flex-col'>
    <div className="w-full flex justify-center bg-emerald-100 py-5 px-4">
  <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-6">
    <p className="md:w-1/2 text-center md:text-left text-2xl font-semibold text-gray-800">
      Inscrivez-vous à notre newsletter et bénéficiez de remises exclusives
    </p>
    <div className="md:w-1/2 flex flex-col sm:flex-row  items-center">
      <input
        type="email"
        placeholder="Entrez votre email"
        className="flex-1 px-4 py-3 rounded-s-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      />
      <button className="px-6 py-3  font-bold rounded-e-lg bg-gradient-to-r from-emerald-300 to-emerald-600 hover:bg-gradient-to-l hover:from-emerald-300 hover:to-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-400 text-white text-md text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out border-e">
        S'ABONNER
      </button>
    </div>
  </div>
</div>

      <div className="w-full py-2 flex flex-col items-center gap-6 text-white bg-custom-dark-green">
        <div className='flex gap-2 items-center'>
          <img src="/images/plante.png" alt="Logo" className="object-scale-down h-12 w-12" />
          <p className="text-3xl">Kerisnel</p>
        </div>
        <p className='w-3/4 text-sm text-center px-5'>Découvrez tout l'univers Willemse : Vente de plantes par correspondance, Plantes & fleurs d'ombre, Plantes & fleurs pas cher ou parcourez le plan du site Willemse. Découvrez la société Willemse SAS sur Wikipedia, la chaîne Youtube de Willemse, la page Pinterest de Willemse. Enfin suivez Willemse sur Facebook. Jardinerie Willemse : vente en ligne de plantes, graines et accessoires pour le jardin. La jardinerie par correspondance Willemse est leader de la vente de plantes et du jardinage. Les locaux de la société sont situés dans le Nord de la France mais nous assurons la livraison dans toute la France. Spécialiste de la vente de plante par correspondance, votre jardinerie discount Willemse vous propose la vente en ligne de plantes issues des meilleures pépinières, rigoureusement sélectionnées par nos équipes. De quoi contenter tous les jardiniers, des moins expérimentés (qui peuvent compter sur l'expertise de nos équipes pour obtenir des conseils en jardinage) aux plus exigeants. Nous vous proposons des fleurs, plantes vertes, plantes rares ou originales, en pot, sur pied ou tige, sous forme de graines ou de bulbes. Chaque sélection est adaptée aux saisons, que ce soit pour le jardin ou le potager. Vous découvrirez le détail et la richesse de notre gamme sur le plan du site.
          Rosier, Plante, Graine, Arbre & Arbuste © Willemse SAS, Jardinerie en Ligne 2023- Tous droits réservés
          *Les prix de référence sont les prix les plus bas constatés sur le site willemsefrance.fr  entre le 03/01/2024 et le 31/01/2024, sauf pour les bulbes d’automne entre le 01/08/2024 et le 31/08/2024</p>
      </div>
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg">
        <p className="text-sm font-medium">Screen Size: {screenSize}</p>
      </div>
      </div>
    </>
  );
}

export default Footer;
