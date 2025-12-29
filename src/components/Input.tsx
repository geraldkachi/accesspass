import React, { useState, type InputHTMLAttributes } from "react";
import clsx from "clsx";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

// Define the props interface
interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  type?: "text" | "number" | "password" | "email" | "tel" | "date" | "time" | "url" | "file";
  error?: string;
  label?: string;
  extraClassnames?: string;
  variant?: "dark" | "light";
  labelClassName?: string;
  info?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showPasswordToggle?: boolean;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    name,
    type = "text",
    error,
    label,
    extraClassnames,
    variant = "light",
    labelClassName,
    info,
    onBlur,
    onChange,
    value,
    touched = false,
    containerClassName = "",
    inputClassName = "",
    errorClassName = "",
    icon,
    iconPosition = "left",
    showPasswordToggle = false,
    className = "",
    ...rest
  } = props;
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const togglePassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  // Determine the input type based on password visibility
  const inputType = (type === "password" && showPassword) ? "text" : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const hasError = touched && !!error;
  const isPasswordField = type === "password" || showPasswordToggle;

  // Determine border color based on state
  const borderColorClass = hasError 
    ? 'border-red-500' 
    : isFocused 
      ? 'border-[#4C63A0]' 
      : 'border-gray-300';

  // Calculate padding based on icon and password toggle
  const leftPadding = icon && iconPosition === "left" ? 'pl-8' : 'pl-3';
  const rightPadding = (type === "password" || showPasswordToggle || (icon && iconPosition === "right")) 
    ? 'pr-12' 
    : 'pr-3';

  return (
    <div className={clsx("w-full space-y-1", containerClassName)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            labelClassName,
            "block text-xs font-medium text-[#4C63A0] mb-1"
          )}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          type={inputType}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={clsx(
            "block w-full py-1.5 bg-transparent border-0 border-b-2",
            "text-gray-900 placeholder-gray-400",
            "focus:outline-none focus:ring-0",
            "text-base transition-colors duration-200",
            leftPadding,
            rightPadding,
            borderColorClass,
            inputClassName,
            extraClassnames,
            className
          )}
          {...rest}
        />
        
        {icon && iconPosition === "right" && !isPasswordField && (
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
            {icon}
          </div>
        )}
        
        {(type === "password" || showPasswordToggle) && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <HiOutlineEyeOff className="h-4 w-4 text-[#1F3C88] hover:text-[#4C63A0] transition-colors" />
            ) : (
              <HiOutlineEye className="h-4 w-4 text-[#1F3C88] hover:text-[#4C63A0] transition-colors" />
            )}
          </button>
        )}
      </div>

      {hasError && (
        <div className={clsx("mt-1 text-sm text-red-600", errorClassName)}>
          {error}
        </div>
      )}
      
      {info && !hasError && (
        <div className="mt-1 text-xs text-gray-500">
          {info}
        </div>
      )}
    </div>
  );
};

// Specialized input components
export const EmailInput: React.FC<Omit<TextInputProps, 'type' | 'icon'>> = (props) => (
  <TextInput
    type="email"
    icon={
      <img src="/email-login.svg" alt="email" className="w-6 h-6" />
    }
    autoComplete="email"
    {...props}
  />
);

export const PasswordInput: React.FC<Omit<TextInputProps, 'type' | 'icon' | 'showPasswordToggle'>> = (props) => (
  <TextInput
    type="password"
    showPasswordToggle={true}
    icon={
      <img src="/passsword-lock.svg" alt="password lock" className="w-5 h-5"/>
    }
    autoComplete="current-password"
    {...props}
  />
);

export default TextInput;