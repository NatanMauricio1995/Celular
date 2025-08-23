"use client";

// Importando entidades
import "./Barra_Pesquisa_Form.css";
import Botao_Form_Grande from "../Botao_Form_Grande/Botao_Form_Grande";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig"; 

interface FiltrosPesquisa {
    sku: string;
    modelo: string;
    memoria: string;
    nota: string;
    status: string;
}

interface BarraPesquisaFormProps {
    onFiltrosChange?: (filtros: FiltrosPesquisa) => void;
}

export default function Barra_Pesquisa_Form({ onFiltrosChange }: BarraPesquisaFormProps) {
    const [modelos, setModelos] = useState<string[]>([]);
    const [filtros, setFiltros] = useState<FiltrosPesquisa>({
        sku: "",
        modelo: "",
        memoria: "",
        nota: "",
        status: "À venda"
    });

    const opcoesStatus = ["À venda", "Suspenso"];

    // Buscar os modelos do Firestore
    useEffect(() => {
        const buscarModelos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "produtos"));
                const lista: string[] = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.modelo) {
                        lista.push(data.modelo);
                    }
                });

                // Remover duplicados
                const unicos = Array.from(new Set(lista));
                setModelos(unicos);
            } catch (erro) {
                console.error("Erro ao buscar modelos:", erro);
            }
        };

        buscarModelos();
    }, []);

    // Notificar sobre mudanças nos filtros
    useEffect(() => {
        if (onFiltrosChange) {
            onFiltrosChange(filtros);
        }
    }, [filtros, onFiltrosChange]);

    // Função para atualizar filtros
    const atualizarFiltro = (campo: keyof FiltrosPesquisa, valor: string) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: valor
        }));
    };

    // Função para limpar todos os filtros
    const limparFiltros = () => {
        setFiltros({
            sku: "",
            modelo: "",
            memoria: "",
            nota: "",
            status: "À venda"
        });
    };

    return (
        <div>
            <h2>Ferramentas de pesquisa</h2>  

            {/* Opções de pesquisa */}
            <form method="GET">
                <ul className="Lista_Cadastro">
                    <li>
                        <label 
                            className="Titulo_Input" 
                            htmlFor="SKU"
                        >
                            SKU
                        </label>
                        <input
                            className="Campo_Texto"
                            type="text"
                            name="SKU"
                            id="SKU"
                            maxLength={10}
                            minLength={10}
                            value={filtros.sku}
                            onChange={(e) => atualizarFiltro('sku', e.target.value)}
                        />                            
                    </li>
                    <li>
                        <label
                            className="Titulo_Input"
                            htmlFor="MODELO"                               
                        >
                            Modelo
                        </label>
                        <select 
                            className="Campo_Select"
                            id="MODELO"
                            name="MODELO"
                            value={filtros.modelo}
                            onChange={(e) => atualizarFiltro('modelo', e.target.value)}
                        >
                            <option value="">Selecione um modelo</option>
                            {modelos.map((modelo, index) => (
                                <option key={index} value={modelo}>
                                    {modelo}
                                </option>
                            ))}
                        </select>
                    </li>
                    <li>
                        <label className="Titulo_Input">
                            Capacidade de Memória
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
                                        checked={filtros.memoria === mem}
                                        onChange={(e) => atualizarFiltro('memoria', e.target.value)}
                                    />
                                    {mem} GB
                                </label>
                            ))}
                        </div>
                    </li>
                    
                    <li>
                        <label className="Titulo_Input">
                            Nota do aparelho
                        </label>
                        <div className="Arrumacao_Botao">
                            {["A+","A-","B+","B-"].map(nota => (
                                <label className="Label_Botao" key={nota} htmlFor={`NOTA${nota}`}>
                                    <input
                                        className="Botao_Radio"
                                        type="radio"
                                        id={`NOTA${nota}`}
                                        name="NOTA"
                                        value={nota}
                                        checked={filtros.nota === nota}
                                        onChange={(e) => atualizarFiltro('nota', e.target.value)}
                                    />
                                    {nota}
                                </label>
                            ))}
                        </div>
                    </li>

                    <li>
                        <label className="Titulo_Input">
                            Status
                        </label>
                        <div className="Arrumacao_Botao">
                            {opcoesStatus.map(status => (
                                <label className="Label_Botao" key={status} htmlFor={`STATUS${status}`}>
                                    <input
                                        className="Botao_Radio"
                                        type="radio"
                                        id={`STATUS${status}`}
                                        name="STATUS"
                                        value={status}
                                        checked={filtros.status === status}
                                        onChange={(e) => atualizarFiltro('status', e.target.value)}
                                    />
                                    {status}
                                </label>
                            ))}
                        </div>
                    </li>
                </ul>

                {/* Botão para limpar filtros */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Botao_Form_Grande
                        type="button"
                        onClick={limparFiltros}
                        color="#6c757d"
                        style={{ marginRight: '10px' }}
                    >
                        Limpar Filtros
                    </Botao_Form_Grande>
                </div>
            </form>
        </div>
    );
}