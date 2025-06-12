import React from "react";
import styles from "../styles/components/RadioOption.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

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
  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  const handleInputChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.radioOptionContainer} ${
        checked ? styles.checked : ""
      } ${disabled ? styles.disabled : ""}`}
    >
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleInputChange}
          disabled={disabled}
          className={styles.radioInput}
        />
        <div
          className={`${styles.customRadio} ${checked ? styles.checked : ""}`}
        >
          {checked && <FontAwesomeIcon icon={faCheckCircle} />}
        </div>
        <div>{label}</div>
      </label>
    </div>
  );
};

export default RadioOption;
