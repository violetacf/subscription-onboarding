import React, { MouseEvent } from "react";
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
  type?: "button" | "submit" | "reset";
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
  type = "button",
}) => {
  const variantClass = styles[variant];
  const hasChildren = React.Children.count(children) > 0;
  const isIconOnly = icon && !hasChildren;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (variant === "primary" || variant === "secondary") {
      const button = e.currentTarget;

      const ripple = document.createElement("span");
      ripple.className = styles.ripple;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      const oldRipple = button.querySelector(`.${styles.ripple}`);
      if (oldRipple) oldRipple.remove();

      button.appendChild(ripple);
    }

    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type={type}
      className={`${styles.button} ${variantClass} ${className || ""} ${
        isIconOnly ? styles.iconOnly : ""
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
