import { useEffect, useState } from "react";
import { blades_of_destiny_damage_proportion, blades_of_destiny_ied_modifier, haunted_edge_damage_proportion, haunted_edge_ied_modifier, phantom_blow_damage_proportion, phantom_blow_ied_bonuses } from "../formulas/constants";
import { calculate_effective_ied, calculate_final_damage_gain, calculate_total_ied_gain_from_multiple_sources } from "../formulas/formulas";

const UserInputs = () => {
    const [visual_ied_input, set_visual_ied_input] = useState('');
    const [visual_ied, set_visual_ied] = useState(0);
    const [enemy_pdr, set_enemy_pdr] = useState(0);
    const [ied_gained, set_ied_gained] = useState([0]);

    useEffect(() => {
        if (!isNaN(+visual_ied_input)) {
            set_visual_ied(+visual_ied_input / 100);
        }
    }, [visual_ied_input]);

    const phantom_blow_ied_modifier = calculate_total_ied_gain_from_multiple_sources(phantom_blow_ied_bonuses);

    const haunted_edge_effective_ied = calculate_effective_ied(visual_ied, haunted_edge_ied_modifier);
    const blades_of_destiny_effective_ied = calculate_effective_ied(visual_ied, blades_of_destiny_ied_modifier);
    const phantom_blow_effective_ied = calculate_effective_ied(visual_ied, phantom_blow_ied_modifier);

    const final_damage_gained_on_phantom_blow = calculate_final_damage_gain(phantom_blow_effective_ied, enemy_pdr, ied_gained);

    const final_damage_gained_on_blades_of_destiny = calculate_final_damage_gain(blades_of_destiny_effective_ied, enemy_pdr, ied_gained);

    const final_damage_gained_on_haunted_edge = calculate_final_damage_gain(haunted_edge_effective_ied, enemy_pdr, ied_gained);

    const total_final_damage_gained = phantom_blow_damage_proportion * final_damage_gained_on_phantom_blow + haunted_edge_damage_proportion * final_damage_gained_on_haunted_edge + blades_of_destiny_damage_proportion * final_damage_gained_on_blades_of_destiny;
    console.log(phantom_blow_damage_proportion, final_damage_gained_on_phantom_blow, haunted_edge_damage_proportion, final_damage_gained_on_haunted_edge, blades_of_destiny_damage_proportion, final_damage_gained_on_blades_of_destiny)

    console.log(total_final_damage_gained);
    return (
        <div className='App' style={{ display: "flex", flexDirection: "column" }}>
            <label>visual ied</label>
            <input type="text" value={visual_ied_input} onChange={(event) => { set_visual_ied_input(event.target.value) }} />
            <br />
            <label>enemy pdr</label>
            <input type="text" value={enemy_pdr.toString()} onChange={(event) => { set_enemy_pdr(+event.target.value) }} />
            <br />
            <label>ied gained</label>
            <input type="text" value={ied_gained.map(value => (value * 100).toString())} onChange={(event) => { set_ied_gained(event.target.value.split(',').map(value => Number(value) / 100)) }} />
            <label>final damage gained: {total_final_damage_gained.toFixed(2)}</label>
        </div>
    );
}

export default UserInputs;