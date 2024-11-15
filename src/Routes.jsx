// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

import Registro from "./User/Registro";
import Login from "./User/Login";
import Perfil from "./User/Perfil";
import Reportes from "./Reportes/Reportes";
import GestionMensual from "./Mensual/GestionMensual";

function RoutesTo() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/registro" element={<Registro />} />
				<Route path="/login" element={<Login />} />
				<Route path="/Perfil" element={<Perfil />} />
				<Route path="/Reporte" element={<Reportes />} />
				<Route path="/Mes" element={<GestionMensual />} />
			</Routes>
		</Router>
	);
}

export default RoutesTo;
