import PokemonCard from "@components/PokemonCard"

export default function Home({ pokemon }) {
  if (pokemon === undefined) {
    return (
      <div className="container">
        <h1>Falied to Load Data</h1>
      </div>
    )
  }
  return (
    <div className="container">
      <h1>Found {pokemon.count} results </h1>
      <section className="grid-container">
        {pokemon.results.map((pokemon, index) => {
          return <PokemonCard key={index} pokemon={pokemon} />
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
  // const pokemon = await response.json()
  // const images = await pokemon.results.map((pokeman) => {
  //   return (
  //     "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
  //     pokeman.url.split("/").slice(-2, -1)[0].concat(".png")
  //   )
  // })
  return {
    props: {
      pokemon: pokemon,
    },
  }
}
