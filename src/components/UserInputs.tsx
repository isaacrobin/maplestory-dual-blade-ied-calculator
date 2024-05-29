import { useEffect, useState } from "react";
import { bladesOfDestinyIedModifier, hauntedEdgeIedModifier, originSkillIed, phantomBlowIedBonuses } from "../formulas/constants";
import { calculateEffectiveIed, calculateFinalDamageGain, calculateTotalIedGainFromMultipleSources as calculateTotalIedGainedFromMultipleSources } from "../formulas/formulas";
import LabeledListInput from "./LabeledListInput";
import LabeledTextInput from "./LabeledTextInput";
import { clamp } from "../utilts";

const UserInputs = () => {
    const [visualIed, setVisualIed] = useState(0);
    const [enemyPdr, setEnemyPdr] = useState(0);
    const [iedGained, setIedGained] = useState([0]);
    const [phantomBlowDamageProportion, setPhantomBlowDamageProportion] = useState(0);
    const [hauntedEdgeDamageProportion, setHauntedEdgeDamageProportion] = useState(0);
    const [bladesOfDestinyDamageProportion, setBladesOfDestinyDamageProportion] = useState(0);
    const [karmaBladeDamageProportion, setKarmaBladeDamageProportion] = useState(0);
    const [karmaBladeLevel, setKarmaBladeLevel] = useState(0);
    const [karmaBladeIedModifier, setKarmaBladeIedModifier] = useState(0);

    useEffect(() => {
        const clampedKarmaBladeLevel = clamp(karmaBladeLevel, 0, 30);
        const originSkillBonusIndex = Math.floor(clampedKarmaBladeLevel / 10);
        const newKarmaBladeIedModifier = originSkillIed[originSkillBonusIndex];
        setKarmaBladeIedModifier(newKarmaBladeIedModifier);
    }, [karmaBladeLevel]);

    const phantomBlowIedModifier = calculateTotalIedGainedFromMultipleSources(phantomBlowIedBonuses);

    const hauntedEdgeEffectiveIed = calculateEffectiveIed(visualIed, hauntedEdgeIedModifier);
    const bladesOfDestinyEffectiveIed = calculateEffectiveIed(visualIed, bladesOfDestinyIedModifier);
    const phantomBlowEffectiveIed = calculateEffectiveIed(visualIed, phantomBlowIedModifier);
    const karmaBladeEffectiveIed = calculateEffectiveIed(visualIed, karmaBladeIedModifier);

    const finalDamageGainedOnPhantomBlow = calculateFinalDamageGain(phantomBlowEffectiveIed, enemyPdr, iedGained);

    const finalDamageGainedOnBladesOfDestiny = calculateFinalDamageGain(bladesOfDestinyEffectiveIed, enemyPdr, iedGained);

    const finalDamageGainedOnHauntedEdge = calculateFinalDamageGain(hauntedEdgeEffectiveIed, enemyPdr, iedGained);

    const finalDamageGainedOnKarmaBlade = calculateFinalDamageGain(karmaBladeEffectiveIed, enemyPdr, iedGained);

    const totalFinalDamageGained = phantomBlowDamageProportion * finalDamageGainedOnPhantomBlow + hauntedEdgeDamageProportion * finalDamageGainedOnHauntedEdge + bladesOfDestinyDamageProportion * finalDamageGainedOnBladesOfDestiny + karmaBladeDamageProportion * finalDamageGainedOnKarmaBlade;
    console.log(phantomBlowDamageProportion, finalDamageGainedOnPhantomBlow, hauntedEdgeDamageProportion, finalDamageGainedOnHauntedEdge, bladesOfDestinyDamageProportion, finalDamageGainedOnBladesOfDestiny)

    console.log(totalFinalDamageGained);
    return (
        <div className='App' style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
            <fieldset>
                <legend>IED info</legend>
                <LabeledTextInput label="Visual IED (%)" value={visualIed} setValue={setVisualIed} convertToDecimal />
                <LabeledTextInput label="Enemy PDR" value={enemyPdr} setValue={setEnemyPdr} />
                <LabeledListInput label="IED Gained (%)" value={iedGained} setValue={setIedGained} />
            </fieldset>

            <fieldset>
                <legend>IED-variable Skill Damage Proportions</legend>
                <LabeledTextInput label="Percent of total damage dealt by phantom blow (%)" value={phantomBlowDamageProportion} setValue={setPhantomBlowDamageProportion} convertToDecimal />
                <LabeledTextInput label="Percent of total damage dealt by haunted edge (%)" value={hauntedEdgeDamageProportion} setValue={setHauntedEdgeDamageProportion} convertToDecimal />
                <LabeledTextInput label="Percent of total damage dealt by blades of destiny (%)" value={bladesOfDestinyDamageProportion} setValue={setBladesOfDestinyDamageProportion} convertToDecimal />
            </fieldset>


            <fieldset>
                <LabeledTextInput label="Percent of total damage dealt by karma blade [origin skill] (%)" value={karmaBladeDamageProportion} setValue={setKarmaBladeDamageProportion} convertToDecimal />
                <legend>Origin Skill Info</legend>
                <LabeledTextInput label="Karma Blade level" value={karmaBladeLevel} setValue={setKarmaBladeLevel} />

            </fieldset>
            <label>Final damage gained: {totalFinalDamageGained.toFixed(2)}</label>
        </div>
    );
}

export default UserInputs;