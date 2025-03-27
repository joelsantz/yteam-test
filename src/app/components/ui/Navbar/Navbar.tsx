'use client';

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { LiaDownloadSolid } from "react-icons/lia";




export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-[var(--background)] text-white z-50 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/logo.svg"
              alt="YTeam Logo"
              className="h-8 w-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Menú de navegación para escritorio */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="#services" className="hover:text-gray-300 transition-colors">
              Services
            </Link>
          </li>
          <li>
            <Link href="#process" className="hover:text-gray-300 transition-colors">
              Our Process
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:text-gray-300 transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link href="#handbook" className="hover:text-gray-300 transition-colors flex items-center">
              Handbook <LiaDownloadSolid className="ml-2" />
            </Link>
          </li>
        </ul>

        {/* Botón CTA */}
        <Link
          href="/build-your-team"
          className="hidden md:block font-sans rounded-lg bg-white px-5 py-2 text-sm font-regular text-black transition-colors hover:bg-gray-200 shadow-md"
        >
          Build Your Team
        </Link>

        {/* Menú Hamburguesa - Solo en móviles */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      <div
        className={`absolute top-full left-0 w-full bg-[var(--background)] text-white transition-all duration-300 ease-in-out ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6 py-4">
          <li>
            <Link href="#services" className="block hover:text-gray-300 transition-colors">
              Services
            </Link>
          </li>
          <li>
            <Link href="#process" className="block hover:text-gray-300 transition-colors">
              Our Process
            </Link>
          </li>
          <li>
            <Link href="#about" className="block hover:text-gray-300 transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link href="#handbook" className="block hover:text-gray-300 transition-colors flex items-center">
              Handbook <LiaDownloadSolid className="ml-2" />
            </Link>
          </li>
          <li>
            <Link
              href="/build-your-team"
              className="block font-sans rounded-lg bg-white px-5 py-2 text-sm font-regular text-black transition-colors hover:bg-gray-200 shadow-md"
            >
              Build Your Team
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
