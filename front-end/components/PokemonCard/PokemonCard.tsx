import React, { Component } from 'react';
import { PokemonType } from '@/types/Pokemon';

import styles from './PokemonCard.module.css'

export default function PokemonCard({ pokemon }: { pokemon: PokemonType[] }) {
    const possibleTypes = {
        'Normal': styles.normal,
        'Fire': styles.fire,
        'Water': styles.water,
        'Grass': styles.grass,
        'Electric': styles.electric,
        'Ice': styles.ice,
        'Fighting': styles.fighting,
        'Poison': styles.poison,
        'Ground': styles.ground,
        'Flying': styles.flying,
        'Psychic': styles.psychic,
        'Bug': styles.bug,
        'Rock': styles.rock,
        'Ghost': styles.ghost,
        'Dark': styles.dark,
        'Dragon': styles.dragon,
        'Steel': styles.steel,
        'Fairy': styles.fairy,
    }

    return (
        <div>
            {pokemon.map((poke: PokemonType) => (
                <div key={poke.id}>
                    <div className={ styles.card }>
                        <p>ID {`${poke.id}`}</p>
                        <h1 className={ styles.title }>{poke.name}</h1>
                        <img width='4rem'  className={ styles.sprite } src={poke.sprite} alt={poke.name} />
                        <div className={ styles.typesContainer }> 
                        <p className={`${styles.typeContainer} ${possibleTypes[poke.type1]}` }>{ poke.type1 }</p>
                        { poke.type2 ? <p className={`${styles.typeContainer} ${possibleTypes[poke.type2]}` }>{ poke.type2 }</p> : null }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}