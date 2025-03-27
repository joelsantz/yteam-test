"use client";
import { useEffect, useRef, useState } from "react";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { PositionProps } from "../../../utils/types";
import FormFields from "./FormFields";
import PositionList from "./PositionList";
import Tabs from "./Tabs";
import Button from "./Button";
import UploadTab, { UploadTabHandle } from "./UploadTab";
import ContactForm from "./ContactForm";

export function PositionForm() {
  const [step, setStep] = useState<"positions" | "contact">("positions");
  const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual");
  const [positions, setPositions] = useState<PositionProps[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<PositionProps>({
    title: "",
    seniority: "",
    skills: [],
    additionalInfo: "",
    budget: "",
    entryType: "",
    fileName: "",
    file: undefined,
  });

  // Referencia para UploadTab
  const uploadTabRef = useRef<UploadTabHandle>(null);

  useEffect(() => {
    const savedPositions = localStorage.getItem("positions");
    if (savedPositions) setPositions(JSON.parse(savedPositions));
  }, []);

  useEffect(() => {
    if (positions.length > 0) {
      localStorage.setItem("positions", JSON.stringify(positions));
    } else {
      localStorage.removeItem("positions");
    }
  }, [positions]);

  useEffect(() => {
    if (editingIndex !== null) {
      setActiveTab(positions[editingIndex].entryType as "manual" | "upload");
    }
  }, [editingIndex, positions]);

  // Resetear el formulario cada vez que se cambie la pestaña
  // useEffect(() => {
  //   resetForm();
  // }, [activeTab]);

  const handleFormUpdate = (updatedForm: PositionProps) => setForm(updatedForm);

  const addOrUpdatePosition = () => {
    if (activeTab === "manual") {
      if (form.title && form.seniority && form.budget && form.skills.length > 0) {
        const updatedPositions = [...positions];
        const newPosition = { ...form, entryType: activeTab };
        if (editingIndex !== null) {
          updatedPositions[editingIndex] = newPosition;
          setEditingIndex(null);
        } else {
          updatedPositions.push(newPosition);
        }
        setPositions(updatedPositions);
        resetForm();
      }
    } else {
      if (form.title && form.budget && form.fileName && form.file) {
        const updatedPositions = [...positions];
        const newPosition = { ...form, entryType: activeTab };
        if (editingIndex !== null) {
          updatedPositions[editingIndex] = newPosition;
          setEditingIndex(null);
        } else {
          updatedPositions.push(newPosition);
        }
        setPositions(updatedPositions);
        resetForm();
        uploadTabRef.current?.clearState();
      }
    }
  };

  const editPosition = (index: number) => {
    setEditingIndex(index);
    setForm(positions[index]);
  };

  const removePosition = (index: number) => {
    setPositions(positions.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm({
      title: "",
      seniority: "",
      skills: [],
      additionalInfo: "",
      budget: "",
      entryType: "",
    });
    setEditingIndex(null);
  };

  const disabledTabs: ("manual" | "upload")[] =
    editingIndex !== null
      ? positions[editingIndex].entryType === "manual"
        ? ["upload"]
        : ["manual"]
      : [];

  return (
    <section className="bg-[#0C0C0C] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Columna izquierda - Formulario o ContactForm */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            {step === "contact" && (
              <FaArrowLeft
                className="text-white cursor-pointer hover:text-gray-400 transition"
                onClick={() => setStep("positions")}
              />
            )}
            <h2 className="font-title text-4xl text-white font-extrabold">
              Build your team
            </h2>
          </div>

          {step === "positions" ? (
            <>
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} disabledTabs={disabledTabs} />

              {activeTab === "manual" && (
                <FormFields form={form} setForm={handleFormUpdate} />
              )}

              {activeTab === "upload" && (
                <UploadTab
                  ref={uploadTabRef}
                  form={form}
                  onUploadChange={(uploadData) => {
                    setForm((prev) => ({
                      ...prev,
                      title: uploadData.title,
                      budget: uploadData.budget,
                      fileName: uploadData.fileName,
                      file: uploadData.file,
                    }));
                  }}
                />
              )}

              <div className="flex items-center gap-4 mt-6">
                <Button
                  onClick={addOrUpdatePosition}
                  disabled={
                    activeTab === "manual"
                      ? !form.title || !form.seniority || !form.budget || form.skills.length === 0
                      : !form.title || !form.budget || !form.fileName || !form.file
                      
                  }
                  label={editingIndex !== null ? "Update Position" : "Add Position"}
                  icon={<FaUserPlus />}
                />

                {editingIndex !== null && (
                  <Button onClick={resetForm} label="Cancel" variant="secondary" />
                )}
              </div>
            </>
          ) : (
            <ContactForm positions={positions} />
          )}
        </div>

        {/* Columna derecha - Lista de posiciones */}
        <PositionList
          positions={positions}
          removePosition={removePosition}
          editPosition={editPosition}
          onContinue={() => setStep("contact")}
          onEdit={() => setStep("positions")}
          editingIndex={editingIndex}
        />
      </div>
    </section>
  );
}

export default PositionForm;