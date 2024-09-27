import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
		}
	};

	return (
		<div className="bg-white shadow-md shadow-stone-600 w-80 mx-auto mt-20 rounded-md text-center py-6 relative">
			<h1 className="timesroman text-2xl italic font-semibold">
				Iniciar Sesión
			</h1>
			<form onSubmit={handleLogin} className="px-6">
				<input
					type="email"
					placeholder="Correo electrónico"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border w-full rounded px-2 py-2 my-3"
				/>
				<input
					type="password"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border w-full rounded px-2 py-2 my-3"
				/>
				<button
					type="submit"
					className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-2 rounded-md shadow-sm shadow-black duration-300"
				>
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
};

export default Login;
