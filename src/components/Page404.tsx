import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <>
      <main className="min-h-[1200px] relative isolate min-h-full">
      <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-indigo-500 sm:text-9xl">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{"Сторінку не знайдено"}</h1>
          <p className="mt-4 text-base  sm:mt-6">Помилка</p>
          <div className="mt-10 flex justify-center">
            <Link to={"/"} className="text-sm font-semibold leading-7 hover:text-indigo-300">
                <span aria-hidden="true">&larr;</span> {"Повернутися на головну сторінку"}
            </Link>
          </div>
        </div>
        </div>
        </div>
      </main>
    </>
  )
}
