import PokemonDetails from "@components/PokemonDetails"
import Image from "next/image"
import { useEffect } from "react"

export default function Pokemon({ response, toggleLoading }) {
  useEffect(() => toggleLoading(), [response])

  return (
    <div className="container">
      <PokemonDetails response={response} toggleLoading={toggleLoading} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { pokemon } = context.query
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => res.json())
    .then((data) => {
      const stats = {
        name: data.name,
        abilities: data.abilities.map((item) => {
          return item.ability.name
        }),
        experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        sprite: data.sprites.front_default,
      }
      return stats
    })

  return {
    props: { response },
  }
}
