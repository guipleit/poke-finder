'use client'

import styles from './page.module.css'
import React, { useEffect, useState } from 'react'
import PokemonCard from '@/components/PokemonCard/PokemonCard'
import Footer from '@/components/Footer/Footer'
import { PossibleTypes, PokemonType } from '@/types/Pokemon'

export default function Home() {
  const [search, setSearch] = useState('');
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [itemsPerPageInput, setItemsPerPageInput] = useState('4');
  const [types, setTypes] = useState([]);
  const [searching, setSearching] = useState(false);

  const possibleTypes: PossibleTypes[]  = [
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dark',
    'Dragon',
    'Steel',
    'Fairy',
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPageInput(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch('');
    searchByName(search);
    console.log(search);
  };

  const handleItemsPerPageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItemsPerPage(parseInt(itemsPerPageInput));
  }

  useEffect(() => {
    getAllPokemon();
  }, []);

  const getAllPokemon = async () => {
    const response = await fetch('http://localhost:3004/pokemon');
    const data = await response.json();

    const noNameRepeats = data.filter((pokemon: PokemonType, index: number, self: any) =>
      index === self.findIndex((p: any) => (
        p.name === pokemon.name
      ))
    );

    setAllPokemon(noNameRepeats);
    setFilteredPokemon(noNameRepeats);
  }

  useEffect(() => {
    if (types.length === 0 && !searching) {
      setFilteredPokemon(allPokemon);
    }

    if (types.length > 0) {
      filterByType(types);
    }
  }, [types, allPokemon]);

  const searchByName = async (name: string) => {
    if (!name) return getAllPokemon();
    
    setCurrentPage(1);
    setTypes([]);
    setFilteredPokemon(allPokemon.filter((pokemon: PokemonType) => pokemon.name.toLowerCase().includes(name.toLowerCase())));
    setSearching(true);
  }

  const handleTypeClick = (type: PossibleTypes) => {
    let newTypes = [...types];

    if (!types.includes(type as never)) {
      if (newTypes.length < 2) {
        newTypes.push(type as never);
      } else {
        newTypes.shift();
        newTypes.push(type as never);
      }
    } else {
      newTypes = types.filter(t => t !== type);
    }

    setTypes(newTypes as never);
    setSearching(false);
  }


  const filterByType = (types: any[]) => {
    const currentFilters = allPokemon.filter((poke: PokemonType) => {
      if (types.length === 2) {
        return (poke.type1 === types[0] && poke.type2 === types[1]) ||
          (poke.type1 === types[1] && poke.type2 === types[0]);
      } else if (types.length === 1) {
        return poke.type1 === types[0] || poke.type2 === types[0];
      }
      return false;
    });

    setCurrentPage(1);
    setFilteredPokemon(currentFilters);
  }



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

  console.log(filteredPokemon);
  console.log(searching);
  


  const typesButtons = possibleTypes.map((type: string) => (
    <button
      key={type}
      className={`${styles.typeButton} ${types.includes(type as never) ? styles.clicked : ''}`}
      onClick={() => handleTypeClick(type as never)}
    >
      {type}
    </button>
  ));


  

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Pokemon Finder</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input onChange={handleChange} name='search' className={styles.searchBox} type='text' placeholder='Search' value={search} />
        <button className={styles.searchButton} type='submit'>
          Search
        </button>
      </form>

      <div className={styles.typesContainer}>
        {typesButtons}
      </div>

      <PokemonCard pokemon={currentItems} />

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage(prev => Math.min(Math.ceil(allPokemon.length / itemsPerPage), prev + 1))}
          disabled={currentPage === Math.ceil(allPokemon.length / itemsPerPage)}
        >
          Next
        </button>
      </div>

      <form onSubmit={handleItemsPerPageSubmit} className={styles.setItemsPerPage}>
        <p># of Pokemon per page</p>
        <input onChange={handleItemsPerPageChange} name='itemsPerPage' className={styles.searchBox} type='number' placeholder='Items per page' value={itemsPerPageInput} />
        <button className={styles.submitItemsButton} type='submit'>
          Set
        </button>
      </form>

      <Footer />
    </main>
  );
}
