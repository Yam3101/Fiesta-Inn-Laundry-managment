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
                </div>
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
=======
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
>>>>>>> 12b9cb5b6298aa7e08fe3ba9aa88c41bcd9c6112
}

export default Home;
