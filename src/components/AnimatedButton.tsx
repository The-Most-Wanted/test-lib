
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const AnimatedButton = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  onClick,
  disabled,
  type = "button"
}: AnimatedButtonProps) => {
  const baseClasses = "relative overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
    secondary: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default AnimatedButton;
