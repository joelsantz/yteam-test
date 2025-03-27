import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { rolesTechsMap } from "../../../utils/techs-map";
import { PositionProps } from "../../../utils/types";

interface TechSkillsSelectorProps {
  form: PositionProps;
  setForm: (updatedForm: PositionProps) => void;
}

const TechSkillsSelector: React.FC<TechSkillsSelectorProps> = ({ form, setForm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTechs =
    rolesTechsMap[form.title]?.filter((tech: string) =>
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleSelectSkill = (tech: string) => {
    if (!form.skills.includes(tech)) {
      setForm({ ...form, skills: [...form.skills, tech] });
    } else {
      setForm({ ...form, skills: form.skills.filter((s) => s !== tech) });
    }
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleRemoveSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="md:col-span-2 relative" ref={dropdownRef}>
      <label className="font-sans text-sm text-gray-400 mb-1 block">
        Select required technical skills
      </label>

      <div className="shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full">
        <input
          type="text"
          placeholder="Type to search and select..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="font-sans bg-[#121212] text-white px-4 py-3 rounded-lg w-full outline-none"
        />
      </div>

      {showDropdown && filteredTechs.length > 0 && (
        <ul className="font-sans absolute top-full left-0 w-full border border-gray-700 bg-[#121212] text-white rounded-lg shadow-md mt-1 max-h-40 overflow-y-auto z-50 custom-scroll-skill-list">
          {filteredTechs.map((tech, index) => (
            <li
              key={index}
              className="px-4 py-2 flex justify-between items-center hover:bg-[#1E1E1E] cursor-pointer"
              onClick={() => handleSelectSkill(tech)}
            >
              {tech}
              {form.skills.includes(tech) && <FaCheck className="text-gray-400 text-sm ml-2" />}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {form.skills.map((skill, index) => (
          <span
            key={index}
            className="font-sans bg-[#FCFCFC] text-black px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {skill}
            <FaTimes
              className="cursor-pointer text-red-400"
              onClick={() => handleRemoveSkill(skill)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechSkillsSelector;



