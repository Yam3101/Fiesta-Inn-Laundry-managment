import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(""); // Estado para el mensaje de error
	const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (error) {
			// Si hay un error, mostramos el modal con un mensaje de error
			setError("Datos incorrectos. Por favor, intenta de nuevo.");
			setShowModal(true);
		}
	};

	return (
		<div className="overflow-x-hidden w-screen h-screen sm:pb-5 pb-14">
			<div className="flex justify-end">
				<NavbarHome />
			</div>
			<div className="bg-white shadow-md shadow-stone-900 w-96 mx-auto mt-20 rounded-md text-center py-6 relative">
				<h1 className="timesroman text-2xl italic font-semibold animation1 py-4">
					Iniciar Sesión
				</h1>
				<form onSubmit={handleLogin} className="flex flex-col px-6 gap-3">
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
						Iniciar Sesión
					</button>
				</form>
				<p className="mt-4 text-sm">
					¿No tienes cuenta?
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<span
						className="text-rose-600 hover:underline cursor-pointer"
						onClick={() => navigate("/registro")}
					>
						¡Regístrate!
					</span>
				</p>
			</div>

			{/* Modal para mostrar el error */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-4 rounded shadow-lg">
						<p className="text-red-500">{error}</p>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={() => setShowModal(false)}
							className="mt-4 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded"
						>
							Cerrar
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
