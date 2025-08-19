import Link from "next/link";

import "./Header_Cadastro.css";
import Botao_Preto from "../../ui/Botao_Preto/Botao_Preto";
export default function Header_Cadastro()
{
    return (
        <div className="Header_Cadastro">
            <img 
                className="LogoBranco"
                src="https://raw.githubusercontent.com/NatanMauricio1995/Fotos-Celulares/refs/heads/main/SHARKS%20TECHNOLOGY%20BRANCO.png"
                alt="Sharks Technology Logo"
            />
            <nav>
                <ul className="Menu">
                    <li>
                        <Botao_Preto 
                            link="./Login"
                            texto="Voltar"
                        />
                    </li>
                </ul>            
            </nav>
        </div>
    );
}