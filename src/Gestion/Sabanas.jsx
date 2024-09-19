import { Link } from 'react-router-dom'; // Importa Link para la navegación
import NavbarHome from "../components/NavbarHome";
import React from 'react';

const Sabanas = () => {
    return (
        <div className="overflow-x-hidden w-screen h-screen">
            <div className="flex justify-end">
                <NavbarHome />
            </div>
            <div className="absolute top-4 left-4"> {/* Ajuste del botón en la parte superior izquierda */}
                <Link to="/" className="bg-rose-600 text-white px-4 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-300">
                    Volver al Home
                </Link>
            </div>
            <div className="flex justify-center items-center h-full">
                {/* Contenido principal de la página */}
            </div>
        </div>
    );
}

export default Sabanas;
