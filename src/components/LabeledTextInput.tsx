import React, { FC } from "react"

interface LabeledTextInputProps {
    value: number;
    setValue: (value: number) => void;
    label: string;
    convertToDecimal?: boolean;
}

const LabeledTextInput: FC<LabeledTextInputProps> = ({ value, setValue, label, convertToDecimal }) => {

    const displayValue = convertToDecimal ? +(value * 100).toFixed(2) : value;

    return <div>
        <label>{`${label} `}</label>
        <input style={{ maxWidth: 100 }} type="number" value={value === 0 ? "" : displayValue} onChange={(event) => { setValue(convertToDecimal ? +event.target.value / 100 : +event.target.value) }} />
        <br />
    </div>;
};

export default LabeledTextInput;
