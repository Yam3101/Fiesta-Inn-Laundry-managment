import { useState, useEffect } from "react";
import { doc, addDoc, collection, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

<<<<<<< HEAD
const CardHome = ({ nameCard }) => {
    const [cantidad, setCantidad] = useState(0);
    const [showGestion, setShowGestion] = useState(false);
    const [movimientos, setMovimientos] = useState([]);
    const [total, setTotal] = useState(0);
=======
const CardHome = ({ nameCard, managePath, imgCont }) => {
	const [cantidad, setCantidad] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
>>>>>>> 12b9cb5b6298aa7e08fe3ba9aa88c41bcd9c6112

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
                    movs.push({
                        id: doc.id,
                        cantidad: data.cantidad,
                        timestamp: data.timestamp?.toDate() || new Date(),
                    });
                    sumaTotal += data.cantidad;
                });
                setMovimientos(movs);
                setTotal(sumaTotal);
            });

            return () => unsubscribe();
        }
    }, [showGestion, nameCard]);

    async function agregarCantidad(collectionName, documentId, cantidad) {
        try {
            const docRef = doc(db, collectionName, documentId);

<<<<<<< HEAD
            await addDoc(collection(docRef, "movimientos"), {
                cantidad: cantidad,
                timestamp: serverTimestamp(),
            });
=======
	return (
		<div className="bg-white shadow-md shadow-stone-600 w-80 rounded-md text-center py-6 relative justify-center items-center flex flex-col">
			<h1 className="timesroman text-2xl italic font-semibold">{nameCard}</h1>
			<img className="p1-3" width={120} src={imgCont} alt="imgRopa" />
			<div className="flex justify-center gap-1 dmsans items-center">
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-2 rounded-md shadow-sm shadow-black duration-300"
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
>>>>>>> 12b9cb5b6298aa7e08fe3ba9aa88c41bcd9c6112

            console.log("Cantidad y fecha guardadas con éxito en la subcolección");
        } catch (e) {
            console.error("Error al guardar la cantidad: ", e);
        }
    }

    const handleAgregar = () => {
        if (cantidad > 0) {
            agregarCantidad("lavanderia", nameCard.toLowerCase(), cantidad);
            setCantidad(0); 
        } else {
            alert("La cantidad debe ser mayor a 0.");
        }
    };

    const incrementar = () => {
        setCantidad((prevCantidad) => prevCantidad + 1);
    };

    const decrementar = () => {
        setCantidad((prevCantidad) => (prevCantidad > 0 ? prevCantidad - 1 : 0));
    };

    const toggleGestion = () => {
        setShowGestion(!showGestion);
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
                                <th className="px-4 py-2 text-center dmsans font-semibold">Fecha y Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimientos.map((movimiento) => (
                                <tr key={movimiento.id} className="border-b">
                                    <td className="sm:px-4 px-1 py-2 sm:text-left text-center">
                                        {movimiento.cantidad}
                                    </td>
                                    <td className="px-4 py-2 justify-center items-center flex">
                                        {movimiento.timestamp.toLocaleString("es-ES", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </td>
                                </tr>
                            ))}
                            <tr className="font-bold">
                                <td className="px-4 py-2">Total</td>
                                <td className="px-4 py-2">{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CardHome;
