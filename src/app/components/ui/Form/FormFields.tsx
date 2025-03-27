import React, { useState, useEffect } from "react";
import { rolesTechsMap } from "../../../utils/techs-map";
import TechSkillsSelector from "./TechSkillsSelector";
import { PositionProps, MAX_CHARACTERS_TEXT_AREA } from "../../../utils/types";

interface FormFieldsProps {
  form: PositionProps;
  setForm: (updatedForm: PositionProps) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({ form, setForm }) => {
  const [error, setError] = useState<string>("");

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, title: e.target.value, skills: [] });
  };

  const handleSeniorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, seniority: e.target.value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (form.budget === "$0") {
      setError("Budget cannot be zero.");
    } else {
      setError("");
    }
  }, [form.budget]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* 📌 Role Selector */}
      <div className="flex flex-col">
        <label className="font-sans text-sm text-gray-400 mb-1">What role are you hiring for?</label>
        <select
          name="title"
          value={form.title}
          onChange={handleRoleChange}
          className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full"
        >
          <option value="">Select a role</option>
          {Object.keys(rolesTechsMap).map((role) => (
            <option key={role} value={role} className="bg-black font-sans">
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* 📌 Seniority Selector */}
      <div className="flex flex-col">
        <label className="font-sans text-sm text-gray-400 mb-1">Select experience level</label>
        <select
          name="seniority"
          value={form.seniority}
          onChange={handleSeniorityChange}
          className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full"
        >
          <option value="">Select seniority</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
          <option value="Tech Lead">Tech Lead</option>
          <option value="Staff">Staff</option>
          <option value="Principal">Principal</option>
          <option value="Architect">Architect</option>
        </select>
      </div>

      {/* 📌 Tech Skills Selector */}
      <TechSkillsSelector form={form} setForm={setForm} />

      {/* 📌 Additional Information */}
      <div className="md:col-span-2">
        <label className="font-sans text-sm text-gray-400 mb-1">Any additional requirements? (Optional)</label>
        <textarea
          name="additionalInfo"
          placeholder="Ecommerce experience, CMS..."
          value={form.additionalInfo}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARACTERS_TEXT_AREA) {
              handleChange(e);
            }
          }}
          className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full"
        />
        <p className={`text-right text-sm mt-1 ${form.additionalInfo.length >= MAX_CHARACTERS_TEXT_AREA ? "text-red-400" : "text-gray-400"}`}>
          {MAX_CHARACTERS_TEXT_AREA - form.additionalInfo.length} characters remaining
        </p>
      </div>

      {/* 📌 Budget Input */}
      <div className="flex flex-col">
        <label className="font-sans text-sm text-gray-400 mb-1">Monthly Budget (USD)</label>
        <div className="relative">
          <input
            type="text"
            name="budget"
            placeholder="$0"
            value={form.budget}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, ""); 
              const formattedValue = rawValue ? `$${Number(rawValue).toLocaleString()}` : ""; 
              setForm({ ...form, budget: formattedValue });
            }}
            className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full pr-16"
          />
          <span className="font-sans absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-sm font-bold">Monthly</span>
        </div>
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default FormFields;
