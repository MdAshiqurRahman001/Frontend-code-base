/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export type NRInputProps = {
  type?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  icon?: React.ComponentType<any>;
  placeholder?: string;
  control?: any;
  className?: string;
};

export const NRInput = ({
  type = "text",
  name,
  label,
  disabled,
  icon: Icon,
  placeholder,
  control,
  className,
}: NRInputProps) => {
  const methods = useFormContext();
  const resolvedControl = control || methods?.control;
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  // Adjust padding if there's an icon or password toggle
  const inputPaddingClass = isPassword || Icon ? "px-10 py-5" : "py-5";

  return (
    <FormField
      control={resolvedControl}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          {label && <FormLabel htmlFor={name} className="text-xs font-semibold text-slate-700">{label}</FormLabel>}

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                id={name}
                disabled={disabled}
                placeholder={placeholder}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                className={`text-xs rounded-xl ${inputPaddingClass} ${className || ""}`}
              />

              {/* Left Icon */}
              {Icon && (
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Icon className="h-4 w-4" />
                </div>
              )}

              {/* Password Toggle */}
              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 h-8 w-8 p-0"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const PHInput = NRInput;
export default NRInput;
