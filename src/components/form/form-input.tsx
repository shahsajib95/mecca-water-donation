/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface FormInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  name: Path<T>;
  label?: string;
  // form: UseFormReturn<T, any, T>;
  form: UseFormReturn<any>;
  className?: string;
  required?: boolean;
  isAuth?: any
  message?:string
}

function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  className,
  required,
  isAuth,
  message,
  ...props
}: FormInputProps<T>) {
  
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className={` dark:text-#71717a  text-sm ${isAuth && "text-[#71717a]"}`}>
              {label} {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input className={className} {...field} {...props} />
          </FormControl>
          {message && <span className="text-sm text-red-500">* {message}</span>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormInput };
