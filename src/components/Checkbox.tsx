import React from "react";
import styles from "../styles/components/Checkbox.module.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.checkboxInput}
      />
      {label}
    </label>
  );
};

export default Checkbox;
