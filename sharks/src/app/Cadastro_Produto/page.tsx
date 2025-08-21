// sharks\src\app\Cadastro_Produto\page.tsx

"use client";

//Importar entidades
import { useState } from "react";
import Link from "next/link";
import "../styles/Cadastro_Produto.css";
import Tela_ADM from "../components/layout/Tela_ADM/Tela_ADM";
import Box from "../components/layout/Box/Box";
import CorPreview from "../components/ui/CorPreview/CorPreview";

// Importa Firebase do arquivo de configuração
import { auth, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function Cadastro_Produto() {
    const [precoCompra, setPrecoCompra] = useState<number>(0);
    const [margemLucro, setMargemLucro] = useState<number>(0);
    const precoVenda = precoCompra * (100 + margemLucro) / 100;
    const [codigoCor, setCodigoCor] = useState<string>("#FFFFFF");


    return (
        <div>
            <Tela_ADM className = "Tela_Adm">
                <h1>Cadastro de produto</h1>
                <form>
                    <Box className="BOX_ADM"> 
                        <div>
                            <h2>Dados do celular</h2>
                            <ul className="Lista_Cadastro">
                                <li>
                                    <label htmlFor="MODELO" className="Titulo_Input">
                                        Modelo <span className='Asterisco'>*</span>
                                    </label>
                                    <input
                                        className="Campo_Texto"
                                        type="text"
                                        id="MODELO"
                                        name="MODELO"
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
                                    <select className="Campo_" id="NOTA" name="NOTA" required>
                                        <option value="">Selecione uma nota</option>
                                        <option value="COMO_NOVO">Como novo</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                    </select>
                                </li>
                                <li>
                                    <label className="Titulo_Input">Capacidade de memória <span className='Asterisco'>*</span></label>
                                    <div className="Arrumacao_Botao">
                                        <label className="Label_Botao" htmlFor="MEMORIA64">
                                            <input className='Botao_Radio' type='radio' id="MEMORIA64" name='CAPACIDADE_MEMORIA' value="64" />
                                            64 GB
                                        </label>
                                        <label className="Label_Botao" htmlFor="MEMORIA128">
                                            <input className='Botao_Radio' type='radio' id="MEMORIA128" name='CAPACIDADE_MEMORIA' value="128" />
                                            128 GB
                                        </label>
                                        <label className="Label_Botao" htmlFor="MEMORIA256">
                                            <input className='Botao_Radio' type='radio' id="MEMORIA256" name='CAPACIDADE_MEMORIA' value="256" />
                                            256 GB
                                        </label>
                                        <label className="Label_Botao" htmlFor="MEMORIA512">
                                            <input className='Botao_Radio' type='radio' id="MEMORIA512" name='CAPACIDADE_MEMORIA' value="512" />
                                            512 GB
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
                    </Box>

                    <Box className="BOX_ADM">
                        <h2>Cor</h2>
                         <ul className="Lista_Cadastro">
                            <li>
                                <label className="Titulo_Input" htmlFor="NOME_COR">
                                    Nome da cor: <span className='Asterisco'>*</span>
                                </label>
                                <input
                                    className="Campo_Texto"
                                    type="text"
                                    id="NOME_COR"
                                    name="NOME_COR"
                                    maxLength={100}
                                    required
                                    minLength={1}
                                />
                            </li>
                            <li>
                                <label className="Titulo_Input" htmlFor="CODIGO_COR">
                                    Código Hexadecimal da Cor: <span className='Asterisco'>*</span>
                                </label>
                                <CorPreview codigoCor={codigoCor} />
                                <input
                                    className="Campo_Texto"
                                    type="text"
                                    id="CODIGO_COR"
                                    name="CODIGO_COR"
                                    maxLength={7}
                                    required
                                    minLength={7}
                                    value={codigoCor}
                                    onChange={(e) => setCodigoCor(e.target.value)}
                                />
                                
                            </li>
                            
                        </ul>

                    </Box>

                    <Box className="BOX_ADM">
                        <h2>Quantidade</h2>
                        <ul className="Lista_Cadastro">
                            <li>
                                <label className="Titulo_Input" htmlFor="QUANTIDADE">
                                    Quantidade em estoque: <span className='Asterisco'>*</span>
                                </label>
                                <input
                                    className="Campo_Numero"
                                    type="number"
                                    id="QUANTIDADE"
                                    name="QUANTIDADE"
                                    maxLength={10}
                                    required
                                    min={0}
                                    step={1}
                                />
                            </li>
                        </ul>
                        <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
                    </Box>

                    <Box className="BOX_ADM">
                        <h2>Preço</h2>
                        <ul className="Lista_Cadastro">
                            <li>
                                <label className="Titulo_Input" htmlFor="PRECO_COMPRA">
                                    Preço de compra (R$): <span className='Asterisco'>*</span>
                                </label>
                                <input
                                    className="Campo_Numero"
                                    type="number"
                                    id="PRECO_COMPRA"
                                    name="PRECO_COMPRA"
                                    maxLength={10}
                                    required
                                    min={0}
                                    step={0.01}
                                    value={precoCompra}
                                    onChange={(e) => setPrecoCompra(parseFloat(e.target.value))}
                                />
                            </li>
                            <li>
                                <label className="Titulo_Input" htmlFor="MARGEM_LUCRO">
                                    Porcentual de lucro (%) <span className='Asterisco'>*</span>
                                </label>
                                <input
                                    className="Campo_Numero"
                                    type="number"
                                    id="MARGEM_LUCRO"
                                    name="MARGEM_LUCRO"
                                    maxLength={3}
                                    required
                                    min={0}
                                    max={100}
                                    step={0.01}
                                    value={margemLucro}
                                    onChange={(e) => setMargemLucro(parseFloat(e.target.value))}
                                />
                            </li>
                            <li className="Titulo_Input">
                                <div className="Exibir_Valor_Venda">
                                    <div>Preço de venda estimado:</div>
                                    <div className="Valor_Venda">R$ {precoVenda.toFixed(2)}</div>
                                </div>
                            </li>
                        </ul>
                        <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
                    </Box>
                </form>
            </Tela_ADM>
        </div>
    );
}
