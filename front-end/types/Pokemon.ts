export type PossibleTypes = "Normal" | "Fire" | "Water" | "Grass" | "Electric" | "Ice" | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dark" | "Dragon" | "Steel" | "Fairy";



export type PokemonType = {
    id: number;
    name: string;
    sprite: string;
    type1: PossibleTypes;
    type2?: PossibleTypes;
};