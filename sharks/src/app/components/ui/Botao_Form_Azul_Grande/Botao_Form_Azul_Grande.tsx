import "./Botao_Azul_Grande.css";

export default function Botao_Preto( { link, texto }: { link: string, texto: string } )
{
    return (
        <form action=""></form>
        <a className="Botao_Preto" href={link} >
            {texto}
        </a>
    );
}