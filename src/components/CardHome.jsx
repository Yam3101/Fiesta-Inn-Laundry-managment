import { useState, useEffect } from "react";
import {
    doc,
    addDoc,
    collection,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const CardHome = ({ nameCard }) => {
    const [cantidad, setCantidad] = useState(0);
    const [showGestion, setShowGestion] = useState(false);
    const [movimientos, setMovimientos] = useState([]);
    const [total, setTotal] = useState(0);
    const [editando, setEditando] = useState(null);
    const [cantidadEditada, setCantidadEditada] = useState(0);
    const [comentario, setComentario] = useState("");
    const [comentarioEditado, setComentarioEditado] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [addComment, setAddComment] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showWarningModal, setShowWarningModal] = useState(false); // Nuevo estado para el modal de advertencia

    useEffect(() => {
        if (showGestion) {
            const q = query(
                collection(db, "lavanderia", nameCard.toLowerCase(), "movimientos"),
                orderBy("timestamp", "asc")
            );
    
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const movs = [];
                let sumaTotal = 0;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const cantidad = parseInt(data.cantidad) || 0; // Asegúrate de que cantidad sea un número
                    movs.push({
                        id: doc.id,
                        cantidad: cantidad,
                        comentario: data.comentario || "",
                        timestamp: data.timestamp?.toDate() || new Date(),
                    });
                    sumaTotal += cantidad;
                });
                setMovimientos(movs);
                setTotal(sumaTotal);
            });
    
            return () => unsubscribe();
        }
    }, [showGestion, nameCard]);    

    async function agregarCantidad(collectionName, documentId, cantidad, comentario) {
        try {
            const docRef = collection(db, collectionName, documentId, "movimientos");
            await addDoc(docRef, {
                cantidad: cantidad,
                comentario: comentario || "",
                timestamp: serverTimestamp(),
            });

            if (comentario) {
                const reportRef = collection(db, "reportes");
                await addDoc(reportRef, {
                    tipo: nameCard,
                    cantidad: cantidad,
                    comentario: comentario,
                    timestamp: serverTimestamp(),
                });
            }
        } catch (e) {
            console.error("Error al guardar la cantidad: ", e);
        }
    }

    const handleAgregar = () => {
        if (cantidad > 0) {
            agregarCantidad("lavanderia", nameCard.toLowerCase(), cantidad, addComment ? comentario : "");
            setCantidad(0);
            setComentario("");
            setAddComment(false);
        } else {
            setShowWarningModal(true); 
        }
    };

    const incrementar = () => setCantidad((prevCantidad) => prevCantidad + 1);
    const decrementar = () => setCantidad((prevCantidad) => (prevCantidad > 0 ? prevCantidad - 1 : 0));
    const toggleGestion = () => setShowGestion(!showGestion);

    const handleEditar = (id, cantidad, comentario) => {
        setEditando(id);
        setCantidadEditada(cantidad);
        setComentarioEditado(comentario);
        setShowModal(true);
    };

    const guardarEdicion = async (id) => {
        const docRef = doc(db, "lavanderia", nameCard.toLowerCase(), "movimientos", id);
        await updateDoc(docRef, {
            cantidad: parseInt(cantidadEditada) || 0, 
            comentario: comentarioEditado,
        });
        setEditando(null);
        setShowModal(false);
    };
    

    const cancelarEdicion = () => {
        setEditando(null);
        setShowModal(false);
    };

    const handleEliminar = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmarEliminacion = async () => {
        const docRef = doc(db, "lavanderia", nameCard.toLowerCase(), "movimientos", deleteId);
        await deleteDoc(docRef);
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    const cancelarEliminacion = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    // Función para cerrar el modal de advertencia
    const cerrarModalAdvertencia = () => {
        setShowWarningModal(false);
    };

    return (
        <div className="flex flex-wrap">
            <div className={`bg-white shadow-md shadow-stone-600 w-80 rounded-md text-center py-6 relative mb-6 ${showGestion ? 'mr-2' : ''}`}>
                <h1 className="timesroman text-2xl italic font-semibold">{nameCard}</h1>
                <img className="py-3" src="" alt="imgRopa" />
                <div className="flex flex-col items-center gap-4 dmsans">
                    <div className="flex items-center gap-4">
                        <button
                            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md shadow-sm shadow-black duration-300"
                            onClick={incrementar}
                        >
                            +
                        </button>
                        <span className="text-xl">{cantidad}</span>
                        <button
                            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md shadow-sm shadow-black duration-300"
                            onClick={decrementar}
                        >
                            -
                        </button>
                    </div>
                    <label className="dmsans font-semibold flex items-center">
                        <input
                            type="checkbox"
                            checked={addComment}
                            onChange={() => setAddComment(!addComment)}
                            className="mr-2"
                        />
                        Agregar comentario
                    </label>
                    {addComment && (
                        <textarea
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Escribe un comentario..."
                            className="w-full px-2 py-1 border border-gray-300 rounded-md mt-2"
                            rows="2"
                        />
                    )}
                    <button
                        className="bg-stone-600 hover:bg-stone-700 text-white px-7 py-2 rounded-md shadow-sm shadow-black duration-300"
                        onClick={handleAgregar}
                    >
                        Guardar
                    </button>
                    <button
                        className="bg-stone-600 hover:bg-stone-700 text-white px-7 py-2 rounded-md shadow-sm shadow-black duration-300"
                        onClick={toggleGestion}
                    >
                        Gestionar
                    </button>
                </div>
            </div>

            {showGestion && (
                <div className="bg-white shadow-md shadow-stone-500 w-150 rounded-md py-6 ml-1 px-8 pt-3">
                    <h2 className="text-xl font-semibold mb-4">Movimientos de {nameCard}</h2>
                    <table className="table-auto w-full text-left border-collapse bg-white shadow-md shadow-stone-500 rounded-md">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-center dmsans font-semibold">Cantidad</th>
                                <th className="px-4 py-2 text-center dmsans font-semibold">Comentario</th>
                                <th className="px-4 py-2 text-center dmsans font-semibold">Fecha y Hora</th>
                                <th className="px-4 py-2 text-center dmsans font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimientos.map((movimiento) => (
                                <tr key={movimiento.id} className="border-b">
                                    <td className="px-4 py-2 text-center">{movimiento.cantidad}</td>
                                    <td className="px-4 py-2 text-center">{movimiento.comentario}</td>
                                    <td className="px-4 py-2 text-center">
                                        {movimiento.timestamp.toLocaleString("es-ES", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {editando === movimiento.id ? (
                                            <>
                                                <button
                                                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-md shadow-sm shadow-black duration-300 mr-2"
                                                    onClick={() => guardarEdicion(movimiento.id)}
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md shadow-sm shadow-black duration-300"
                                                    onClick={cancelarEdicion}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md shadow-sm shadow-black duration-300 mr-2"
                                                    onClick={() => handleEditar(movimiento.id, movimiento.cantidad, movimiento.comentario)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md shadow-sm shadow-black duration-300"
                                                    onClick={() => handleEliminar(movimiento.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 className="font-semibold mt-4">Total: {total}</h3>
                </div>
            )}

            {/* Modal de advertencia */}
            {showWarningModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-lg font-semibold">Advertencia</h2>
                        <p className="mt-2">La cantidad debe ser mayor a 0.</p>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-4"
                            onClick={cerrarModalAdvertencia}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para confirmar eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-lg font-semibold">Confirmar eliminación</h2>
                        <p className="mt-2">¿Estás seguro de que deseas eliminar este movimiento?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mr-2"
                                onClick={confirmarEliminacion}
                            >
                                Eliminar
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                                onClick={cancelarEliminacion}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para editar */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-lg font-semibold">Editar Movimiento</h2>
                        <input
                            type="number"
                            value={cantidadEditada}
                            onChange={(e) => setCantidadEditada(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md mt-2"
                        />
                        <textarea
                            value={comentarioEditado}
                            onChange={(e) => setComentarioEditado(e.target.value)}
                            placeholder="Escribe un comentario..."
                            className="w-full px-2 py-1 border border-gray-300 rounded-md mt-2"
                            rows="2"
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mr-2"
                                onClick={() => guardarEdicion(editando)}
                            >
                                Guardar
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                                onClick={cancelarEdicion}
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
