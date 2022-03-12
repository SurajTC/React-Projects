import "@styles/globals.scss"
import { useState } from "react"

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <div className="container topbar">
        <h2>Pokédex</h2>
      </div>
      <div className={loading ? "loader loading" : "loader"}></div>
      <Component {...pageProps} toggleLoading={() => setLoading(!loading)} />
    </>
  )
}

export default App
