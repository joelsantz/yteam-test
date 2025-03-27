import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export function CTA() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col bg-gradient-to-b from-[#0C0C0C] to-[#20417B] text-white overflow-hidden">
      {/* Contenido centrado */}
      <div className="z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        {/* Texto principal con ancho limitado para dividir en dos líneas */}
        <h2 className="font-title text-5xl font-extrabold md:text-6xl max-w-3xl">
          Build{" "}
          <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            your dream team
          </span>{" "}
          today. Let’s get started!
        </h2>

        {/* Botón CTA */}
        <div className="mt-12">
          <Link href="/build-your-team">
            <button className="font-sans rounded-lg bg-white px-6 py-3 text-base font-regular text-black hover:bg-gray-200 transition-colors shadow-md flex items-center gap-2">
              Build Your Team <IoIosArrowForward className="text-lg" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;