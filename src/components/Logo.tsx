import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

export default function Logo() {
    return (
        <>
            <header
                className="relative bg-white-container-header bg-gray-100 flex justify-center items-center text-center hover:text-indigo-500"
            >
                <Link to="/" className="relative z-10">
                    <h3 className="text-neon text-white text-9xl mb-1 mt-10 hover:text-indigo-300">RENOME LAB</h3>
                    <h1 className="text-neon text-white text-sx mb-10 hover:text-indigo-100">IT IS FOR YOU</h1>
                </Link>
            </header>
        </>
    )
}