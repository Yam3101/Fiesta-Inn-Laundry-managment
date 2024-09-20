import { Link } from "react-router-dom";
import NavbarHome from "./components/NavbarHome";
import CardHome from "./components/CardHome";

function Home() {
	return (
		<div className="overflow-x-hidden w-screen h-screen sm:pb-5 pb-14">
			<div className="flex justify-end">
				<NavbarHome />
			</div>
			<div className="sm:grid sm:grid-cols-3 items-center">
				<div className="justify-center text-center">
					<Link to="/">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="bg-rose-600 text-white twcenmt text-xl px-9 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-300">
							Gestión Mensual
						</button>
					</Link>
				</div>
				<h1 className="roboto font-semibold text-center text-3xl pt-5 sm:pt-0 teachers">
					GESTIÓN DE LAVANDERIA
				</h1>
			</div>
			<div className="flex flex-wrap justify-center gap-3 px-8 pt-7">
				<CardHome nameCard="Sabanas" managePath="Gestion/Sabanas" />
				<CardHome nameCard="Toallas" managePath="Gestion/Toallas" />
				<CardHome
					nameCard="Toallas de mano"
					managePath="Gestion/Toallasdemano"
				/>
				<CardHome nameCard="Tapetes" managePath="Gestion/Tapetes" />
				<CardHome nameCard="Duvets" managePath="Gestion/Duvets" />
				<CardHome nameCard="Fundas de almohada" managePath="Gestion/Fundas" />
			</div>
		</div>
	);
}

export default Home;
