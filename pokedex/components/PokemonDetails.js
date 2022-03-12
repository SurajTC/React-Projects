import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import styles from "@components/PokemonDetails.module.scss"

export default function PokemonDetails({ response, toggleLoading }) {
  const router = useRouter()
  return (
    <div className={styles["pokemon"]}>
      <h1 className={styles["pokemon--title"]}>{response.name}</h1>
      <table className={styles["test"]}>
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
          toggleLoading()
        }}
      >
        Back
      </button>
    </div>
  )
}
