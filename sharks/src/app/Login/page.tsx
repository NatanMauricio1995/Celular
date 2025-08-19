// sharks/src/app/Login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { auth } from "../utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/Login.css";
import Header_Login from "../components/layout/Header_Login/Header_Login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
      // redirecionar para a home ou dashboard
      window.location.href = "/";
    } catch (err: any) {
      setError("Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header_Login className="Header_Login" />
      <div className="login-container">
        
        <section className="Entrada_Login">
          <div>
            <img 
              src="https://raw.githubusercontent.com/NatanMauricio1995/Fotos-Celulares/refs/heads/main/SHARKS%20TECHNOLOGY%20BRANCO.png"
              alt="Sharks Technology Logo"
              className="Logo" />
          </div>
          <div className="Form_Login">
            <h1>Entre</h1>
            <form onSubmit={handleLogin}>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              
              <button id = "Entrar" type="submit" disabled={loading}>
                {loading ? "Entrando..." : "CONTINUAR"}
              </button>
            </form>

            {error && <p className="error">{error}</p>}

            <Link id = "Trocar_Senha" href="#">Esqueci minha senha</Link>

            <div id = "Ou">
              <span>OU</span>
            </div>

            <div id = "Pergunta">
              Novo na Sharks?{" "}
              <Link id = "Cadastro" href="/Cadastro">Cadastre-se aqui!</Link>
            </div>


          
          </div>
       </section>
      </div>
    </>
  );
}
