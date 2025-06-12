import React from "react";
import styles from "../styles/components/Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type ButtonVariant = "primary" | "secondary" | "link" | "back";

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant;
  style?: React.CSSProperties;
  className?: string;
  icon?: IconProp;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  variant = "primary",
  style,
  className,
  icon,
  iconPosition = "left",
}) => {
  const variantClass = styles[variant];
  const hasChildren = React.Children.count(children) > 0;
  const isIconOnly = icon && !hasChildren;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${variantClass} ${className || ""} ${
        icon && !hasChildren ? styles.iconOnly : ""
      }`}
      style={style}
    >
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon
          icon={icon}
          className={icon && (hasChildren || isIconOnly) ? styles.icon : ""}
        />
      )}

      {children}

      {icon && iconPosition === "right" && (
        <FontAwesomeIcon
          icon={icon}
          className={icon && (hasChildren || isIconOnly) ? styles.icon : ""}
        />
      )}
    </button>
  );
};

export default Button;
