//sharks\src\app\Cadastro_Produto\page.tsx

"use client";

//Importar entidades
import { useState } from "react";
import Link from "next/link";
import "../styles/Cadastro_Produto.css";
import Tela_ADM from "../components/layout/Tela_ADM/Tela_ADM";
import Box from "../components/layout/Box/Box";

// Importa Firebase do arquivo de configuração
import { auth, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';


//Programa Principal
export default function Cadastro_Produto()
{


    return(
        <div>
            <Tela_ADM>
                <h1>Cadastro de produto</h1>
                <form>
                    <Box>
                        <div>
                            <h2>Dados do celular</h2>
                            <ul className="Lista_Cadastro">
                                <li>
                                    <label htmlFor="MODELO" className="Titulo_Input">
                                        Modelo <span className='Asterisco'>*</span>
                                    </label>
                                    <input
                                            className="Campo_Texto"
                                            type = "text"
                                            id = "MODELO"
                                            name = "MODELO"
                                            maxLength={100}
                                            pattern="[A-Za-z]{3,}"
                                            autoFocus
                                            required
                                    />
                                </li>
                                <li> 
                                    <label htmlFor="NOTA" className="Titulo_Input">
                                        Nota do aparelho <span className='Asterisco'>*</span>
                                    </label>
                                    <select className="Campo_" id = "NOTA" name="NOTA" required>
                                        <option value = "">Selecione uma nota</option>
                                        <option value = "COMO_NOVO">Como novo</option>
                                        <option value = "A+">A+</option>
                                        <option value = "A-">Selecione uma nota</option>
                                        <option value = "B+">Selecione uma nota</option>
                                        <option value = "B-">Selecione uma nota</option>                                        
                                    </select>

                                </li>
                                <li>
                                    <label className="Titulo_Input">Capacidade de memória <span className='Asterisco'>*</span></label>
                                    <div className="Arrumacao_Botao">
                                        <label className="Label_Botao" htmlFor="MEMORIA64">
                                            <input
                                                className='Botao_Radio'
                                                type='radio'
                                                id="MEMORIA64"
                                                name='CAPACIDADE_MEMORIA'
                                                value="64"                        
                                            />
                                            64 GB
                                        </label>
                                        <label className="Label_Botao" htmlFor="MEMORIA128">
                                            <input
                                                className='Botao_Radio'
                                                type='radio'
                                                id="MEMORIA128"
                                                name='CAPACIDADE_MEMORIA'
                                                value="128"                        
                                            />
                                            128 GB
                                        </label>
                                        <label className="Label_Botao" htmlFor="MEMORIA256">
                                            <input
                                                className='Botao_Radio'
                                                type='radio'
                                                id="MEMORIA256"
                                                name='CAPACIDADE_MEMORIA'
                                                value="256"                        
                                            />
                                            256 GB
                                        </label>
                                        <label className="Label_Botao" htmlFor="MEMORIA512">
                                            <input
                                                className='Botao_Radio'
                                                type='radio'
                                                id="MEMORIA512"
                                                name='CAPACIDADE_MEMORIA'
                                                value="512"                        
                                            />
                                            512 GB
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
                    </Box>
                    <Box>
                        <h2>Cor</h2>
                    </Box>

                    <Box>
                        <h2>Quantidade</h2>
                        <ul className="Lista_Cadastro">
                            <li>
                                <label className="Titulo_Input" htmlFor="QUANTIDADE">
                                    Quantidade em estoque: <span className='Asterisco'>*</span>
                                </label>
                                <input
                                    className="Campo_Numero"
                                    type = "number"
                                    id = "QUANTIDADE"
                                    name = "QUANTIDADE"
                                    maxLength={10}
                                    required
                                    min={0}
                                    step={1}
                                />
                            </li>
                        </ul>
                         <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
                    </Box>
                    <Box>
                        
                    </Box>

                 </form>
            </Tela_ADM>
        </div>
    );
}