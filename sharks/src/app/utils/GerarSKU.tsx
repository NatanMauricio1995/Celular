"use client";

interface GerarSKUProps {
    sku: string;
    setSku: (sku: string) => void;
}

export default function GerarSKU({ sku, setSku }: GerarSKUProps) {
    const gerarNovoSKU = () => {
        let numeros = "";
        for (let i = 0; i < 5; i++) {
            numeros += Math.floor(Math.random() * 10).toString();
        }
        const novoSKU = `IPHONE-${numeros}`;
        setSku(novoSKU);
    };

    return (
        <div className="SKU_Bloco_Interno">
            <input
                className="Campo_Texto"
                type="text"
                readOnly
                value={sku} // Mostra o SKU gerado
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
