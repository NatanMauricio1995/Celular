import Link from 'next/link';
import '../styles/Login.css';

export default function Login() {
  return (
    <div>
      <h1>Entre</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" name="password" required />
        
        <button type="submit">Entrar</button>
      </form>
      
      <Link href="#">Esqueci minha senha</Link>
      
      <p>OU</p>
      <p>Novo na Sharks? <Link href="/Cadastro">Cadastre-se aqui!</Link></p>
    </div>
  );
}