import React from 'react'
import Link from 'next/link';


const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center mt-12 md:mt-0">Steganography App</h1>
      <div className="space-y-4">
        <Link
          href="/embed"
          className="block w-64 text-center bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Embed Message
        </Link>
        <Link
          href="/extract"
          className="block w-64 text-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Extract Message
        </Link>
        <Link
          href="/visualize"
          className="block w-64 text-center bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition"
        >
          Visualize LSB
        </Link>
      </div>
      <p className='mt-8 text-red-600 text-center'>Note: PNGs works best on the application</p>
    </div>
  )
}

export default page