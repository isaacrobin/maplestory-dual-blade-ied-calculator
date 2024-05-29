export const calculateEffectiveIed = (visual_ied: number, modifier: number) => {
    return visual_ied + modifier * (1 - visual_ied);
}

// compute the expression 1 - (1 - x1) * (1 - x2) * ... * (1 - xn)
export const calculateTotalIedGainFromMultipleSources = (ied_bonuses: number[]) => {
    return 1 - ied_bonuses.reduce((computed_ied_bonus, ied_bonus) => {
        return computed_ied_bonus * (1 - ied_bonus);
    }, 1);
}

export const calculatePdrPenalty = (effective_ied: number, enemy_pdr: number) => {
    const penalty = enemy_pdr - (effective_ied * enemy_pdr);
    return penalty;
}

export const calculateFinalDamageGain = (current_effective_ied: number, enemy_pdr: number, ied_bonuses: number[]) => {
    const total_ied_bonus = calculateTotalIedGainFromMultipleSources(ied_bonuses);
    const new_effective_ied = calculateEffectiveIed(current_effective_ied, total_ied_bonus);
    const penalty_differential = calculatePdrPenalty(current_effective_ied, enemy_pdr) - calculatePdrPenalty(new_effective_ied, enemy_pdr);
    return penalty_differential;
}