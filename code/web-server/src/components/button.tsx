import "~/styles/card.css";
import "~/styles/globals.css";
import React from "react";

interface ButtonProps {
  text: string; // The text to display on the button
  onClick: () => void; // The function to execute on button click
  type?: "button" | "submit" | "reset"; // HTML button types
  className?: string; // Optional class name for styling
  disabled?: boolean; // Optionally disable the button
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 font-semibold rounded ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
