import Link from "next/link";

import "./Header_Deslogado.css";
import Botao_Preto from "../../ui/Botao_Preto/Botao_Preto";
export default function Header_Deslogado()
{
    return (
        <div className="Header_Deslogado">
            <img 
                className="LogoBranco"
                src="https://raw.githubusercontent.com/NatanMauricio1995/Fotos-Celulares/refs/heads/main/SHARKS%20TECHNOLOGY%20BRANCO.png"
                alt="Sharks Technology Logo"
            />
            <nav>
                <ul className="Menu">
                    <li>
                        <a className="Link" href="/">Home</a>
                    </li>
                    <li>
                        <a className="Link" href="/sobre">Sobre</a>
                    </li>
                    <li>
                        <a className="Link" href="/contato">Contato</a>
                    </li>
                    <li>
                        <Botao_Preto 
                            link="./Login"
                            texto="Login"
                        />
                    </li>
                </ul>            
            </nav>
        </div>
    );
}