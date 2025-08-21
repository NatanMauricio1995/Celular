//sharks\src\app\components\ui\CorPreview\CorPreview.tsx

"use client";

import React from "react";

interface CorPreviewProps {
    codigoCor: string; // código hexadecimal da cor, ex: "#FF0000"
}

export default function CorPreview({ codigoCor }: CorPreviewProps) {
    // Valida se o código da cor começa com # e tem 7 caracteres
    const corValida = /^#[0-9A-Fa-f]{6}$/.test(codigoCor);

    return (
        
            <div
                style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: corValida ? codigoCor : "#FFFFFF",
                    border: "1px solid #000",
                    alignSelf: "center",
                }}>
      
        </div>
    );
}
