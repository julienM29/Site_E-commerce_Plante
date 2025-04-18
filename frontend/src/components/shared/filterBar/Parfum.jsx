function Parfum({ setFilters, filters }) {
    const handleChange = () => {
        setFilters((prevState) => ({
            ...prevState,
            parfum: !prevState.parfum, // Inverse directement la valeur
        }));
    };

    return (
        <div className="border-t-4 px-1 py-5">
            <div className="flex items-center w-full">
                <span className="flex-grow text-left text-lg font-medium">
                    Plante parfumée
                </span>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer focus:outline-none focus:ring-0"
                        checked={filters.parfum || false} // Utilisation directe de filters
                        onChange={handleChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-0 peer-focus:outline-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
            </div>
        </div>
    );
}

export default Parfum;
