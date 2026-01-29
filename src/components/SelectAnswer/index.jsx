import React, { useState, useEffect } from "react";
import './style.css';

const SelectAnswer = ({ getAnswers, index, opA, opB, opC, opD, opE }) => {
    // 1. Initialize with the default string so the <select> shows it
    const [valueInfo, setValueInfo] = useState('Selecione sua resposta');

    useEffect(() => {
        // 2. Use a local variable to determine what to send "up" to the parent
        let finalValue = valueInfo;

        if (valueInfo === 'Selecione sua resposta') {
            finalValue = 7000;
        }

        // 3. Send the processed value
        getAnswers(finalValue, index);
        
    }, [valueInfo, index, getAnswers]); // Added missing dependencies

    return (
        <div className="SelectAnswer">
            <select 
                className="form-select" 
                aria-label="Default select example" 
                value={valueInfo} 
                onChange={(e) => setValueInfo(e.target.value)}
            >
                {/* 4. Use 'value' instead of 'defaultValue' for the placeholder */}
                <option value="Selecione sua resposta">Selecione sua resposta</option>
                <option value="1">{opA}</option>
                <option value="2">{opB}</option>
                <option value="3">{opC}</option>
                <option value="4">{opD}</option>
                <option value="5">{opE}</option>
            </select>
        </div>
    );
}

export default SelectAnswer;