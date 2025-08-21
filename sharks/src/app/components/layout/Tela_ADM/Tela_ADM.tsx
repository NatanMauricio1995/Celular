//sharks\src\app\components\layout\Tela_ADM\Tela_ADM.tsx

import React from "react";
import Link from "next/link";
import "./Tela_ADM.css";
import Header_ADM from "../Header_ADM/Header_ADM";
import Barra_Lateral from "../Barra_Lateral/Barra_Lateral";


export default function Tela_ADM({ children})
{
    return (
        <div>
            <Header_ADM className="Header_ADM"/>
            <Barra_Lateral />
            <main className="Corpo_ADM">
                {children}
            </main>
        </div>
    );
}