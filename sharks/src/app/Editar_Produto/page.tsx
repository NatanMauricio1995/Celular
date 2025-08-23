//sharks\src\app\Editar_Produto\page.tsx

"use client";

//Importar entidades
import React, { useState } from "react";
import Link from "next/link";
import "../styles/Editar_Produto.css";
import Tela_ADM from "../components/layout/Tela_ADM/Tela_ADM";
import Box from "../components/layout/Box/Box";
import Botao_Form_Grande from "../components/ui/Botao_Form_Grande/Botao_Form_Grande";
import Barra_Pesquisa_Form from "../components/ui/Barra_Pesquisa_Form/Barra_Pesquisa_Form"

// Firebase
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Editar_Produto()
{
    const [opcao, setOpcao] = useState("");

    return(
        <div>
            <Tela_ADM>
                <h1>Editar Produto</h1>
                {/*Tipo de pesquisa*/}
                <Box>
                    <h2>Deseja modificar:</h2>
                    <ul className="Lista_Cadastro">
                        <li>
                            <label className="Arrumacao_Botao">
                                <input 
                                    className="Botao_Radio"
                                    type="radio" 
                                    id = "TIPO_PESQUISA"
                                    name = "TIPO_PESQUISA"
                                    value = "TODOS_APARELHOS"
                                    checked = {opcao === "TODOS_APARELHOS"}
                                    onChange = {(e) => setOpcao(e.target.value)}
                                />
                                Todos os aparelhos
                            </label>
                        </li>
                        <li>
                            <label className="Arrumacao_Botao">
                                <input 
                                    className="Botao_Radio"
                                    type="radio" 
                                    id = "TIPO_PESQUISA"
                                    name = "TIPO_PESQUISA"
                                    value = "APARELHO_UNICO"
                                    checked = {opcao === "APARELHO_UNICO"}
                                    onChange = {(e) => setOpcao(e.target.value)}
                                />
                                Um único aparelho
                            </label>
                        </li>
                    </ul>
                </Box>

                {/*Editando todos os aparelhos*/}
                {opcao === "TODOS_APARELHOS" &&(
                    <Box>
                        <h2>Editando todos os aparelhos</h2>
                        <form>
                            <label
                                className = "Titulo_Input"
                                htmlFor = "NOVA_MARGEM"
                            >
                                Novo percentual de margem de lucro (%): <span className="Asterisco">*</span>
                                
                                <input 
                                    type = "number"
                                    className = "Campo_Numero"
                                    id = "NOVA_MARGEM"
                                    name = "NOVA_MARGEM"
                                    required
                                    min = {0}
                                    max = {100}
                                    step = {0.01}
                                />
                            </label>

                            <Botao_Form_Grande
                                type = "submit"
                                children = {"Salvar"}
                                color = "#10b981"
                                className = "Salvar"
                            />
                        </form>
                    </Box>
                )}
               

                {/*Editando um único aparelho*/}

                {opcao === "APARELHO_UNICO" && (
                    <Box>
                        <Barra_Pesquisa_Form />
                    </Box>
                )}

            </Tela_ADM>
        </div>
    );
}