//sharks\src\app\components\layout\Barra_Lateral\Barra_Lateral.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Barra_Lateral.css";

export default function Barra_Lateral() {
    const pathname = usePathname();

    return (
        <div className="Barra_Lateral">
            <ul>
                <li className="Topico">
                    Dados dos produtos
                    <hr/>
                    <ul>
                        <li className="Topico_Link">
                            <Link 
                                href="/Cadastro_Produto" 
                                className={pathname === "/Cadastro_Produto" ? "active-link" : ""}
                            >
                                Cadastro de produto
                            </Link>
                        </li>
                        <li className="Topico_Link">
                            <Link 
                                href="/Editar_Produto"
                                className={pathname === "/Editar_Produto" ? "active-link" : ""}
                            >
                                Editar produto
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="Topico">
                    Relatórios
                    <hr/>
                </li>
                <li className="Topico">
                    Gerenciamento de usuários
                    <hr/>
                </li>
            </ul>
        </div>
    );
}
