export function ServicesTabs() {
  return (
    <section className="font-title font-bold bg-[#1E1E1E] text-gray-400 py-8">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 max-w-7xl items-center justify-center gap-y-4 md:gap-8 px-4">
        <span className="text-xl sm:text-2xl transition-all duration-500 ease-in-out bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-gray-400 hover:text-transparent text-center md:text-left">
          AI &amp; Machine Learning
        </span>
        <span className="text-xl sm:text-2xl transition-all duration-500 ease-in-out bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-gray-400 hover:text-transparent text-center md:text-left">
          Software Development
        </span>
        <span className="text-xl sm:text-2xl transition-all duration-500 ease-in-out bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-gray-400 hover:text-transparent text-center md:text-left">
          Data Engineering &amp; Analytics
        </span>
      </div>
    </section>
  );
}

export default ServicesTabs;

  