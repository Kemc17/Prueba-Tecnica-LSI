import React from "react";

const LocationList = ({ locations }) => {
  return (
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
  );
};

export default LocationList;
