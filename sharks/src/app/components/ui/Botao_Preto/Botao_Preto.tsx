import "./Botao_Preto.css";

export default function Botao_Preto( { link, texto }: { link: string, texto: string } )
{
    return (
        <a className="Botao_Preto" href={link} >
            {texto}
        </a>
    );
}