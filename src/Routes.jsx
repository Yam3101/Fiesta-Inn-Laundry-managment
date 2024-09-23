// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Sabanas from './Gestion/Sabanas';
import Toallas from './Gestion/Toallas';
import Toallasdemano from './Gestion/Toallasdemano';
import Tapetes from './Gestion/Tapetes';
import Duvets from './Gestion/Duvets';
import Fundas from './Gestion/Fundas';
import Registro from './User/Registro';
import Login from './User/Login';

function RoutesTo() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/registro" element={<Registro />} />
        		<Route path="/login" element={<Login />} />
				<Route path="/Gestion/Sabanas" element={<Sabanas />} />
				<Route path="/Gestion/Toallas" element={<Toallas />} />
				<Route path="/Gestion/Toallasdemano" element={<Toallasdemano />} />
				<Route path="/Gestion/Tapetes" element={<Tapetes />} />
				<Route path="/Gestion/Duvets" element={<Duvets />} />
				<Route path="/Gestion/Fundas" element={<Fundas />} />
			</Routes>
		</Router>
	);
}

export default RoutesTo;
