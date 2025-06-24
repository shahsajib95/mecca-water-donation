import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  form: UseFormReturn<T, any, T>;
  disabled?: boolean;
  required?: boolean;
}

function FormDatePicker<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  disabled = false,
  required,
}: FormDatePickerProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm">
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="start"
              className="w-auto p-0"
              sideOffset={4}
            >
              <div
                className="max-h-[300px] overflow-y-auto"
                style={{
                  // scrollbarWidth: "thin",
                  // scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
                  msOverflowStyle: "none",
                  overscrollBehavior: "contain",
                  touchAction: "pan-y",
                  WebkitOverflowScrolling: "touch",
                }}
                onWheel={(e) => {
                  e.stopPropagation();
                  const container = e.currentTarget;
                  const delta = e.deltaY;
                  container.scrollTop += delta;
                }}
              >
                <style>
                  {`
                    .max-h-[300px]::-webkit-scrollbar {
                      width: 6px;
                    }
                    .max-h-[300px]::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    .max-h-[300px]::-webkit-scrollbar-thumb {
                      
                      border-radius: 3px;
                    }
                  `}
                </style>
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={disabled}
                  initialFocus
                  fromYear={1960}
                  toYear={2030}
                  className="rounded-md border"
                />
              </div>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormDatePicker };
