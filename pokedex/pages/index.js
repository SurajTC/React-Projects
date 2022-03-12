import PokemonCard from "@components/PokemonCard"
import { useEffect } from "react"

export default function Home({ pokemon, toggleLoading }) {
  useEffect(() => {
    toggleLoading()
  }, [])

  if (pokemon === undefined) {
    return (
      <div className="container">
        <h2>Falied to Load Data</h2>
      </div>
    )
  }
  return (
    <div className="container">
      <h2>Found {pokemon.count} results </h2>
      <section className="grid-container">
        {pokemon.results.map((pokemon, index) => {
          return (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              toggleLoading={toggleLoading}
            />
          )
        })}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const pokemon = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  )
    .then((res) => res.json())
    .then((data) => {
      data.results = data.results.map((entry) => {
        entry.image =
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
          entry.url.split("/").slice(-2, -1)[0].concat(".png")
        return entry
      })
      return data
    })
  return {
    props: {
      pokemon: pokemon,
    },
  }
}
