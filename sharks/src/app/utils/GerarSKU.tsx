// sharks\src\app\utils\GerarSKU.tsx
"use client";

import { useState } from "react";

export default function GerarSKU() {
    const [sku, setSku] = useState<string>("");

    // Função que gera 5 números aleatórios
    const gerarNovoSKU = () => {
        let numeros = "";
        for (let i = 0; i < 5; i++) {
            numeros += Math.floor(Math.random() * 10).toString();
        }
        setSku(`IPHONE-${numeros}`);
    };

    return (
        <div className="SKU_Bloco_Interno">
            <input
                className="Campo_Texto"
                type="text"
                name="SKU"
                value={sku}
                readOnly
                placeholder="Clique em gerar SKU"
            />
            <button
                type="button"
                onClick={gerarNovoSKU}
                className="Botao_Generico"
            >
                Gerar SKU
            </button>
        </div>
    );
}
