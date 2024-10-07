import { useState } from "react";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";

const CardHome = ({ nameCard, managePath, imgCont }) => {
	const [cantidad, setCantidad] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	async function agregarCantidad(collectionName, documentId, cantidad) {
		try {
			const docRef = doc(db, collectionName, documentId);

			await addDoc(collection(docRef, "movimientos"), {
				cantidad: cantidad,
				timestamp: serverTimestamp(),
			});

			console.log("Cantidad y fecha guardadas con éxito en la subcolección");
		} catch (e) {
			console.error("Error al guardar la cantidad: ", e);
		}
	}

	const handleAgregar = () => {
		if (cantidad) {
			agregarCantidad(
				"lavanderia",
				nameCard.toLowerCase(),
				Number.parseInt(cantidad),
			);
			setCantidad("");
			setIsModalOpen(false);
		} else {
			alert("Por favor, introduce una cantidad.");
		}
	};

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

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-5 rounded-md shadow-md w-80">
						<h2 className="text-xl font-semibold mb-4">
							Agregar Cantidad para {nameCard}
						</h2>
						<input
							type="number"
							placeholder="Introduce la cantidad"
							value={cantidad}
							onChange={(e) => setCantidad(e.target.value)}
							className="border w-full rounded px-2 py-1 mb-4"
						/>
						<div className="flex justify-center gap-2">
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
