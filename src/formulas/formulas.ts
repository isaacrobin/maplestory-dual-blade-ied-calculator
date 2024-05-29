export const calculate_effective_ied = (visual_ied: number, modifier: number) => {
    console.log(visual_ied, 'visual ied');
    return visual_ied + modifier * (1 - visual_ied);
}

// compute the expression 1 - (1 - x1) * (1 - x2) * ... * (1 - xn)
export const calculate_total_ied_gain_from_multiple_sources = (ied_bonuses: number[]) => {
    return 1 - ied_bonuses.reduce((computed_ied_bonus, ied_bonus) => {
        return computed_ied_bonus * (1 - ied_bonus);
    }, 1);
}

export const calculate_pdr_penalty = (effective_ied: number, enemy_pdr: number) => {
    const penalty = enemy_pdr - (effective_ied * enemy_pdr);
    return penalty;
}

export const calculate_final_damage_gain = (current_effective_ied: number, enemy_pdr: number, ied_bonuses: number[]) => {
    const total_ied_bonus = calculate_total_ied_gain_from_multiple_sources(ied_bonuses);
    const new_effective_ied = calculate_effective_ied(current_effective_ied, total_ied_bonus);
    const penalty_differential = calculate_pdr_penalty(current_effective_ied, enemy_pdr) - calculate_pdr_penalty(new_effective_ied, enemy_pdr);
    return penalty_differential;
}