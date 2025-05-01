import React from 'react';
const TitreSection = ({ texte, textColor, taillePolice }) => {


    return (
        <p className={`max-md:px-2 max-md:text-center font-semibold ${textColor} ${taillePolice}`}>{texte}</p>
      )
};

export default TitreSection;
