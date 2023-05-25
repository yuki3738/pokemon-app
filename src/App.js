import React, { useEffect, useState } from "react";
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);

      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = (data) => {
    let _pokemonDate = Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
  };

  return (
    <div className="App">
      {loading ? (
        <h1>Now loading...</h1>
      ) : (
        <>
          <h1>ポケモンデータを取得しました</h1>
        </>
      )}
    </div>
  );
}

export default App;
