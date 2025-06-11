import React, { useState, useRef, useEffect } from "react";

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
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCodeDigits = [...codeDigits];
    newCodeDigits[index] = value.slice(-1);

    setCodeDigits(newCodeDigits);

    const fullCode = newCodeDigits.join("");

    if (onChange) {
      onChange(fullCode);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    if (fullCode.length === length && /^\d+$/.test(fullCode)) {
      onComplete(fullCode);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      e.preventDefault();
      const newCodeDigits = [...codeDigits];
      newCodeDigits[index - 1] = "";
      setCodeDigits(newCodeDigits);
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
      if (onChange) {
        onChange(newCodeDigits.join(""));
      }
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
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
          disabled={disabled}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "1.2em",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
};

export default CodeInput;
