/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormInput } from "./form-input";

interface DynamicFormInputListProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  name: keyof T;
  label?: string;
  placeholder?: string;
  maxItems?: number;
  required?: boolean;
  disabled?: boolean;
}

export function DynamicFormInputList<T extends Record<string, any>>({
  form,
  name,
  label,
  placeholder,
  maxItems = 10,
  required,
  disabled,
}: DynamicFormInputListProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as string, // Type casting to string for react-hook-form compatibility.
  });

  // Ensure at least one default field is present on initial render
  useEffect(() => {
    if (fields.length === 0) {
      append(""); // Append a single empty field if no default value is provided
    }
  }, [fields, append]);

  return (
    <FormItem>
      {label && (
        <FormLabel>
          {label} {required && <span className="ml-1 text-red-500">*</span>}
        </FormLabel>
      )}
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex items-center space-x-2">
          <FormInput
            form={form}
            name={`${name}.${index}` as const}
            placeholder={`${placeholder || label} ${index + 1}`}
            required={required}
            className="flex-grow"
          />
          {!disabled && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-x mb-5 cursor-pointer"
              onClick={() => remove(index)}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          )}
        </div>
      ))}
      {!disabled && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => append("")}
          // disabled={fields.length >= maxItems}
        >
          Add
        </Button>
      )}
      <FormMessage />
    </FormItem>
  );
}
