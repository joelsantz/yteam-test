import { JSX } from "react";
import { FaClipboardCheck, FaUsers, FaComments, FaCode, FaCheckCircle, FaChartLine } from "react-icons/fa";

interface Step {
  title: string;
  description: string;
  colorClasses: string; // Clases Tailwind para el degradado
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    title: "Share Your Needs",
    description: "Tell us about the position you need to fill, your budget, and the ideal start date for your new team member.",
    colorClasses: "text-pink-400",
    icon: <FaClipboardCheck className="text-pink-400 text-3xl" />,
  },
  {
    title: "Perfect Match",
    description: "We carefully select the best-prepared Latin American talent that fits your specific needs.",
    colorClasses: "text-green-400",
    icon: <FaUsers className="text-green-400 text-3xl" />,
  },
  {
    title: "Communication",
    description: "Communication is key—we screen candidates for their English proficiency and soft skills to ensure seamless collaboration.",
    colorClasses: "text-purple-400",
    icon: <FaComments className="text-purple-400 text-3xl" />,
  },
  {
    title: "Technical Skills",
    description: "Technical expertise & problem-solving—we conduct technical interviews and coding tests to validate their skills.",
    colorClasses: "text-red-400",
    icon: <FaCode className="text-red-400 text-3xl" />,
  },
  {
    title: "Your Approval",
    description: "We present the candidate along with a detailed report highlighting their soft skills and technical abilities, so you can approve and onboard them quickly.",
    colorClasses: "text-yellow-400",
    icon: <FaCheckCircle className="text-yellow-400 text-3xl" />,
  },
  {
    title: "Ongoing Feedback",
    description: "We ensure that the talent meets your expectations by conducting regular follow-ups and performance evaluations.",
    colorClasses: "text-blue-400",
    icon: <FaChartLine className="text-blue-400 text-3xl" />,
  },
];

export function StepsSection() {
  return (
    <section className="bg-[#0C0C0C] text-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Encabezado con más espacio entre título y párrafo */}
        <h2 className="font-title text-4xl font-extrabold text-white text-center">Step by Step</h2>
        <p className="font-sans mt-6 text-lg md:text-xl text-white max-w-4xl mx-auto text-center">
          Our process is fully optimized through a combination of <strong>AI</strong> and <strong>human</strong> expertise to help you find the perfect match 
          <strong> within two weeks</strong>, ensuring efficiency without compromising quality.
        </p>

        {/* Contenedor de tarjetas con animaciones más smooth */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start p-6 rounded-2xl shadow-lg bg-[#1E1E1E] border border-gray-700
                transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl ${step.colorClasses} text-left`}
            >
              {/* Icono alineado a la izquierda */}
              <div className="p-3 rounded-xl bg-[#2A2A2A] shadow-sm self-start">
                {step.icon}
              </div>

              {/* Título del Step alineado a la izquierda */}
              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
              
              {/* Descripción alineada a la izquierda */}
              <p className="text-gray-300 mt-2 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StepsSection;