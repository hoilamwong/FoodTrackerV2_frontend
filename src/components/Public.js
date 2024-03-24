import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="bg-gradient-to-br from-blue-400 to-emerald-700 h-screen">
      <header>
        <Link to="/login">Login</Link>
      </header>
      <main>
        public main... description.. images
      </main>
    </section>

  )

  return content
}

export default Public