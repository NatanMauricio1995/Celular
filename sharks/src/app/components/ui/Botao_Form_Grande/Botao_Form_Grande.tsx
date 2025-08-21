import React from "react";
import "./Botao_Form_Grande.css";

interface BotaoProps {
    children: React.ReactNode;
    color?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;  // ← adiciona className como prop
}

export default function Botao_Form_Grande({ children, color, onClick, type = "button", disabled = false, className = "" }: BotaoProps) {
    return (
        <button 
            className={`Botao_Form_Grande ${className}`}  // ← aplica className passada
            style={{ backgroundColor: color }}
            onClick={onClick}
            type={type}
            disabled={disabled} 
        >
            {children}
        </button>
    );
}
