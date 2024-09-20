import { useState, useEffect } from "react";
import {
	collection,
	query,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
	orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import NavbarHome from "../components/NavbarHome";
import { Link } from "react-router-dom";

const Toallas = () => {
	const [movimientos, setMovimientos] = useState([]);
	const [total, setTotal] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
	const [currentMovimiento, setCurrentMovimiento] = useState(null);
	const [newCantidad, setNewCantidad] = useState("");
	const [movimientoToDelete, setMovimientoToDelete] = useState(null);

	useEffect(() => {
		const q = query(
			collection(db, "lavanderia", "toallas", "movimientos"),
			orderBy("timestamp", "asc"),
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const movs = [];
			let sumaTotal = 0;
			// biome-ignore lint/complexity/noForEach: <explanation>
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
	}, []);

	const handleEditar = (movimiento) => {
		setCurrentMovimiento(movimiento);
		setNewCantidad(movimiento.cantidad);
		setModalOpen(true);
	};

	const handleGuardarEdicion = async () => {
		if (currentMovimiento && newCantidad !== "") {
			const movimientoRef = doc(
				db,
				"lavanderia",
				"toallas",
				"movimientos",
				currentMovimiento.id,
			);
			await updateDoc(movimientoRef, {
				cantidad: Number.parseInt(newCantidad),
			});
			setModalOpen(false);
		}
	};

	const handleBorrar = (movimiento) => {
		setMovimientoToDelete(movimiento);
		setConfirmDeleteOpen(true);
	};

	const confirmarBorrar = async () => {
		if (movimientoToDelete) {
			const movimientoRef = doc(
				db,
				"lavanderia",
				"toallas",
				"movimientos",
				movimientoToDelete.id,
			);
			await deleteDoc(movimientoRef);
			setConfirmDeleteOpen(false);
		}
	};

	return (
		<div className="overflow-x-hidden w-screen h-screen">
			<div className="flex justify-end">
				<NavbarHome />
			</div>
			<div className="absolute top-4 left-4">
				<Link
					to="/"
					className="bg-rose-600 text-white px-4 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-300"
				>
					Volver al Inicio
				</Link>
			</div>
			<div className="flex justify-center items-center h-full">
				<div className="w-3/4">
					<h2 className="text-2xl font-semibold mb-4">
						Movimientos de Toallas
					</h2>
					<table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-md">
						<thead>
							<tr className="bg-gray-200">
								<th className="px-4 py-2">Cantidad</th>
								<th className="px-4 py-2">Fecha y Hora</th>
								<th className="px-4 py-2 text-center">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{movimientos.map((movimiento) => (
								<tr key={movimiento.id} className="border-b">
									<td className="px-4 py-2">{movimiento.cantidad}</td>
									<td className="px-4 py-2">
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
										{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
										<button
											className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600"
											onClick={() => handleEditar(movimiento)}
										>
											Editar
										</button>
										{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
										<button
											className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
											onClick={() => handleBorrar(movimiento)}
										>
											Borrar
										</button>
									</td>
								</tr>
							))}
							<tr className="font-bold">
								<td className="px-4 py-2">Total</td>
								{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
								<td className="px-4 py-2"></td>
								<td className="px-4 py-2">{total}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{modalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
						<h2 className="text-lg font-bold mb-4">Editar Cantidad</h2>
						<input
							type="number"
							value={newCantidad}
							onChange={(e) => setNewCantidad(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md mb-4"
						/>
						<div className="flex justify-end">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
								onClick={handleGuardarEdicion}
							>
								Guardar
							</button>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
								onClick={() => setModalOpen(false)}
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}

			{confirmDeleteOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
						<h2 className="text-lg font-bold mb-4">Confirmar Borrado</h2>
						<p>¿Estás seguro de que deseas eliminar este movimiento?</p>
						<div className="flex justify-end mt-4">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
								onClick={confirmarBorrar}
							>
								Borrar
							</button>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
								onClick={() => setConfirmDeleteOpen(false)}
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

export default Toallas;
