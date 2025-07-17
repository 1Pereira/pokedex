import { useEffect, useState } from "react"

async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
  const data = await response.json()
  return data.results
}

function App() {
  const [pokemon, setPokemon] = useState([])
  const [pokemonShown, setPokemonShown] = useState(null)

  useEffect(() => {
    fetchPokemon().then(resuls => {
      console.log("state change")
      console.log(resuls)
      setPokemon(resuls)
    })
  }, [])

  const showDetails = async (url) => {
    const data = await fetch(url).then(res => res.json())
    console.log(data)
    setPokemonShown(data)
  }

  return (
    <div className="app">
      <div>
        <h2>Pokémon</h2>
        <ul className="pokemon">
          {pokemon.map(mon => (
            <li key={mon.name}
            className={pokemonShown?.name === mon.name ? 'active' : ''}
            >
              <span>{mon.name}</span>
              <button onClick={() => showDetails(mon.url)}>
                Ver detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
      {pokemonShown && (
        <div className="pokemon-details">
          <h2>{pokemonShown.name}</h2>
          <img
            src={pokemonShown.sprites.front_default}
            alt=""
          />
          <div className="stat">
            <b>Tipo: </b>
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name} className={`type-badge type-${type.name}`}>
                {type.name} 
              </span>
            ))}
          </div>
          <div className="stat">
            <b>Altura: </b>{pokemonShown.height / 10} m
          </div>
          <div className="stat">
            <b>Peso: </b>{pokemonShown.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Atributos</b>
            <ul className="stats-list">
              {pokemonShown.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  <span className="stat-name">{stat.name}</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-bar-inner" 
                      style={{ width: `${Math.min((base_stat / 120) * 100, 100)}%` }}
                    >
                      {base_stat}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Habilidades</b>
            <ul className="abilities-list">
              {pokemonShown.abilities.map(({ ability, is_hidden }) => ( //
                <li key={ability.name}>
                  {ability.name}
                  {is_hidden && " (secreta)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App