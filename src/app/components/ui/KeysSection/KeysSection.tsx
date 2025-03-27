'use client';


import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const keyPoints = [
  {
    title: "Top LaTam Talent",
    description: "We specialize in connecting U.S. companies with the best professionals in Latin America.",
  },
  {
    title: "Cost Savings",
    description: "Hiring remote talent can save you around 45% compared to local hires without sacrificing quality.",
  },
  {
    title: "Time Zone Alignment",
    description: "Our talent operates within U.S. time zones, ensuring seamless communication and real-time collaboration.",
  },
  {
    title: "Transparent Process",
    description: "No hidden fees, no surprises. You’ll always know exactly what to expect at every step of the process.",
  },
  {
    title: "Pay Only When You Hire",
    description: "You only start paying once you decide to bring one of our talents onto your team. No upfront costs or commitments.",
  },
];

export function KeysSection() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie-laptop.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie animation:", error));
  }, []);

  return (
    <section className="bg-[#0C0C0C] text-white py-16">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Lottie Animation (carga dinámica) */}
        <div className="relative w-full flex justify-center items-center">
          {animationData && <Lottie animationData={animationData} loop autoplay className="w-4/5 h-auto" />}
        </div>

        {/* Contenido */}
        <div>
          <h2 className="font-title text-4xl font-extrabold text-white mb-8">Why Choose Us?</h2>
          <ul className="space-y-6">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <img src="/eclipse.svg" alt="Bullet point" className="w-5 h-5 self-center mt-2" />
                <div>
                  <h3 className="font-title text-lg font-semibold">{point.title}</h3>
                  <p className="font-sans text-gray-400 text-sm">{point.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default KeysSection;

