import { useState } from "react";
import NavbarHome from "./components/NavbarHome";
import CardHome from "./components/CardHome";
import { Link } from "react-router-dom";
import { db } from "./firebaseConfig";
import { addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore";

function Home() {

    const [cardSeleccionado, setCardSeleccionado] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nombreOtros, setNombreOtros] = useState("");
    const [cantidadOtros, setCantidadOtros] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [datosGuardados, setDatosGuardados] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(false);

    // Función para manejar el guardado de "Otros"
    const handleGuardarOtros = async () => {
        if (nombreOtros && cantidadOtros > 0) {
            try {
                await addDoc(collection(db, "lavanderia", "otros", "movimientos"), {
                    nombre: nombreOtros,
                    cantidad: cantidadOtros,
                    timestamp: serverTimestamp(),
                });
                setNombreOtros("");
                setCantidadOtros(0);
                setMostrarFormulario(false);
                setMostrarModal(true); // Mostrar el modal de confirmación
            } catch (error) {
                console.error("Error al guardar en la base de datos:", error);
            }
        } else {
            alert("Por favor, ingrese un nombre y una cantidad mayor a 0.");
        }
    };

    // Función para obtener y mostrar los datos guardados en la tabla
    const handleGestionarOtros = async () => {
        const snapshot = await getDocs(collection(db, "lavanderia", "otros", "movimientos"));
        const datos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDatosGuardados(datos);
        setMostrarTabla(true);
    };

    return (
        <div className="overflow-x-hidden w-screen h-screen sm:pb-5 pb-14 flex flex-col items-center">
            <div className="w-full flex justify-end">
                <NavbarHome />
            </div>
            <div className="w-full flex flex-col items-center">
                <h1 className="roboto font-semibold text-center text-3xl pt-5 teachers py-10">
                    Desarrollo de aplicación web de gestionamiento de lavandería y limpieza
                </h1>
            </div>
            <div className="flex gap-3 mt-5">
                <Link to="/Perfil">
                    <button className="bg-rose-600 hover:bg-rose-700 text-white twcenmt text-xl px-6 py-2 rounded-md shadow-sm hover:shadow-md shadow-stone-900 hover:shadow-black duration-300">
                        Perfil
                    </button>
                </Link>
                <Link to="/Reporte">
                    <button className="bg-rose-600 hover:bg-rose-700 text-white twcenmt text-xl px-6 py-2 rounded-md shadow-sm hover:shadow-md shadow-stone-900 hover:shadow-black duration-300">
                        Reportes
                    </button>
                </Link>
                <Link to="/Mes">
                    <button className="bg-rose-600 hover:bg-rose-700 text-white twcenmt text-xl px-6 py-2 rounded-md shadow-sm hover:shadow-md shadow-stone-900 hover:shadow-black duration-300">
                        Gestión Mensual
                    </button>
                </Link>
            </div>
            <div className="flex flex-col items-center mt-10">
                <div className="flex flex-wrap gap-3 px-8">
                    <CardHome nameCard="Sabanas" setCardSeleccionado={setCardSeleccionado} />
                    <CardHome nameCard="Toallas" setCardSeleccionado={setCardSeleccionado} />
                    <CardHome nameCard="Toallas de mano" setCardSeleccionado={setCardSeleccionado} />
                    <CardHome nameCard="Tapetes" setCardSeleccionado={setCardSeleccionado} />
                    <CardHome nameCard="Duvets" setCardSeleccionado={setCardSeleccionado} />
                    <CardHome nameCard="Fundas de almohada" setCardSeleccionado={setCardSeleccionado} />

                    {/* Contenedor para el Card "Otros" y la tabla */}
                    <div className="flex gap-6">
                        {/* Card para "Otros" */}
                        <div className="bg-white shadow-md shadow-stone-600 w-80 rounded-md text-center py-6 relative mb-6">
                            <h1 className="timesroman text-2xl italic font-semibold">Otros</h1>
                            <button
                                className="bg-stone-600 hover:bg-stone-700 text-white px-7 py-2 rounded-md shadow-sm shadow-black duration-300 mt-4"
                                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                            >
                                Agregar Datos
                            </button>
                            {mostrarFormulario && (
                                <div className="mt-4 p-4 border rounded-md bg-gray-100">
                                    <div className="mb-3">
                                        <label className="block text-left font-semibold">Nombre:</label>
                                        <input
                                            type="text"
                                            value={nombreOtros}
                                            onChange={(e) => setNombreOtros(e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-left font-semibold">Cantidad:</label>
                                        <div className="flex items-center gap-3">
                                        <button
                                                onClick={() => setCantidadOtros((prev) => prev + 1)}
                                                className="px-3 py-1 bg-gray-300 rounded"
                                            >
                                                +
                                            </button>
                                            <span>{cantidadOtros}</span>
                                            <button
                                                onClick={() => setCantidadOtros((prev) => Math.max(0, prev - 1))}
                                                className="px-3 py-1 bg-gray-300 rounded"
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-center mt-4">
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                                            onClick={handleGuardarOtros}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
                                            onClick={() => setMostrarFormulario(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2 rounded-md shadow-sm shadow-black duration-300 mt-4"
                                onClick={handleGestionarOtros}
                            >
                                Gestionar
                            </button>
                        </div>

                        {/* Tabla de datos guardados al lado del card */}
                        {mostrarTabla && (
                            <div className="p-4 bg-white rounded-md shadow-md overflow-auto w-80 h-fit">
                                <h2 className="text-lg font-semibold mb-4">Datos de "Otros"</h2>
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border p-2">Nombre</th>
                                            <th className="border p-2">Cantidad</th>
                                            <th className="border p-2">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datosGuardados.map((dato) => (
                                            <tr key={dato.id}>
                                                <td className="border p-2">{dato.nombre}</td>
                                                <td className="border p-2">{dato.cantidad}</td>
                                                <td className="border p-2">
                                                    {dato.timestamp?.toDate().toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal de confirmación de guardado */}
                {mostrarModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-5 rounded-md shadow-md text-center">
                            <p className="mb-4">Datos guardados correctamente.</p>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                                onClick={() => setMostrarModal(false)}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Home;
