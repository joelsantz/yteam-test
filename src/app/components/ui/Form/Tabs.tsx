import React from "react";

interface TabsProps {
  activeTab: "manual" | "upload";
  setActiveTab: (tab: "manual" | "upload") => void;
  disabledTabs?: ("manual" | "upload")[]; // Nueva prop para tabs deshabilitadas
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, disabledTabs = [] }) => {
  return (
    <div className="flex border-b border-gray-700 mb-6">
      <button
        onClick={() => setActiveTab("manual")}
        disabled={disabledTabs.includes("manual")}
        className={`font-title px-4 py-2 text-sm font-semibold transition-colors ${
          disabledTabs.includes("manual")
            ? "text-gray-500 cursor-not-allowed"
            : activeTab === "manual"
            ? "border-b-2 border-white text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Enter Details Manually
      </button>
      <button
        onClick={() => setActiveTab("upload")}
        disabled={disabledTabs.includes("upload")}
        className={`font-title px-4 py-2 text-sm font-semibold transition-colors ${
          disabledTabs.includes("upload")
            ? "text-gray-500 cursor-not-allowed"
            : activeTab === "upload"
            ? "border-b-2 border-white text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Upload Job Description (PDF, DOCX)
      </button>
    </div>
  );
};

export default Tabs;

