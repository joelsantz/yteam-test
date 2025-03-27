import React, { useState } from "react";
import Button from "./Button";
import { PositionProps } from "@/app/utils/types";

interface ContactFormProps {
  positions: PositionProps[];
}

const ContactForm: React.FC<ContactFormProps> = ({positions}) => {
  const [contact, setContact] = useState({
    fullName: "",
    company: "",
    email: "",
    projectDetails: "",
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setContact({ ...contact, termsAccepted: !contact.termsAccepted });
  };

  const handleSubmit = async () => {
    console.log(positions, "positions");
    // try {
    //   const res = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       contact,
    //       positions,
    //     }),
    //   });
  
    //   if (!res.ok) throw new Error("Failed to send email");
  
    //   alert("Email sent successfully!");
    // } catch (err) {
    //   console.error(err);
    //   alert("There was an error sending the email.");
    // }
  };

  return (
    <div>
      {/* 📌 Tab Estética */}
      <div className="flex border-b border-gray-700 mb-6">
        <button className="font-title px-4 py-2 text-sm font-semibold border-b-2 border-white text-white cursor-default">
          Contact Information
        </button>
      </div>

      {/* 📌 Formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <label className="font-sans text-sm text-gray-400 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={contact.fullName}
            onChange={handleChange}
            className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full"
          />
        </div>

        {/* Company */}
        <div className="flex flex-col">
          <label className="font-sans text-sm text-gray-400 mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={contact.company}
            onChange={handleChange}
            className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full"
          />
        </div>

        {/* Work Email */}
        <div className="md:col-span-2 flex flex-col">
          <label className="font-sans text-sm text-gray-400 mb-1">Work Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full"
          />
        </div>

        {/* Project Details */}
        <div className="md:col-span-2 flex flex-col">
          <label className="font-sans text-sm text-gray-400 mb-1">
            Tell us more about the project (optional)
          </label>
          <textarea
            name="projectDetails"
            value={contact.projectDetails}
            onChange={handleChange}
            className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full"
          />
        </div>

        {/* Checkbox y texto */}
        <div className="md:col-span-2 flex flex-col gap-2 font-sans">
          <p className="font-sans text-sm text-white">
            Remember, <span className="font-extrabold">you only start paying once</span> you decide to bring one of our talents onto your team. No upfront costs or commitments.
          </p>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={contact.termsAccepted} onChange={handleCheckboxChange} />
            <label className="font-sans text-sm text-white">
              Yes, I agree to the{" "}
              <a href="#" className="text-blue-400">Terms and Conditions</a> and
              <a href="#" className="text-blue-400"> Privacy Policy</a>.
            </label>
          </div>
        </div>

        {/* Botón de Enviar */}
        <div className="md:col-span-2">
          <Button
            onClick={handleSubmit}
            disabled={
              !contact.fullName ||
              !contact.company ||
              !contact.email ||
              !contact.termsAccepted
            }
            label="Submit"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;



