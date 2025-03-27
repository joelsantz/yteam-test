'use client';

import { Navbar, Footer } from "../components/ui";
import { PositionForm } from "../components/ui/Form/PositionForm";
import { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaClipboardCheck, FaUsers, FaComments, FaCode, FaCheckCircle, FaChartLine } from "react-icons/fa";

interface FormData {
  name: string;
  company: string;
  email: string;
  role: string;
  seniority: string;
  technologies: string[];
  budget: string;
  startDate: string;
  comments: string;
}

const steps = [
  { title: "Share Your Needs", icon: <FaClipboardCheck className="text-pink-400 text-3xl" /> },
  { title: "Perfect Match", icon: <FaUsers className="text-green-400 text-3xl" /> },
  { title: "Communication", icon: <FaComments className="text-purple-400 text-3xl" /> },
  { title: "Technical Skills", icon: <FaCode className="text-red-400 text-3xl" /> },
  { title: "Your Approval", icon: <FaCheckCircle className="text-yellow-400 text-3xl" /> },
  { title: "Ongoing Feedback", icon: <FaChartLine className="text-blue-400 text-3xl" /> },
];

export default function BuildYourTeam() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    role: "",
    seniority: "",
    technologies: [],
    budget: "",
    startDate: "",
    comments: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <PositionForm />
      <Footer />
    </>
  );
}
