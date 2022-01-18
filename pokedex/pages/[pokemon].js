import Image from "next/image"
import { useRouter } from "next/router"

export default function Pokeman({ response }) {
  const router = useRouter()

  return (
    <div className="container">
      <h1>Pokemon {response.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{response.name}</td>
          </tr>
          <tr>
            <td>Experience</td>
            <td>:</td>
            <td>{response.experience}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>:</td>
            <td>{response.height}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>:</td>
            <td>{response.weight}</td>
          </tr>
        </tbody>
      </table>
      <h2>Abilities</h2>
      <div>
        {response.abilities.map((ability, index) => {
          return <span key={index}>{ability}</span>
        })}
      </div>
      <Image
        src={response.sprite}
        alt={response.name}
        width={100}
        height={100}
        layout="intrinsic"
      />
      <button
        onClick={() => {
          router.back()
        }}
      >
        Back
      </button>
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
