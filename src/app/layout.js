import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Steganography Webapp",
  description: "Medical Image Steganography using Randomized Multi-Bit Substitution Technique",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 ${inter.className}`}>
      <Navbar />
      <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
