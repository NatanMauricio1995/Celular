import React from "react";
import "./Box.css";

export default function Box({ children })
{
    return(
        <div className="Box">
            {children}
        </div>
    )
}
