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
import { useFormContext } from "react-hook-form";

export type NRSelectProps = {
  label: string;
  name: string;
  control?: any;
  disabled?: boolean;
  options?: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};

export const NRSelect = ({
  label,
  name,
  control,
  options,
  disabled,
}: NRSelectProps) => {
  const methods = useFormContext();
  const resolvedControl = control || methods?.control;

  return (
    <FormField
      control={resolvedControl}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5 w-full">
          <FormLabel className="text-xs font-semibold text-slate-700">{label}</FormLabel>

          <FormControl>
            <Select
              disabled={disabled}
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className="w-full py-5 text-xs rounded-xl">
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>

              <SelectContent className="bg-white rounded-xl shadow-md border border-slate-100">
                {options?.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="text-xs py-2 cursor-pointer"
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

export const PHSelect = NRSelect;
export default NRSelect;
