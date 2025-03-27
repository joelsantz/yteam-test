import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col bg-[#000] text-white overflow-hidden">
      {/* Video de fondo más pequeño */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-0 w-full max-h-[90vh] transform -translate-y-1/2 object-contain"
      >
        <source src="/world.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Capa de oscurecimiento */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        {/* Título principal */}
        <h1 className="font-title mb-6 text-5xl font-extrabold md:text-6xl lg:text-7xl">
          We Know Technology,
          <br />
          &amp; We Know{" "}
          <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            People
          </span>
        </h1>

        {/* Subtítulo con emoji (🌎) */}
        <p className="font-sans mb-6 text-lg md:text-xl">
          🌎 Hire remote top{" "}
          <strong className="text-blue-200">Latin American</strong> tech talent,
          matched to your goals, budget, and time zone seamlessly.
        </p>

        {/* CTA Principal */}
        <Link href="/build-your-team">
          <button className="font-sans rounded-lg bg-white px-6 py-3 text-base font-regular text-black hover:bg-gray-200 transition-colors shadow-md">
            Build Your Team
          </button>
        </Link>
      </div>

      {/* Breve descripción al final */}
      <p className="relative z-10 font-sans mx-auto mb-6 max-w-xl px-4 text-center text-xs text-gray-200 md:text-sm">
        We specialize in tech staff augmentation, connecting top tech talent
        with U.S 🇺🇸 companies.
      </p>
    </section>
  );
}

export default Hero;