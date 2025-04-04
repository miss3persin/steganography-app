import Link from "next/link";

export default function Navbar() {
    return (
      <header className="fixed top-0 w-full bg-gray-800 text-white p-4 z-50">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <Link href='/'><h1 className="text-2xl font-bold">Steganography App</h1></Link>
          <nav className="mt-3">
            <a href="/embed" className="mr-6 hover:text-gray-400">Embed</a>
            <a href="/extract" className="mr-6 hover:text-gray-400">Extract</a>
            <a href="/visualize" className="hover:text-gray-400">Visualize LSB</a>
          </nav>
        </div>
      </header>
    );
}