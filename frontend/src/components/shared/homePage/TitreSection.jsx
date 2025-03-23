import React from 'react';
const TitreSection = ({ texte, textColor, taillePolice }) => {


    return (
        <p className={` font-semibold ${textColor} ${taillePolice}`}>{texte}</p>
      )
};

export default TitreSection;
