import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    name: "",
    lat: null,
    lng: null,
    address: "",
  });

  const [locations, setLocations] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const mapRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const initialCenter = {
    lat: 13.6929, 
    lng: -89.2182,
  };

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    
    setSelectedLocation((prev) => ({
      ...prev,
      lat,
      lng,
      address: "Buscando dirección...",
    }));
    setShowInfoWindow(false);

    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      const address = data.results[0]?.formatted_address || "Dirección no encontrada.";
      setSelectedLocation((prev) => ({ ...prev, address }));
      setShowInfoWindow(true);
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      setSelectedLocation((prev) => ({ ...prev, address: "Error al obtener dirección." }));
      setShowInfoWindow(true);
    }
  };

  const saveLocation = () => {
    if (selectedLocation.name && selectedLocation.lat && selectedLocation.lng) {
      setLocations([...locations, selectedLocation]); 
      setSelectedLocation({ name: "", lat: null, lng: null, address: "" });
      setShowInfoWindow(false);
    }
  };

  const onLoadMap = (map) => {
    mapRef.current = map;
    map.panTo(initialCenter);
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-10 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="col-span-1 lg:col-span-2 bg-gray-300 rounded-lg overflow-hidden relative h-96">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              onLoad={onLoadMap}
              onClick={handleMapClick}
            >
              {selectedLocation.lat && selectedLocation.lng && (
                <>
                  <Marker
                    position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                    onClick={() => setShowInfoWindow(true)}
                  />
                  {showInfoWindow && (
                    <InfoWindow
                      position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                      onCloseClick={() => {
                        setShowInfoWindow(false);
                        setSelectedLocation({ name: "", lat: null, lng: null, address: "" });
                      }}
                      options={{
                        disableAutoPan: true,
                      }}
                    >
                      <div>
                        <h3 className="font-bold text-lg">Información</h3>
                        <p><strong>Latitud:</strong> {selectedLocation.lat}</p>
                        <p><strong>Longitud:</strong> {selectedLocation.lng}</p>
                        <p><strong>Dirección:</strong> {selectedLocation.address}</p>
                      </div>
                    </InfoWindow>
                  )}
                </>
              )}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Formulario */}
        <div className="bg-white flex flex-col w-full p-6 rounded shadow-md">
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
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-6 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            className="text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded text-lg duration-500 ease-in-out"
            onClick={saveLocation}
          >
            Guardar
          </button>
        </div>
      </div>

      
      <div className="container mx-auto px-5 py-6">
        <h2 className="text-xl font-bold mb-4">Localizaciones guardadas</h2>
        {locations.length === 0 ? (
          <div className="border-dashed border-2 border-gray-300 p-6 rounded text-center">
            <p className="text-gray-500">No hay localizaciones guardadas.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {locations.map((loc, index) => (
              <li key={index} className="border p-4 rounded shadow-md">
                <p><strong>Nombre:</strong> {loc.name}</p>
                <p><strong>Dirección:</strong> {loc.address}</p>
                <p><strong>Latitud:</strong> {loc.lat}</p>
                <p><strong>Longitud:</strong> {loc.lng}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default App;
