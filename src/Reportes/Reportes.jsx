import NavbarHome from "../components/NavbarHome";
import { Link } from "react-router-dom";


function Reportes() {
	return (
		<div className="overflow-x-hidden w-screen h-screen sm:pb-5 pb-14 flex flex-col items-center">
            <div className="absolute top-4 left-4">
				<Link
					to="/"
					className="bg-rose-600 text-white px-4 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-300"
				>
					Volver al Inicio
				</Link>
			</div>
            <div className="w-full flex justify-end">
                <NavbarHome />
            </div>
        </div>
	);
}

export default Reportes;
