/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface FormInputFileProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  name: Path<T>;
  label?: string;
  // form: UseFormReturn<T, any, T>;
  form: any;
  className?: string;
  download?: any;
  link?: any;
}

function FormInputFile<T extends FieldValues>({
  form,
  name,
  label,
  className,
  required,
  download,
  link,
  ...props
}: FormInputFileProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm font-medium flex items-center">
              {label} {required && <span className="text-red-500 ml-1">*</span>}{" "}
              {download && (
                <a
                  href={`/${link}`}
                  target="_blank"
                  download={link}
                  className="ms-3"
                >
                  <p className="bg-green-600 px-2 py-2 text-white rounded-xl p-1 m-1 text-sm flex items-center gap-2">
                    <Download size={16} />
                    <span>Download Format</span>
                  </p>
                </a>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type="file"
              className={className}
              onChange={(e) =>
                field.onChange(e.target.files ? e.target.files : null)
              }
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormInputFile };
