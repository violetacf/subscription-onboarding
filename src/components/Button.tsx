import React from "react";

type ButtonVariant = "primary" | "secondary" | "link";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  variant = "primary",
  color,
  style,
  className,
}) => {
  const baseStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "1em",
    fontWeight: "bold",
    transition: "background-color 0.2s ease-in-out, opacity 0.2s ease-in-out",
    opacity: disabled ? 0.6 : 1,
    whiteSpace: "nowrap",
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: color || "#8a2be2",
          color: "white",
          // TODO: Add hover effect
          // '&:hover': { opacity: disabled ? 0.6 : 0.9 }
        };
      case "secondary":
        return {
          backgroundColor: color || "#f0f0f0",
          color: "#333",
          border: "1px solid #ccc",
          // '&:hover': { opacity: disabled ? 0.6 : 0.8 }
        };
      case "link":
        return {
          background: "none",
          border: "none",
          color: color || "blue",
          padding: "0",
          font: "inherit",
          textDecoration: "underline",
        };
      default:
        return {};
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...getVariantStyles(), ...style }}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
