import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sm font-medium text-cyan-400 tracking-wide uppercase">Eroare 404</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Pagina nu există</h1>
        <p className="mt-4 text-white/60">
          Adresa accesată nu corespunde niciunui conținut public. Dacă ai ajuns aici dintr-un
          link vechi, instrumentul sau pagina respectivă a fost retrasă.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-cyan-400"
          >
            Înapoi la prima pagină
          </Link>
          <Link to="/contact" className="text-sm text-white/70 hover:text-white">
            Contactează-ne
          </Link>
        </div>
      </div>
    </main>
  )
}
