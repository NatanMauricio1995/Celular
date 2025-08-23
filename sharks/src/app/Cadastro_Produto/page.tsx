"use client";

// Importar entidades
import { useState } from "react";
import "../styles/Cadastro_Produto.css";
import Tela_ADM from "../components/layout/Tela_ADM/Tela_ADM";
import Box from "../components/layout/Box/Box";
import ImagensCarrossel from "../components/layout/ImagensCarrossel/ImagensCarrossel";
import GerarSKU from "../utils/GerarSKU";
import Botao_Form_Grande from "../components/ui/Botao_Form_Grande/Botao_Form_Grande";

// Firebase
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Cadastro_Produto() {
    const [precoCompra, setPrecoCompra] = useState<number>(0);
    const [margemLucro, setMargemLucro] = useState<number>(0);
    const precoVenda = precoCompra * (100 + margemLucro) / 100;

    const [codigoCor, setCodigoCor] = useState<string>("#FFFFFF");
    const [sku, setSku] = useState<string>(""); 
    const [urlImagem, setUrlImagem] = useState<string>("");

    // Função de envio do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const form = e.target as HTMLFormElement;

            const dados = {
                modelo: form.MODELO.value,
                nota: form.NOTA.value,
                memoria: form.CAPACIDADE_MEMORIA.value,
                nomeCor: form.NOME_COR.value,
                codigoCor: codigoCor,
                quantidade: parseInt(form.QUANTIDADE.value),
                precoCompra: precoCompra,
                margemLucro: margemLucro,
                precoVenda: precoVenda,
                descricao: form.DESCRICAO.value,
                sku: sku,
                urlImagem: urlImagem,
                status: "À venda",
                criadoEm: new Date()
            };

            await addDoc(collection(db, "produtos"), dados);
            alert("Produto cadastrado com sucesso!");
            form.reset();
            setPrecoCompra(0);
            setMargemLucro(0);
            setCodigoCor("#FFFFFF");
            setSku("");
            setUrlImagem("");
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            alert("Erro ao salvar no banco.");
        }
    };

    return (
        <div>
            <Tela_ADM className="Tela_Adm">
                <h1>Cadastro de produto</h1>
                <form onSubmit={handleSubmit}>

                    {/* Dados do celular */}
                    <Box className="BOX_ADM">
                        <h2>Dados do celular</h2>
                        <ul className="Lista_Cadastro">
                            <li>
                                <label htmlFor="MODELO" className="Titulo_Input">
                                    Modelo <span className="Asterisco">*</span>
                                </label>
                                <input
                                    className="Campo_Texto"
                                    type="text"
                                    id="MODELO"
                                    name="MODELO"
                                    maxLength={100}
                                    autoFocus
                                    required
                                />
                            </li>
                            <li>
                                <label htmlFor="NOTA" className="Titulo_Input">
                                    Nota do aparelho <span className="Asterisco">*</span>
                                </label>
                                <select className="Campo_" id="NOTA" name="NOTA" required>
                                    <option value="">Selecione uma nota</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                </select>
                            </li>
                            <li>
                                <label className="Titulo_Input">
                                    Capacidade de memória <span className="Asterisco">*</span>
                                </label>
                                <div className="Arrumacao_Botao">
                                    {["64","128","256","512"].map(mem => (
                                        <label className="Label_Botao" key={mem} htmlFor={`MEMORIA${mem}`}>
                                            <input
                                                className="Botao_Radio"
                                                type="radio"
                                                id={`MEMORIA${mem}`}
                                                name="CAPACIDADE_MEMORIA"
                                                value={mem}
                                                required
                                            />
                                            {mem} GB
                                        </label>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </Box>

                    {/* Cor */}
                    <Box className="BOX_ADM">
                        <h2>Cor</h2>
                        <ul className="Lista_Cadastro">
                            <li>
                                <label className="Titulo_Input" htmlFor="NOME_COR">
                                    Nome da cor: <span className="Asterisco">*</span>
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
                                    Código Hexadecimal da Cor: <span className="Asterisco">*</span>
                                </label>
                                <input
                                    className="Campo_Texto"
                                    type="color"
                                    id="CODIGO_COR"
                                    name="CODIGO_COR"
                                    required
                                    value={codigoCor}
                                    onChange={(e) => setCodigoCor(e.target.value)}
                                />
                            </li>
                        </ul>
                    </Box>

                    {/* Quantidade */}
                    <Box className="BOX_ADM">
                        <h2>Quantidade</h2>
                        <ul className="Lista_Cadastro">
                            <li>
                                <label className="Titulo_Input" htmlFor="QUANTIDADE">
                                    Quantidade em estoque: <span className="Asterisco">*</span>
                                </label>
                                <input
                                    className="Campo_Numero"
                                    type="number"
                                    id="QUANTIDADE"
                                    name="QUANTIDADE"
                                    required
                                    min={0}
                                    step={1}
                                />
                            </li>
                        </ul>
                    </Box>

                    {/* Preço */}
                    <Box className="BOX_ADM">
                        <h2>Preço</h2>
                        <ul className="Lista_Cadastro">
                            <li>
                                <label className="Titulo_Input" htmlFor="PRECO_COMPRA">
                                    Preço de compra (U$): <span className="Asterisco">*</span>
                                </label>
                                <input
                                    className="Campo_Numero"
                                    type="number"
                                    id="PRECO_COMPRA"
                                    name="PRECO_COMPRA"
                                    required
                                    min={0}
                                    step={0.01}
                                    value={precoCompra}
                                    onChange={(e) => setPrecoCompra(parseFloat(e.target.value))}
                                />
                            </li>
                            <li>
                                <label className="Titulo_Input" htmlFor="MARGEM_LUCRO">
                                    Porcentual de lucro (%) <span className="Asterisco">*</span>
                                </label>
                                <input
                                    className="Campo_Numero"
                                    type="number"
                                    id="MARGEM_LUCRO"
                                    name="MARGEM_LUCRO"
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
                                    <div className="Valor_Venda">U$ {precoVenda.toFixed(2)}</div>
                                </div>
                            </li>
                        </ul>
                    </Box>

                    {/* Fotos do produto */}
                    <Box className="BOX_ADM">
                        <h2>Fotos do produto</h2>
                        <ImagensCarrossel setUrlImagem={setUrlImagem} />
                    </Box>

                    {/* Descrição */}
                    <Box>
                        <h2>Descrição do Produto</h2>
                        <textarea
                            className="Campo_TextArea"
                            id="DESCRICAO"
                            name="DESCRICAO"
                            rows={5}
                            maxLength={1000}
                            required
                        />
                    </Box>

                    {/* SKU */}
                    <Box className="BOX_ADM">
                        <h2>SKU</h2>
                        <GerarSKU sku={sku} setSku={setSku} />
                    </Box>

                    <Botao_Form_Grande
                        type="submit"
                        children={"Salvar"}
                        color="#10b981"
                        className="Salvar"
                    />
                </form>
            </Tela_ADM>
        </div>
    );
}
