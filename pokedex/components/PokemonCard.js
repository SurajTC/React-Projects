import Link from "next/link"
import styles from "@components/PokemonCard.module.scss"
import Image from "next/image"

export default function PokemonCard({
  pokemon: { name, image },
  toggleLoading,
}) {
  return (
    <Link href={"/" + name}>
      <a className={styles["pokemon--card"]} onClick={toggleLoading}>
        <h3 className={styles["pokemon--name"]}>{name}</h3>
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          layout="responsive"
          priority="true"
        />
        <h3 className={styles["pokemon--name"]}>Read More</h3>
      </a>
    </Link>
  )
}
