import "./Header_Login.css";

export default function Header_Login() {
    return (
        <div className="Header_Login">
            <img 
                className="LogoAzul"
                src="https://raw.githubusercontent.com/NatanMauricio1995/Fotos-Celulares/refs/heads/main/SHARKS%20TECHNOLOGY%20AZUL%20MARINHO.png"
                alt="Sharks Technology Logo"
            />
            <nav>
                <ul className="Menu">
                    <li>
                        <a className="Link" href="/">Voltar</a>
                    </li>
                </ul>            
            </nav>
        </div>
    );
}


