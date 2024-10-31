import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";

const Registro = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (error) {
			console.error("Error al registrarse:", error);
		}
	};

	return (
		<div className="overflow-x-hidden w-screen h-screen sm:pb-5 pb-14">
			<div className="flex justify-end">
				<NavbarHome />
			</div>

		</div>
	);
};

export default Registro;
