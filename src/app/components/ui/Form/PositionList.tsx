"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaEdit, FaFileAlt } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { PositionProps } from "../../../utils/types";
import Lottie from "lottie-react";

interface PositionListProps {
  positions: PositionProps[];
  removePosition: (index: number) => void;
  editPosition: (index: number) => void;
  onContinue: () => void;
  onEdit: () => void;
  editingIndex: number | null; // Recibimos editingIndex como prop
}

const PositionList: React.FC<PositionListProps> = ({ positions, removePosition, editPosition, onContinue, onEdit, editingIndex }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const [disabled, setDisable] = useState(false);

  useEffect(() => {
    if (listRef.current) {
      setHasScroll(listRef.current.scrollHeight > listRef.current.clientHeight);
    }
  }, [positions]);

  useEffect(() => {
    fetch("/document.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie animation:", error));
  }, []);

  const hasInvalidUpload = positions.some(
    (pos) => pos.entryType === "upload" && !(pos.file instanceof File)
  );

  return (
    <div className="bg-[#121212] shadow-lg shadow-[#0C0C0C] p-6 rounded-xl flex flex-col min-h-[250px] max-h-[650px] border border-gray-700">
      {/* Título fijo */}
      <div className="sticky top-0 bg-[#121212] z-10 pb-4">
        <h3 className="font-title text-center text-lg font-extrabold text-white">
          Positions Added
        </h3>
      </div>

      {/* Contenedor scrollable con padding dinámico */}
      <div
        ref={listRef}
        className={`flex-grow overflow-y-auto max-h-[500px] custom-scroll-skill-list ${
          hasScroll ? "pr-2" : ""
        }`}
      >
        {positions.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-4">
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-48 h-48"
            />
            <p className="font-sans text-gray-500 mt-2">
              No positions added yet.
            </p>
          </div>
        ) : (
          (console.log(positions),
          positions.map((pos, index) =>
            pos.entryType === "manual" ? (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-[#1E1E1E] rounded-lg mb-3 border border-gray-700 shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-gray-300 font-sans text-sm">
                  <p className="font-bold text-white">{pos.title}</p>
                  <p>
                    <span className="font-semibold text-gray-400">
                      Seniority:
                    </span>{" "}
                    {pos.seniority}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-400">Skills:</span>{" "}
                    {pos.skills.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-400">
                      Budget (USD):
                    </span>{" "}
                    <span className="text-green-400">{pos.budget} Monthly</span>
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <FaEdit
                    className="cursor-pointer text-gray-400 hover:text-blue-400 transition-all"
                    onClick={() => {
                      editPosition(index);
                      onEdit();
                    }}
                  />
                  <FaTimes
                    className="cursor-pointer text-gray-400 hover:text-red-400 transition-all"
                    onClick={() => removePosition(index)}
                  />
                </div>
              </div>
            ) : (
              // Render para entryType "upload": solo título y presupuesto.
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-[#1E1E1E] rounded-lg mb-3 border border-gray-700 shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-gray-300 font-sans text-sm">
                  <p className="font-bold text-white">
                    {pos.fileName} <FaFileAlt className="inline-block mr-1" />
                  </p>
                  <p>
                    <span className="font-semibold text-gray-400">Role:</span>{" "}
                    {pos.title}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-400">
                      Budget (USD):
                    </span>{" "}
                    <span className="text-green-400">{pos.budget} Monthly</span>
                  </p>
                  {!(pos.file instanceof File) && pos.fileName && (
                    <p className="mt-2">
                      <span className="text-xs text-white italic">
                        The file <strong>{pos.fileName}</strong> is no longer
                        available. Please upload it again.
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center gap-3">
                  <FaEdit
                    className="cursor-pointer text-gray-400 hover:text-blue-400 transition-all"
                    onClick={() => {
                      editPosition(index);
                      onEdit();
                    }}
                  />
                  <FaTimes
                    className="cursor-pointer text-gray-400 hover:text-red-400 transition-all"
                    onClick={() => removePosition(index)}
                  />
                </div>
              </div>
            )
          ))
        )}
      </div>

      {/* Botón "Continue" */}
      <div className="mt-4">
        <button
          onClick={onContinue}
          className={`font-sans mt-6 w-full px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
            positions.length > 0 && editingIndex === null && !hasInvalidUpload
              ? "bg-gray-100 text-black hover:bg-gray-300"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
          disabled={positions.length === 0 || editingIndex !== null || hasInvalidUpload}
        >
          Continue <HiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PositionList;
