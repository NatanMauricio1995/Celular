import Link from "next/link";
import "./Header_Logado.css";
import Botao_Preto from "../../ui/Botao_Preto/Botao_Preto";

export default function Header_Logado()
{
    return (
        <div className="Header_Logado">
            <img 
                className="LogoBranco"
                src="https://raw.githubusercontent.com/NatanMauricio1995/Fotos-Celulares/refs/heads/main/SHARKS%20TECHNOLOGY%20BRANCO.png"
                alt="Sharks Technology Logo"
            />
            <nav>
                <ul className="Menu">
                    <li>
                        <a className="Link" href="#">Promoções</a>
                    </li>
                    <li>
                        <a className="Link" href="#">Lista de Produtos</a>
                    </li>
                    <li>
                        <a className="Link" href="#">Minha Conta</a>
                    </li>
                    <li>
                        <a className="Link" href="#">Carrinho</a>
                    </li>
                    <li>
                        <Botao_Preto
                            link="/"
                            texto="Sair"
                    />
                    </li>
                </ul>            
            </nav>
        </div>
    );
}
