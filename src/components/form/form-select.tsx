import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  form: UseFormReturn<any>;
  options: {
    label: string;
    value: string;
    class?: string;
  }[];
  disabled?: boolean;
  required?: boolean;
  multi?: boolean;
  onChange?: (val: any) => void;
  isLoading?: boolean;
}

function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
  required,
  disabled = false,
  multi = false,
  onChange,
  isLoading,
}: FormSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className=" font-medium text-sm">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}

          {multi ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value?.length && "text-muted-foreground"
                  )}
                  disabled={disabled}
                >
                  {field.value?.length ? (
                    field.value.length > 2 ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="truncate cursor-help">
                              {options
                                .filter((opt) =>
                                  field.value.includes(opt.value)
                                )
                                .slice(0, 4)
                                .map((opt) => opt.label)
                                .join(", ")}
                              {field.value.length > 4 ? "..." : ""}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {options
                              .filter((opt) => field.value.includes(opt.value))
                              .map((opt) => opt.label)
                              .join(", ")}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      options
                        .filter((opt) => field.value.includes(opt.value))
                        .map((opt) => opt.label)
                        .join(", ")
                    )
                  ) : (
                    placeholder
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-[830px] max-w-[100vw] max-h-60 overflow-y-auto">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={option.value}
                      checked={field.value?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), option.value]
                          : field.value.filter(
                              (val: string) => val !== option.value
                            );
                        field.onChange(newValue);
                      }}
                      disabled={disabled}
                    />
                    <label htmlFor={option.value} className="text-sm">
                      {option.label}
                    </label>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          ) : (
            <Select
              onValueChange={(val) => {
                field.onChange(val);
                onChange?.(val);
              }}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex">
                      {option.class && <div className={option.class} />}
                      <span className="ms-3 truncate max-w-[700px] overflow-hidden whitespace-nowrap">
                        {option.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormSelect };
