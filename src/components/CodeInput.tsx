import React, { useState, useRef, useEffect } from "react";
import {
  isNumeric,
  mergeDigitsToCode,
  splitCodeToDigits,
  isValidCode,
} from "../utils/codeInputUtils";
import styles from "../styles/components/CodeInput.module.css";

interface CodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  onChange?: (code: string) => void;
  disabled?: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
}) => {
  const [codeDigits, setCodeDigits] = useState<string[]>(
    Array(length).fill("")
  );
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const updateCodeDigits = (newDigits: string[]) => {
    setCodeDigits(newDigits);
    const code = mergeDigitsToCode(newDigits);
    onChange?.(code);
    if (isValidCode(code, length)) {
      onComplete(code);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...codeDigits];
    newDigits[index] = value.slice(-1);
    updateCodeDigits(newDigits);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      e.preventDefault();
      const newDigits = [...codeDigits];
      newDigits[index - 1] = "";
      updateCodeDigits(newDigits);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text").trim();
    if (!isNumeric(pasted)) return;
    const digits = splitCodeToDigits(pasted, length);
    updateCodeDigits(digits);
    const nextIndex = digits.findIndex((d) => d === "");
    inputRefs.current[nextIndex === -1 ? length - 1 : nextIndex]?.focus();
  };

  return (
    <div className={styles.codeInputContainer}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={codeDigits[index]}
          onChange={(e) => handleDigitChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={styles.codeInput}
        />
      ))}
    </div>
  );
};

export default CodeInput;
