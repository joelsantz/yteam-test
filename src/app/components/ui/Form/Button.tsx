import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  icon,
  variant = "primary",
  fullWidth = false,
}) => {
  const baseStyles = "font-sans flex items-center gap-2 px-6 py-2 rounded-lg transition-colors duration-300";
  const disabledStyles = "bg-gray-800 text-gray-500 cursor-not-allowed";
  const variantStyles = {
    primary: "bg-white border border-white text-black hover:bg-gray-200",
    secondary: "bg-[#0C0C0C] border border-white text-white hover:bg-gray-900",
    danger: "bg-red-500 text-white hover:bg-red-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? disabledStyles : variantStyles[variant]} ${fullWidth ? "w-full justify-center" : ""}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;

