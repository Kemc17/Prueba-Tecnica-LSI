import React from "react";

const LocationList = ({
  locations,
  startEditing,
  saveEditing,
  editingIndex,
  editingName,
  setEditingName,
  editingNameError,
}) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 mt-6">Localizaciones guardadas</h2>
      <div className="overflow-y-auto flex-1 max-h-[600px]">
        {locations.length === 0 ? (
          <div className="border-dashed border-2 border-gray-300 p-6 rounded text-center">
            <p className="text-gray-500">No hay localizaciones guardadas.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {locations.map((loc, index) => (
              <li key={index} className="border p-4 rounded shadow-md">
                {editingIndex === index ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <input
                        className="border border-gray-300 rounded p-1 flex-grow"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={saveEditing}
                      >
                        Guardar
                      </button>
                    </div>
                    {editingNameError && (
                      <p className="text-red-500 text-sm mt-1">
                        El nombre no puede estar vacío.
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <p><strong>Nombre:</strong> {loc.name}</p>
                    <p><strong>Dirección:</strong> {loc.address}</p>
                    <p>
                      <strong>Latitud:</strong> {loc.lat}, <strong>Longitud:</strong> {loc.lng}
                    </p>
                    <button
                      className="text-blue-500 underline mt-2"
                      onClick={() => startEditing(index, loc.name)}
                    >
                      Editar nombre
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LocationList;
