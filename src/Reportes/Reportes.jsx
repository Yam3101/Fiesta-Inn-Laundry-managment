import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import NavbarHome from "../components/NavbarHome";
import { Link } from "react-router-dom";

const Reportes = () => {
	const [movimientosConComentarios, setMovimientosConComentarios] = useState(
		[],
	);

	useEffect(() => {
		const subcolecciones = [
			"sabanas",
			"toallas",
			"fundas de almohada",
			"duvets",
			"tapetes",
			"toallas de mano",
			"otros",
		];
		const unsubscribeArr = subcolecciones.map((tipo) => {
			const q = query(
				collection(db, "lavanderia", tipo, "movimientos"),
				where("comentario", "!=", ""), // Asegúrate de que "comentario" es el campo correcto
			);

			return onSnapshot(q, (snapshot) => {
				const movimientos = snapshot.docs.map((doc) => ({
					id: doc.id,
					tipo: tipo, // Agregamos el tipo al documento
					...doc.data(),
				}));

				setMovimientosConComentarios((prevMovimientos) => [
					...prevMovimientos,
					...movimientos,
				]);
			});
		});

		// biome-ignore lint/complexity/noForEach: <explanation>
		return () => unsubscribeArr.forEach((unsubscribe) => unsubscribe());
	}, []);

	return (
		<div className="container mx-auto mt-8">
			<div className="absolute top-4 left-4">
				<Link
					to="/"
					className="bg-rose-600 text-white px-4 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-300"
				>
					Volver al Inicio
				</Link>
			</div>
			<div className="flex justify-end">
				<NavbarHome />
			</div>
			<h2 className="text-3xl font-semibold mb-4">Reportes</h2>
			{movimientosConComentarios.length > 0 ? (
				<table className="table-auto w-full text-left border-collapse">
					<thead>
						<tr className="bg-gray-200">
							<th className="px-4 py-2 text-center font-semibold">Tipo</th>
							<th className="px-4 py-2 text-center font-semibold">Cantidad</th>
							<th className="px-4 py-2 text-center font-semibold">
								Fecha y Hora
							</th>
							<th className="px-4 py-2 text-center font-semibold">
								Comentario
							</th>
						</tr>
					</thead>
					<tbody>
						{movimientosConComentarios.map((movimiento) => (
							<tr key={movimiento.id} className="border-b">
								<td className="px-4 py-2 text-center">{movimiento.tipo}</td>
								<td className="px-4 py-2 text-center">{movimiento.cantidad}</td>
								<td className="px-4 py-2 text-center">
									{new Date(movimiento.timestamp.seconds * 1000).toLocaleString(
										"es-ES",
										{
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
											hour: "2-digit",
											minute: "2-digit",
											second: "2-digit",
										},
									)}
								</td>
								<td className="px-4 py-2 text-center">
									{movimiento.comentario}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="p-4 text-center">No hay movimientos con comentarios.</p>
			)}
		</div>
	);
};

export default Reportes;
