import { useState, useEffect } from 'react';
import MultiRangeSlider from './MultiRangeSlider';
function Accordeon() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const [minPrice, setMinPrice] = useState(1000);
    const [maxPrice, setMaxPrice] = useState(7000);
    const min = 100;
    const max = 10000;

    const [minThumb, setMinThumb] = useState(0);
    const [maxThumb, setMaxThumb] = useState(100);

    useEffect(() => {
        setMinThumb(((minPrice - min) / (max - min)) * 100);
    }, [minPrice]);

    useEffect(() => {
        setMaxThumb(100 - ((maxPrice - min) / (max - min)) * 100);
    }, [maxPrice]);

    const handleMinChange = (event) => {
        const value = Math.min(Number(event.target.value), maxPrice - 500);
        setMinPrice(value);
    };

    const handleMaxChange = (event) => {
        const value = Math.max(Number(event.target.value), minPrice + 500);
        setMaxPrice(value);
    };

    const handleMinInput = (event) => {
        let value = Number(event.target.value);
        if (value >= min && value <= maxPrice - 500) {
            setMinPrice(value);
        }
    };

    const handleMaxInput = (event) => {
        let value = Number(event.target.value);
        if (value <= max && value >= minPrice + 500) {
            setMaxPrice(value);
        }
    };

    return (
        <div className=" border-t-4">
            <button
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                className="flex justify-between items-center w-full px-1 py-2 text-left"
            >
                <span className="text-lg font-medium">Menu</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden px-2 ${isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
                    }`}
            >
                    <MultiRangeSlider />
            </div>
        </div>
    );
}

export default Accordeon;
