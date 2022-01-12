import Link from "next/link"
import Image from "next/image"
import PokemonCard from "@components/PokemonCard"

export default function Home({ pokemon }) {
  return (
    <div>
      <h1>Found {pokemon.count} results </h1>
      <PokemonCard />
      <section className="grid-container">
        {pokemon.results.map((pokeman, index) => {
          return (
            <div key={index} className="pokeman">
              <Link href={pokeman.name}>
                <a>
                  <h2>{pokeman.name}</h2>
                  <Image
                    src={pokeman.image}
                    alt={pokeman.name}
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                </a>
              </Link>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const pokemon = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100"
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
