import React, { useEffect, useState } from "react";
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setpokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);

      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setpokemonData(_pokemonData);
  };

  console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1>Now loading...</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
