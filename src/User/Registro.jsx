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
			<div className="bg-white shadow-md shadow-stone-900 w-96 mx-auto mt-20 rounded-md text-center py-6 relative">
				<h1 className="timesroman text-2xl italic font-semibold animation1 py-4">
					Registro
				</h1>
				<form onSubmit={handleRegister} className="flex flex-col px-6 gap-3">
					<input
						type="email"
						placeholder="Correo electrónico"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border-[1px] bg-stone-200 w-full rounded-md px-2 py-2 text-black placeholder:text-stone-600"
					/>
					<input
						type="password"
						placeholder="Contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border-[1px] bg-stone-200 w-full rounded-md px-2 py-2 text-black placeholder:text-stone-600"
					/>
					<button
						type="submit"
						className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-2 rounded-md shadow-sm shadow-black duration-300 mt-10"
					>
						Registrarse
					</button>
				</form>
				<p className="mt-4 text-sm">
					¿Ya tienes una cuenta?{" "}
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
						onClick={() => navigate("/login")}
					>
						Inicia sesion
					</span>
				</p>
			</div>
		</div>
	);
};

export default Registro;
