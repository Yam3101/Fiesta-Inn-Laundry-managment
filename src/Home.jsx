import { useState } from "react";
import NavbarHome from "./components/NavbarHome";
import CardHome from "./components/CardHome";
import { Link } from "react-router-dom";

function Home() {
	const [cardSeleccionado, setCardSeleccionado] = useState(null);

	return (
		<div className="overflow-x-hidden w-screen h-screen sm:pb-5 pb-14 flex flex-col items-center">
			<div className="w-full flex justify-end">
				<NavbarHome />
			</div>
			<div className="w-full flex flex-col items-center">
				<h1 className="roboto font-semibold text-center text-3xl pt-5 teachers py-10">
					Desarrollo de aplicación web de gestionamiento de lavandería y
					limpieza
				</h1>
			</div>
			<div className="flex gap-3 mt-5">
				<Link to="/Perfil">
					<button
						type="button"
						className="bg-rose-600 hover:bg-rose-700 text-white twcenmt text-xl px-6 py-2 rounded-md shadow-sm hover:shadow-md shadow-stone-900 hover:shadow-black duration-300"
					>
						Perfil
					</button>
				</Link>
				<Link to="/Reporte">
					<button
						type="button"
						className="bg-rose-600 hover:bg-rose-700 text-white twcenmt text-xl px-6 py-2 rounded-md shadow-sm hover:shadow-md shadow-stone-900 hover:shadow-black duration-300"
					>
						Reportes
					</button>
				</Link>
				<Link to="/Mes">
					<button
						type="button"
						className="bg-rose-600 hover:bg-rose-700 text-white twcenmt text-xl px-6 py-2 rounded-md shadow-sm hover:shadow-md shadow-stone-900 hover:shadow-black duration-300"
					>
						Gestión Mensual
					</button>
				</Link>
			</div>
			<div className="flex flex-wrap justify-center items-center mt-10 gap-x-4">
				<CardHome
					nameCard="Sabanas"
					setCardSeleccionado={setCardSeleccionado}
				/>
				<CardHome
					nameCard="Toallas"
					setCardSeleccionado={setCardSeleccionado}
				/>
				<CardHome
					nameCard="Toallas de mano"
					setCardSeleccionado={setCardSeleccionado}
				/>
				<CardHome
					nameCard="Tapetes"
					setCardSeleccionado={setCardSeleccionado}
				/>
				<CardHome nameCard="Duvets" setCardSeleccionado={setCardSeleccionado} />
				<CardHome
					nameCard="Fundas de almohada"
					setCardSeleccionado={setCardSeleccionado}
				/>
				{cardSeleccionado && (
					<div className="w-full flex justify-center mt-5 px-10">
						<div className="overflow-auto">
							<cardSeleccionado.tablaComponent />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
