//sharks\src\app\components\ui\Barra_Pesquisa_Form\Barra_Pesquisa_Form.tsx

//Importando entidades
import "./Barra_Pesquisa_Form.css";
import Botao_Form_Grande from "../Botao_Form_Grande/Botao_Form_Grande";
import React, { useState } from "react";

interface Barra_Pesquisa
{
    
}

export default function Barra_Pesquisa_Form()
{
    const [aberto, setAberto] = useState(false);

    const alternarMenu = () => { setAberto(!aberto); };
        return(
            <div>
                 {/* Campo que abre as ferramentas de pesquisa */}
                 <button onClick={alternarMenu}>
                    Ferramentas de pesquisa
                </button>

                {/* Opções de pesquisa */}
   
                {aberto &&
                <form method="GET">
                    <ul>
                        <li>
                            <label 
                                
                                htmlFor="SKU">SKU</label>
                            
                        </li>
                    </ul>
                    
                    
                    
                </form>
                }   
            </div>
        );
}