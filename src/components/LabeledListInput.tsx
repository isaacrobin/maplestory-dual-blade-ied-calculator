import React, { FC, useState } from "react"

interface LabeledListInputProps {
    value: number[];
    setValue: (value: number[]) => void;
    label: string;
}

const LabeledListInput: FC<LabeledListInputProps> = ({ value, setValue, label }) => {
    const defaultLabel = `${label} 🛈 `;
    const [displayLabel, setDisplayLabel] = useState(`${label} 🛈 `);

    return <div>
        <label onMouseOver={() => setDisplayLabel(`${label}, accepts comma-separated list of ied values e.g. 20,30,40 `)} onMouseOut={() => setDisplayLabel(defaultLabel)}>{displayLabel}</label>
        <input style={{ maxWidth: 100 }} type="text" value={value.toString() !== "0" ? value.map(value => (value * 100).toString()) : ""} onChange={(event) => { setValue(event.target.value.split(',').map(value => +(value) / 100)) }} />
        <br />
    </div>;
};

export default LabeledListInput;
