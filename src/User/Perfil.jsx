// Perfil.js
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import { Link } from "react-router-dom";

const Perfil = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				navigate("/login");
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				navigate("/login");
			})
			.catch((error) => {
				console.error("Error al cerrar sesión:", error);
			});
	};

	return (
		<div className="overflow-x-hidden w-screen h-screen sm:pb-5 pb-14">
			<div className="flex justify-end">
				<NavbarHome />
			</div>
			<div className="absolute top-4 left-4">
				<Link
					to="/"
					className="bg-rose-600 text-white px-4 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-300"
				>
					Volver al Inicio
				</Link>
			</div>
			<div className="bg-white shadow-md shadow-stone-600 w-[49rem] mx-auto mt-20 rounded-md px-10 py-6 relative">
				{user ? (
					<div className="flex flex-col gap-2">
						<h1 className="timesroman text-2xl italic font-semibold animation1">
							Perfil de Usuario
						</h1>
						<p className="text-gray-900 text-lg">Correo: {user.email}</p>
						<p className="text-gray-600 text-sm mb-4">User ID: {user.uid}</p>

						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={handleLogout}
							className="bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-md shadow-sm shadow-black duration-300 text-center w-48"
						>
							Cerrar sesión
						</button>
					</div>
				) : (
					<p className="text-gray-500">Cargando...</p>
				)}
			</div>
		</div>
	);
};

export default Perfil;
