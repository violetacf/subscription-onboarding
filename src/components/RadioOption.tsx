import React from "react";

interface RadioOptionProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: React.ReactNode;
  name: string;
  disabled?: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  checked,
  onChange,
  label,
  name,
  disabled = false,
}) => {
  return (
    <div
      onClick={() => !disabled && onChange(value)}
      style={{
        border: `2px solid ${checked ? "blue" : "#ccc"}`,
        borderRadius: "8px",
        padding: "15px",
        margin: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.2s ease-in-out",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        flexBasis: "calc(50% - 10px)",
        minWidth: "200px",
        maxWidth: "350px",
      }}
    >
      <label
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          disabled={disabled}
          style={{ marginTop: "5px", flexShrink: 0 }}
        />
        <div>{label}</div>
      </label>
    </div>
  );
};

export default RadioOption;
