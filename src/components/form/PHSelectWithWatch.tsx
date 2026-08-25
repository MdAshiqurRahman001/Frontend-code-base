/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  control?: any;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<string>> | ((val: string) => void);
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  onValueChange,
}: TPHSelectProps) => {
  const methods = useFormContext();

  const selectedValue = useWatch({
    control: methods.control,
    name,
  });

  useEffect(() => {
    if (selectedValue !== undefined) {
      onValueChange(selectedValue);
    }
  }, [selectedValue, onValueChange]);

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Select
              disabled={disabled}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>

              <SelectContent>
                {options?.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PHSelectWithWatch;
