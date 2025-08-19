import React from "react";
import "./Botao_Form_Grande.css";

export default function Botao_Form_Grande({ children, color, onClick, type = "button", disabled = false }) {
    return (
        <button 
            className="Botao_Form_Grande"
            style={{ backgroundColor: color }}
            onClick={onClick}
            type={type}
            disabled={disabled} 
        >
            {children}
        </button>
    );
}
