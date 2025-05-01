import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CustomDatePicker({ handleUserInfoChange, date_naissance }) {
  const [date, setDate] = useState(
    date_naissance ? new Date(date_naissance) : new Date()
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null); // <- Référence du composant

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setIsCalendarOpen(false);

    const event = {
      target: {
        name: "date_naissance",
        value: newDate.toLocaleDateString(),
        type: "date",
      },
    };

    handleUserInfoChange(event);
  };

  // Fermer le calendrier si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Nettoyage à la destruction du composant
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  return (
    <div className="relative w-full" ref={calendarRef}>
      <input
        type="text"
        value={date.toLocaleDateString()}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="focus:outline-none focus:border-emerald-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full dark:placeholder-gray-400"
        placeholder="Sélectionner une date"
        readOnly
      />
      {isCalendarOpen && (
        <div className="absolute top-full mt-2 left-0 z-10">
          <Calendar onChange={handleDateChange} value={date} />
        </div>
      )}
    </div>
  );
}

export default CustomDatePicker;
