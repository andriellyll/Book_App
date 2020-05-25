import React from 'react';

import './style.css';

export default function Modal(props) {
    if(!props.show) {
        return null;
    }

    return(
        <div className="modal">
            <div        
                className="janela">
                {props.children}
                <button className="close" onClick={props.closeModal}>Fechar</button>
            </div>
        </div>
    );
}