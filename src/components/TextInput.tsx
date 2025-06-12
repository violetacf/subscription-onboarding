import React from "react";
import styles from "../styles/components/TextInput.module.css";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  disabled = false,
  type = "text",
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`${styles.textInput} ${className || ""}`}
    />
  );
};

export default TextInput;
