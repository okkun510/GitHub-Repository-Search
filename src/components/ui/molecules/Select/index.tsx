import { Select as SelectAtom } from "../../atoms/Select";
import { SelectContent } from "../../atoms/Select/SelectContent";
import { SelectItem } from "../../atoms/Select/SelectItem";
import { SelectTrigger } from "../../atoms/Select/SelectTrigger";
import { SelectValue } from "../../atoms/Select/SelectValue";

export type SelectOption = {
  value: string;
  label: string;
};

export type Props = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
};

export const Select = ({
  name,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  options,
  disabled,
  className,
}: Props) => {
  return (
    <SelectAtom
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={className} disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectAtom>
  );
};
