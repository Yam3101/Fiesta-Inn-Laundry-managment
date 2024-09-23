import React, { useState } from "react";
import { auth } from "../firebaseConfig"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-white shadow-md shadow-stone-600 w-80 mx-auto mt-20 rounded-md text-center py-6 relative">
      <h1 className="timesroman text-2xl italic font-semibold">Registro</h1>
      <form onSubmit={handleRegister} className="px-6">
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
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
