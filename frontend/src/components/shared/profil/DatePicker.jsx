import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CustomDatePicker({ handleUserInfoChange, date_naissance }) {
  // Vérifie si la date de naissance est passée en prop et la transforme en objet Date valide
  const [date, setDate] = useState(
    date_naissance ? new Date(date_naissance) : new Date()  // Si date_naissance existe, l'utiliser ; sinon, utiliser la date actuelle
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);  // Etat pour afficher ou cacher le calendrier

  const handleDateChange = (newDate) => {
    setDate(newDate);  // Mise à jour de la date sélectionnée
    setIsCalendarOpen(false);  // Ferme le calendrier après la sélection

    // Créer un objet simulant l'événement pour handleUserInfoChange
    const event = {
      target: {
        name: "date_naissance",  // Nom du champ pour la date de naissance
        value: newDate.toLocaleDateString(),  // Format de la date pour l'input
        type: "date",  // Type de l'input (ici, une date)
      }
    };

    // Appel de handleUserInfoChange avec l'objet event simulé
    handleUserInfoChange(event);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={date.toLocaleDateString()} // Affiche la date sélectionnée
        onClick={() => setIsCalendarOpen(!isCalendarOpen)} // Ouvre/ferme le calendrier
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Sélectionner une date"
        readOnly // Rendre le champ en lecture seule
      />
      {isCalendarOpen && (
        <div className="absolute top-full mt-2 left-0 z-10">
          <Calendar
            onChange={handleDateChange} // Quand une date est sélectionnée
            value={date} // La date sélectionnée sera la valeur du calendrier
          />
        </div>
      )}
    </div>
  );
}

export default CustomDatePicker;
