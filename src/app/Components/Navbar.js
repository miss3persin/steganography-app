export default function Navbar() {
    return (
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Steganography App</h1>
        <nav className="mt-2">
          <a href="/embed" className="mr-4 hover:text-gray-400">Embed</a>
          <a href="/extract" className="mr-4 hover:text-gray-400">Extract</a>
          <a href="/visualize" className="hover:text-gray-400">Visualize LSB</a>
        </nav>
      </header>
    );
  }