import React from "react";

interface CustomToggleProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function CustomToggle({
  pressed,
  onPressedChange,
  className = "",
  children,
  size = "sm",
}: CustomToggleProps) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={`inline-flex items-center justify-center rounded transition-colors border border-transparent
        ${sizes[size]} ${pressed ? "bg-muted text-muted-foreground" : ""}
        ${className}`}
      onClick={() => onPressedChange(!pressed)}
      tabIndex={0}
    >
      {children}
    </button>
  );
}
