"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";
import "./Exibir_Produto_Pesquisa.css";

interface Produto {
    id: string;
    sku: string;
    modelo: string;
    memoria: string;
    nota: string;
    status: string;
    nomeCor: string;
    codigoCor: string;
    precoVenda: number;
    precoCompra: number;
    quantidade: number;
    margemLucro: number;
    descricao: string;
    urlImagem: string;
    criadoEm: any;
}

interface FiltrosPesquisa {
    sku?: string;
    modelo?: string;
    memoria?: string;
    nota?: string;
    status?: string;
}

interface ExibirProdutoPesquisaProps {
    filtros: FiltrosPesquisa;
    exibirTodos?: boolean;
}

export default function ExibirProdutoPesquisa({ filtros, exibirTodos = false }: ExibirProdutoPesquisaProps) {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [excluindo, setExcluindo] = useState<string | null>(null);

    // Função para buscar todos os produtos
    const buscarTodosProdutos = async () => {
        try {
            setCarregando(true);
            setErro(null);
            
            const querySnapshot = await getDocs(collection(db, "produtos"));
            const listaProdutos: Produto[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                listaProdutos.push({
                    id: doc.id,
                    sku: data.sku || "",
                    modelo: data.modelo || "",
                    memoria: data.memoria || "",
                    nota: data.nota || "",
                    status: data.status || "",
                    nomeCor: data.nomeCor || "",
                    codigoCor: data.codigoCor || "",
                    precoVenda: data.precoVenda || 0,
                    precoCompra: data.precoCompra || 0,
                    quantidade: data.quantidade || 0,
                    margemLucro: data.margemLucro || 0,
                    descricao: data.descricao || "",
                    urlImagem: data.urlImagem || "",
                    criadoEm: data.criadoEm
                });
            });

            setProdutos(listaProdutos);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            setErro("Erro ao carregar produtos");
        } finally {
            setCarregando(false);
        }
    };

    // Função para filtrar produtos localmente
    const filtrarProdutos = (produtos: Produto[], filtros: FiltrosPesquisa): Produto[] => {
        return produtos.filter(produto => {
            // Filtro por SKU (busca exata)
            if (filtros.sku && filtros.sku.trim() !== "") {
                if (produto.sku.toLowerCase() !== filtros.sku.toLowerCase()) {
                    return false;
                }
            }

            // Filtro por modelo
            if (filtros.modelo && filtros.modelo !== "") {
                if (produto.modelo !== filtros.modelo) {
                    return false;
                }
            }

            // Filtro por memória
            if (filtros.memoria && filtros.memoria !== "") {
                if (produto.memoria !== filtros.memoria) {
                    return false;
                }
            }

            // Filtro por nota
            if (filtros.nota && filtros.nota !== "") {
                if (produto.nota !== filtros.nota) {
                    return false;
                }
            }

            // Filtro por status
            if (filtros.status && filtros.status !== "") {
                if (produto.status !== filtros.status) {
                    return false;
                }
            }

            return true;
        });
    };

    // Effect para buscar produtos
    useEffect(() => {
        if (exibirTodos) {
            buscarTodosProdutos();
        } else {
            setProdutos([]);
        }
    }, [exibirTodos]);

    // Verificar se tem filtros ativos
    const temFiltrosAtivos = Object.values(filtros).some(valor => valor && valor.trim() !== "");

    // Aplicar filtros aos produtos
    const produtosFiltrados = temFiltrosAtivos ? filtrarProdutos(produtos, filtros) : produtos;

    // Função para excluir produto
    const excluirProduto = async (id: string, sku: string) => {
        // Confirmação antes de excluir
        const confirmacao = window.confirm(
            `Tem certeza que deseja excluir o produto ${sku}?\n\nEsta ação não pode ser desfeita.`
        );

        if (!confirmacao) return;

        try {
            setExcluindo(id);
            
            // Excluir do Firestore
            await deleteDoc(doc(db, "produtos", id));
            
            // Remover da lista local
            setProdutos(prev => prev.filter(produto => produto.id !== id));
            
            alert("Produto excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            alert("Erro ao excluir produto. Tente novamente.");
        } finally {
            setExcluindo(null);
        }
    };

    // Não exibir nada se não for para exibir todos e não tem filtros
    if (!exibirTodos) {
        return null;
    }

    if (carregando) {
        return (
            <div className="container-produtos">
                <div className="carregando">
                    <p>Carregando produtos...</p>
                </div>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="container-produtos">
                <div className="erro">
                    <p>{erro}</p>
                </div>
            </div>
        );
    }

    if (produtosFiltrados.length === 0 && produtos.length > 0) {
        return (
            <div className="container-produtos">
                <div className="sem-resultados">
                    <p>Nenhum produto encontrado com os filtros selecionados.</p>
                </div>
            </div>
        );
    }

    if (produtos.length === 0) {
        return (
            <div className="container-produtos">
                <div className="sem-produtos">
                    <p>Nenhum produto cadastrado no banco de dados.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-produtos">
            <div className="header-produtos">
                <h3>Produtos encontrados: {produtosFiltrados.length}</h3>
            </div>
            
            <div className="lista-produtos">
                {produtosFiltrados.map((produto) => (
                    <div key={produto.id} className="card-produto">
                        <div className="imagem-produto">
                            {produto.urlImagem ? (
                                <img 
                                    src={produto.urlImagem} 
                                    alt={`${produto.modelo} ${produto.nomeCor}`}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/placeholder-produto.png"; // fallback image
                                    }}
                                />
                            ) : (
                                <div className="sem-imagem">
                                    <span>Sem imagem</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="info-produto">
                            <div className="header-card">
                                <h4>{produto.modelo}</h4>
                                <span className={`status ${produto.status === "À venda" ? "disponivel" : "suspenso"}`}>
                                    {produto.status}
                                </span>
                            </div>
                            
                            <div className="detalhes">
                                <p><strong>SKU:</strong> {produto.sku}</p>
                                <p><strong>Cor:</strong> {produto.nomeCor}</p>
                                <p><strong>Memória:</strong> {produto.memoria} GB</p>
                                <p><strong>Nota:</strong> {produto.nota}</p>
                                <p><strong>Quantidade:</strong> {produto.quantidade} un.</p>
                            </div>
                            
                            <div className="precos">
                                <div className="preco-item">
                                    <span className="label">Preço de Compra:</span>
                                    <span className="valor compra">R$ {produto.precoCompra.toFixed(2)}</span>
                                </div>
                                <div className="preco-item">
                                    <span className="label">Preço de Venda:</span>
                                    <span className="valor venda">R$ {produto.precoVenda.toFixed(2)}</span>
                                </div>
                                <div className="preco-item">
                                    <span className="label">Margem de Lucro:</span>
                                    <span className="valor margem">{produto.margemLucro}%</span>
                                </div>
                            </div>
                            
                            <div className="acoes">
                                <button 
                                    className="btn-editar" 
                                    onClick={() => console.log("Editar produto:", produto.id)}
                                    disabled={excluindo === produto.id}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn-excluir" 
                                    onClick={() => excluirProduto(produto.id, produto.sku)}
                                    disabled={excluindo === produto.id}
                                >
                                    {excluindo === produto.id ? "Excluindo..." : "Excluir"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}