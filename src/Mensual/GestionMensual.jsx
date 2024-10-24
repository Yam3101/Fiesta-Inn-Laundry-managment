import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import NavbarHome from "../components/NavbarHome";
import { Link } from "react-router-dom";

const GestionMensual = () => {
	const [movimientosPorMes, setMovimientosPorMes] = useState({});
	const [mesSeleccionado, setMesSeleccionado] = useState(null);
	const [tipoSeleccionado, setTipoSeleccionado] = useState("sabanas");
	const [anioSeleccionado, setAnioSeleccionado] = useState(
		new Date().getFullYear(),
	);

	const tipos = [
		"sabanas",
		"toallas",
		"fundas de almohada",
		"tapetes",
		"duvets",
		"toallas de mano",
	];
	const anios = Array.from({ length: 10 }, (_, i) => 2024 + i);

	useEffect(() => {
		const q = query(
			collection(db, "lavanderia", tipoSeleccionado, "movimientos"),
			orderBy("timestamp", "asc"),
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const movimientos = {};
			// biome-ignore lint/complexity/noForEach: <explanation>
			snapshot.forEach((doc) => {
				const data = doc.data();
				const fecha = data.timestamp?.toDate() || new Date();
				const mes = fecha.getMonth();
				const anio = fecha.getFullYear();
				if (anio === anioSeleccionado) {
					if (!movimientos[mes]) {
						movimientos[mes] = [];
					}
					movimientos[mes].push({
						id: doc.id,
						cantidad: data.cantidad,
						timestamp: fecha,
					});
				}
			});
			setMovimientosPorMes(movimientos);
		});

		return () => unsubscribe();
	}, [tipoSeleccionado, anioSeleccionado]);

	const meses = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];

	const colores = [
		"#FF0000",
		"#FF7F00",
		"#FFD700",
		"#008000",
		"#00BFFF",
		"#1E90FF",
		"#8A2BE2",
		"#D2691E",
		"#008000",
		"#0000FF",
		"#FFA500",
		"#FF0000",
	];

	const handleMesClick = (mesIndex) => {
		setMesSeleccionado(mesSeleccionado === mesIndex ? null : mesIndex);
	};

	return (
		<div className="overflow-x-hidden w-screen h-screen bg-gray-70">
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
			<div className="container mx-auto mt-8">
				<h2 className="text-3xl font-semibold mb-4 bg-gray-200 p-4 rounded flex items-center justify-between">
					<span>Gestión Mensual</span>
					<div
						style={{
							width: "15px",
							height: "40px",
							backgroundColor: "#FF0000",
						}}
					/>
				</h2>
				<div className="flex mb-4 space-x-4">
					<select
						value={tipoSeleccionado}
						onChange={(e) => setTipoSeleccionado(e.target.value)}
						className="border p-2 rounded"
					>
						{tipos.map((tipo) => (
							<option key={tipo} value={tipo}>
								{tipo}
							</option>
						))}
					</select>
					<select
						value={anioSeleccionado}
						onChange={(e) => setAnioSeleccionado(Number(e.target.value))}
						className="border p-2 rounded"
					>
						{anios.map((anio) => (
							<option key={anio} value={anio}>
								{anio}
							</option>
						))}
					</select>
				</div>
				<h3 className="text-xl font-semibold mb-4">
					Movimientos del Año {anioSeleccionado}
				</h3>
				{meses.map((mes, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="mb-4">
						<button
							type="button"
							className="flex items-center justify-between w-full p-4 bg-gray-200 hover:bg-gray-300 border-2 rounded-md shadow-md"
							onClick={() => handleMesClick(index)}
							style={{
								borderColor: colores[index],
							}}
						>
							<span className="font-bold text-lg">{mes.toUpperCase()}</span>
							<div
								style={{
									width: "20px",
									height: "40px",
									backgroundColor: colores[index],
								}}
							/>
						</button>
						{mesSeleccionado === index && (
							<div className="mt-2 bg-white shadow-md rounded-md p-4">
								{movimientosPorMes[index] ? (
									<table className="table-auto w-full text-left border-collapse">
										<thead>
											<tr className="bg-gray-200">
												<th className="px-4 py-2 text-center font-semibold">
													Cantidad
												</th>
												<th className="px-4 py-2 text-center font-semibold">
													Fecha y Hora
												</th>
											</tr>
										</thead>
										<tbody>
											{movimientosPorMes[index].map((movimiento) => (
												<tr key={movimiento.id} className="border-b">
													<td className="px-4 py-2 text-center">
														{movimiento.cantidad}
													</td>
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
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<p className="p-4 text-center">
										No hay movimientos en este mes.
									</p>
								)}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default GestionMensual;
