//sharks\src\app\Editar_Produto\page.tsx

"use client";

//Importar entidades
import React from "react";
import Link from "next/link";
import "../styles/Editar_Produto";
import Tela_ADM from "../components/layout/Tela_ADM/Tela_ADM";
import Box from "../components/layout/Box/Box";
import ImagensCarrossel from "../components/layout/ImagensCarrossel/ImagensCarrossel";
import Botao_Form_Grande from "../components/ui/Botao_Form_Grande/Botao_Form_Grande";

// Importa Firebase do arquivo de configuração
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Editar_Produto()
{
    return(
        <div>

        </div>
    );
}