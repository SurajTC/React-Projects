export default function Pokeman({ pokeman }) {
  return (
    <div>
      <h1>Pokeman {pokeman}</h1>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { pokeman } = context.query
  return {
    props: { pokeman },
  }
}
