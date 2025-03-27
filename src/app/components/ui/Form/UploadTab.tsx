"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { FaCloudUploadAlt, FaFileAlt, FaTimes } from "react-icons/fa";

export interface UploadTabHandle {
  clearState: () => void;
}

interface UploadTabProps {
  form: {
    title: string;
    budget: string;
    fileName?: string;
    file?: File;
  };
  onUploadChange: (newData: {
    title: string;
    budget: string;
    fileName?: string;
    file?: File;
  }) => void;
}

const UploadTab = forwardRef<UploadTabHandle, UploadTabProps>(({ onUploadChange, form }, ref) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [positionTitle, setPositionTitle] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [dragCounter, setDragCounter] = useState<number>(0);
  
  useEffect(() => {
    // Solo actualizar si se está editando
    setSelectedFile(form.file || null);
    setBudget(form.budget || "");
    setPositionTitle(form.title || "");
  }, [form]);

  const processFile = async (file: File) => {
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setSelectedFile(null);
      setErrorMessage("Only PDF, DOC, and DOCX files are allowed.");
      return;
    }

    setSelectedFile(file);

    const suggestedTitle = file.name.replace(/\.[^.]+$/, "");
    setPositionTitle(suggestedTitle);

    // Actualizamos el formulario en el padre
    onUploadChange({
      title: suggestedTitle,
      budget,
      fileName: file.name,
      file,
    });
  };
  

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setErrorMessage("");
    if (file) await processFile(file);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    setDragCounter(0);
    const file = event.dataTransfer.files[0];
    if (file) await processFile(file);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragCounter(prev => prev + 1);
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragCounter(prev => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        setDragActive(false);
        return 0;
      }
      return newCount;
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPositionTitle(newTitle);
    onUploadChange({
      title: newTitle,
      budget,
      fileName: selectedFile?.name,
      file: selectedFile || undefined,
    });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue ? `$${Number(rawValue).toLocaleString()}` : "";
    setBudget(formattedValue);
    onUploadChange({
      title: positionTitle,
      budget: formattedValue,
      fileName: selectedFile?.name,
      file: selectedFile || undefined,
    });
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    onUploadChange({ title: positionTitle, budget, fileName:"", file: undefined });
  };

  useImperativeHandle(ref, () => ({
    clearState: clearSelectedFile,
  }));

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`w-full flex flex-col items-center p-12 border-2 border-dashed border-gray-500 rounded-lg ${
          dragActive ? "bg-gray-800" : "bg-[#121212]"
        } text-white transition-colors`}
      >
        <label className="cursor-pointer flex flex-col items-center w-full">
          <FaCloudUploadAlt className="text-5xl text-white mb-2" />
          <span className="font-title font-semibold text-lg text-white mb-2">
            Click or drag and drop a job description (PDF, DOCX)
          </span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <span className="text-sm text-gray-400 mb-2">Max file size: 5MB</span>
        </label>
        {selectedFile && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearSelectedFile();
            }}
            className="mt-2 border border-white text-white px-3 py-1 rounded hover:bg-transparent hover:text-white transition"
          >
            {selectedFile.name}{" "}
            <FaTimes className="inline-block ml-2 hover:text-red-400 transition-all" />
          </button>
        )}
        {!(form.file instanceof File) && form.fileName && (
          <span className="text-sm text-yellow-400 mt-4 italic">
            The file <strong>{form.fileName}</strong> is no longer available.
            Please upload it again.
          </span>
        )}
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          {selectedFile ? (
            <p className="text-sm font-sans font-bold text-gray-200">
              File upload: {selectedFile.name}{" "}
              <FaFileAlt className="inline-block mr-1" />
            </p>
          ) : (
            <p className="text-sm font-bold text-gray-400">No file selected.</p>
          )}
        </div>
        <label className="block text-gray-400 text-sm mb-1">
          Position Title
        </label>
        <input
          type="text"
          placeholder="E.g. Backend Software Engineer"
          value={positionTitle}
          onChange={handleTitleChange}
          disabled={!selectedFile}
          className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-md text-white mb-6 shadow-lg disabled:cursor-not-allowed"
        />
        <label className="block text-gray-400 text-sm mb-1">
          Monthly Budget (USD)
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="$0"
            value={budget}
            onChange={handleBudgetChange}
            disabled={!selectedFile}
            className="font-sans shadow-lg bg-[#121212] border border-gray-700 text-white px-4 py-3 rounded-lg w-full pr-16 disabled:cursor-not-allowed"
          />
          <span className="font-sans absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-sm font-bold">
            Monthly
          </span>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
      )}
    </div>
  );
});

export default UploadTab;
