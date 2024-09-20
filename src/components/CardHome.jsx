import { useState } from 'react';
import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Ajusta la ruta según tu estructura de carpetas

const CardHome = ({ nameCard, managePath }) => {
    const [cantidad, setCantidad] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

   

    async function agregarCantidad(collectionName, documentId, cantidad) {
        try {
            // Obtener la referencia al documento con el nombre específico (e.g. sabanas, toallas)
            const docRef = doc(db, collectionName, documentId);
            
            // Crear un nuevo documento en la subcolección 'movimientos'
            await addDoc(collection(docRef, 'movimientos'), {
                cantidad: cantidad,
                timestamp: serverTimestamp() // Guardar la fecha y hora actuales
            });
            
            console.log("Cantidad y fecha guardadas con éxito en la subcolección");
        } catch (e) {
            console.error("Error al guardar la cantidad: ", e);
        }
    }

    // Función para manejar el click del botón "Agregar"
    const handleAgregar = () => {
        if (cantidad) {
            agregarCantidad('lavanderia', nameCard.toLowerCase(), parseInt(cantidad));
            setCantidad(''); // Limpiar el campo de cantidad
            setIsModalOpen(false); // Cerrar el modal
        } else {
            alert('Por favor, introduce una cantidad.');
        }
    };

    return (
        <div className="bg-white shadow-md shadow-stone-600 w-80 rounded-md text-center py-6 relative">
            <h1>{nameCard}</h1>
            <img src="" alt="imgRopa" />
            <div className="flex justify-center gap-1 dmsans items-center">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                    className="bg-rose-600 hover:bg-rose-700 text-white px-7 py-2 rounded-md shadow-sm shadow-black duration-300"
                    onClick={() => setIsModalOpen(true)}
                >
                    Agregar
                </button>
                <Link to={managePath}>
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button className="bg-stone-600 hover:bg-stone-700 text-white px-7 py-2 rounded-md shadow-sm shadow-black duration-300">
                        Gestionar
                    </button>
                </Link>
            </div>

            {/* Ventana Modal para introducir la cantidad */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Agregar Cantidad para {nameCard}</h2>
                        <input
                            type="number"
                            placeholder="Introduce la cantidad"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            className="border w-full rounded px-2 py-1 mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button
                                className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 duration-300"
                                onClick={handleAgregar}
                            >
                                Guardar
                            </button>
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 duration-300"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardHome;
