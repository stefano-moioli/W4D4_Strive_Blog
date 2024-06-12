import React from "react";
import RegisterForm from "../../components/authentication/RegisterForm";


export default function Register(){
  return (
    <div className="text-center mt-5">
      <h1>Registrati</h1>
      <p>Questa è la pagina per registrarsi!!</p>
      <RegisterForm />
    </div>
  );
    
}