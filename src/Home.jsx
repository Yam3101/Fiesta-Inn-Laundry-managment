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
					<Link to="/Perfil">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="bg-rose-600 hover:bg-rose-700 text-white twcenmt text-xl px-9 py-2 rounded-md shadow-sm hover:shadow-md shadow-stone-900 hover:shadow-black duration-300">
							Perfil
						</button>
					</Link>
				</div>
				<h1 className="roboto font-bold text-center text-3xl pt-5 sm:pt-0 teachers">
					GESTIÓN DE LAVANDERIA
				</h1>
			</div>
			<div className="flex flex-wrap justify-center gap-3 px-8 pt-7">
				<CardHome
					imgCont="./sabanasImg.svg"
					nameCard="Sabanas"
					managePath="Gestion/Sabanas"
				/>
				<CardHome
					imgCont="./toallasImg.svg"
					nameCard="Toallas"
					managePath="Gestion/Toallas"
				/>
				<CardHome
					imgCont="./tManoImg.svg"
					nameCard="Toallas de mano"
					managePath="Gestion/Toallasdemano"
				/>
				<CardHome
					imgCont="./tapetesImg.svg"
					nameCard="Tapetes"
					managePath="Gestion/Tapetes"
				/>
				<CardHome
					imgCont="./duvetsImg.svg"
					nameCard="Duvets"
					managePath="Gestion/Duvets"
				/>
				<CardHome
					imgCont="./fundasImg.svg"
					nameCard="Fundas de almohada"
					managePath="Gestion/Fundas"
				/>
			</div>
		</div>
	);
}

export default Home;
