import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const App = () => {
  
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 40.7128, 
    lng: -74.006,
  };

  
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-10 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mapa interactivo */}
        <div className="col-span-1 lg:col-span-2 bg-gray-300 rounded-lg overflow-hidden relative h-96">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
            >
              
            </GoogleMap>
          </LoadScript>
        </div>

        
        <div className="bg-white flex flex-col w-full p-6 rounded shadow-md">
          <h2 className="text-gray-900 text-lg mb-2 font-medium title-font">
            Agregar localización
          </h2>
          <p className="leading-relaxed mb-4 text-gray-600">
            Agrega un nuevo edificio o localización.
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-6 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded text-lg duration-500 ease-in-out">
            Guardar
          </button>
        </div>
      </div>

      
      <div className="container mx-auto px-5 py-6">
        <h2 className="text-xl font-bold mb-4">Localizaciones</h2>
        <ul className="space-y-4">
          <li className="border p-4 rounded shadow-md">
            <p>Nombre: </p>
            <p>Dirección: </p>
            <p>Latitud: </p>
            <p>Longitud: </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default App;