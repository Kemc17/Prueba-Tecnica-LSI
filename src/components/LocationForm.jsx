import React from "react";

const LocationForm = ({ selectedLocation, setSelectedLocation, saveLocation }) => {
  return (
    <div className="w-full p-6 bg-white rounded-md"> 
      <h2 className="text-gray-900 text-lg mb-2 font-medium title-font">
        Agregar localización
      </h2>
      <p className="leading-relaxed mb-4 text-gray-600">
        Llena la información para guardar la ubicación seleccionada.
      </p>
      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">
          Nombre del edificio o lugar
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={selectedLocation.name}
          onChange={(e) =>
            setSelectedLocation((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full bg-white border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 rounded-md leading-6 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button
        className="text-white w-full bg-indigo-400 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-500 rounded-md text-lg duration-500 ease-in-out"
        onClick={saveLocation}
      >
        Guardar
      </button>
    </div>
  );
};

export default LocationForm;