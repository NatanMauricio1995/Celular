"use client";

//Importar entidades
import React, { useState } from "react";
import Link from "next/link";
import "../styles/Editar_Produto.css";
import Tela_ADM from "../components/layout/Tela_ADM/Tela_ADM";
import Box from "../components/layout/Box/Box";
import Botao_Form_Grande from "../components/ui/Botao_Form_Grande/Botao_Form_Grande";
import Barra_Pesquisa_Form from "../components/ui/Barra_Pesquisa_Form/Barra_Pesquisa_Form"
import ExibirProdutoPesquisa from "../components/layout/Exibir_Produto_Pesquisa/Exibir_Produto_Pesquisa";

// Firebase
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface FiltrosPesquisa {
    sku: string;
    modelo: string;
    memoria: string;
    nota: string;
    status: string;
}

export default function Editar_Produto() {
    const [opcao, setOpcao] = useState("");
    const [filtros, setFiltros] = useState<FiltrosPesquisa>({
        sku: "",
        modelo: "",
        memoria: "",
        nota: "",
        status: "À venda"
    });

    // Função para receber filtros do componente filho
    const handleFiltrosChange = (novosFiltros: FiltrosPesquisa) => {
        setFiltros(novosFiltros);
    };

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
                                    id="TIPO_PESQUISA_TODOS"
                                    name="TIPO_PESQUISA"
                                    value="TODOS_APARELHOS"
                                    checked={opcao === "TODOS_APARELHOS"}
                                    onChange={(e) => setOpcao(e.target.value)}
                                />
                                Todos os aparelhos
                            </label>
                        </li>
                        <li>
                            <label className="Arrumacao_Botao">
                                <input 
                                    className="Botao_Radio"
                                    type="radio" 
                                    id="TIPO_PESQUISA_UNICO"
                                    name="TIPO_PESQUISA"
                                    value="APARELHO_UNICO"
                                    checked={opcao === "APARELHO_UNICO"}
                                    onChange={(e) => setOpcao(e.target.value)}
                                />
                                Um único aparelho
                            </label>
                        </li>
                    </ul>
                </Box>

                {/*Editando todos os aparelhos*/}
                {opcao === "TODOS_APARELHOS" && (
                    <Box>
                        <h2>Editando todos os aparelhos</h2>
                        <form>
                            <label
                                className="Titulo_Input"
                                htmlFor="NOVA_MARGEM"
                            >
                                Novo percentual de margem de lucro (%): <span className="Asterisco">*</span>
                                
                                <input 
                                    type="number"
                                    className="Campo_Numero"
                                    id="NOVA_MARGEM"
                                    name="NOVA_MARGEM"
                                    required
                                    min={0}
                                    max={100}
                                    step={0.01}
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
                )}

                {/*Editando um único aparelho*/}
                {opcao === "APARELHO_UNICO" && (
                    <>
                        <Box>
                            <Barra_Pesquisa_Form onFiltrosChange={handleFiltrosChange} />
                        </Box>
                        
                        {/* Box separado para exibir os produtos filtrados */}
                        <Box>
                            <ExibirProdutoPesquisa 
                                filtros={filtros}
                                exibirTodos={true}
                            />
                        </Box>
                    </>
                )}

                {/* Não exibir produtos quando nenhuma opção está selecionada */}
                {opcao === "" && (
                    <Box>
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '40px', 
                            color: '#6c757d',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px'
                        }}>
                            <p>Selecione uma opção acima para visualizar os produtos.</p>
                        </div>
                    </Box>
                )}

            </Tela_ADM>
        </div>
    );
}