//sharks\src\app\components\layout\Barra_Saudacao\Barra_Saudacao.tsx
import React from "react";
import Link from "next/link";
import "./Barra_Saudacao.css"

export default function Barra_Saudacao( {link, nome}: {link: string, nome: string})
{
    return (
        <div className="Barra_Saudacao">
            <p className = "Saudacao">Olá, {nome}!</p>
            <a className = "Voltar" href = {link}>Voltar</a>
        </div>
    );
}