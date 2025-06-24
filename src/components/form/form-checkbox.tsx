/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  form: UseFormReturn<T, any, T>;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
  disabled?: boolean;
}

function FormCheckbox<T extends FieldValues>({
  form,
  name,
  label,
  options,
  className,
  disabled = false,
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
          )}
          <div className={cn(className)}>
            {options?.map((option) => {
              const isChecked = Array.isArray(field.value)
                ? field.value.includes(option.value)
                : false;

              return (
                <FormItem
                  key={option.value}
                  className="flex flex-row items-start space-x-3 space-y-0 my-2"
                >
                  <FormControl>
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(Array.isArray(field.value) ? field.value : []), option.value]
                          : field.value?.filter((v: string) => v !== option.value) || [];

                        field.onChange(newValue);
                      }}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              );
            })}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormCheckbox };
