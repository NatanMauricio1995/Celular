//sharks\src\app\components\layout\Header_ADM\Header_ADM.tsx

import Link from "next/link";
import Botao_Preto from "../../ui/Botao_Preto/Botao_Preto";
import "./Header_ADM.css"
import Barra_Saudacao from "../Barra_Saudacao/Barra_Saudacao";

export default function Header_ADM()
{
    return (
        <div className="Header_ADM">
            <div className = "Header">
                <img 
                    className="LogoBranco"
                    src="https://raw.githubusercontent.com/NatanMauricio1995/Fotos-Celulares/refs/heads/main/SHARKS%20TECHNOLOGY%20BRANCO.png"
                    alt="Sharks Technology Logo"
                />
                <nav>
                    <ul className="Menu">
                        <li>
                            <Botao_Preto 
                                link="/"
                                texto="Sair"
                            />
                        </li>
                    </ul>            
                </nav>
            </div>

            <Barra_Saudacao
                nome = "Fulano"
                link = "/"
            />
        </div>

    );
}