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
			<div className="bg-white shadow-md shadow-stone-600 w-80 mx-auto mt-20 rounded-md text-center py-6 relative">
				{user ? (
					<div>
						<h1 className="timesroman text-2xl italic font-semibold mb-4">
							Perfil de Usuario
						</h1>
						<p className="text-gray-800 text-lg">Correo: {user.email}</p>
						<p className="text-gray-500 text-sm mb-4">UID: {user.uid}</p>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={handleLogout}
							className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-2 rounded-md shadow-sm shadow-black duration-300"
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
