import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string; // Add className as an optional prop
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={`border rounded-lg shadow-md p-4 ${className || ""}`}>{children}</div>;
};

export const CardContent = ({ children, className }: CardProps) => {
  return <div className={`p-2 ${className || ""}`}>{children}</div>;
};