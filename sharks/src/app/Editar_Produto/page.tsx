//sharks\src\app\Editar_Produto\page.tsx

"use client";

//Importar entidades
import React from "react";
import Link from "next/link";
import "../styles/Editar_Produto.css";
import Tela_ADM from "../components/layout/Tela_ADM/Tela_ADM";
import Box from "../components/layout/Box/Box";
import ImagensCarrossel from "../components/layout/ImagensCarrossel/ImagensCarrossel";
import Botao_Form_Grande from "../components/ui/Botao_Form_Grande/Botao_Form_Grande";

// Firebase
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Editar_Produto()
{
    /*
    const dados = 
    {
        tipo_pesquisa: form.TIPO_PESQUISA.value,
    };
    */

    return(
        <div>
            <Tela_ADM>
                {/*Tipo de pesquisa*/}
                <Box>
                    <h2>Deseja modificar:</h2>
                    <form>
                        <ul className="Lista_Cadastro">
                            <li>
                                <label className="Arrumacao_Botao">
                                    <input 
                                        className="Botao_Radio"
                                        type="radio" 
                                        id = "TIPO_PESQUISA"
                                        name = "TIPO_PESQUISA"
                                        value = "TRUE"
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
                                        value = "FALSE"
                                    />
                                    Um único aparelho
                                </label>
                            </li>
                        </ul>
                    </form>
                </Box>

                {/*Modificando todos os aparelhos*/}
                <Box>
                    <h2>Editando todos os aparelhos</h2>
                    <form>
                        <label
                            className="Titulo_Input"
                            htmlFor="NOVA_MARGEM"
                        >
                            Novo percentual de margem de lucro (%): <span className="Asterisco">*</span>
                            
                            <input 
                                type ="number"
                                className="Campo_Numero"
                                id="NOVA_MARGEM"
                                name="NOVA_MARGEM"
                                required
                                min = {0}
                                max = {100}
                                step = {0.01}
                            />
                        </label>

                        <Botao_Form_Grande
                            type="submit"
                            children={"Salvar"}
                            color="#10b981"
                            className="Salvar"
                        />
                    </form>
                </Box>
            </Tela_ADM>
        </div>
    );
}