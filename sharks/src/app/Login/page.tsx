// sharks/src/app/Login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { auth } from "../utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/Login.css";

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
    <div className="login-container">
      <h1>Entre</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <label htmlFor="password">Senha:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <Link href="#">Esqueci minha senha</Link>

      <p>OU</p>
      <p>
        Novo na Sharks?{" "}
        <Link href="/Cadastro">Cadastre-se aqui!</Link>
      </p>
    </div>
  );
}
