import React from "react";

interface SelectDropdownProps {
  label: string;
  value?: string | null;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  error?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  value,
  options,
  onChange,
  error,
}) => {
  return (
    <div className="col-span-1 bg-transparent text-sm">
      <select
        className="w-full rounded-[20px] border bg-transparent px-2 pb-2 pt-1"
        name="select"
        id="select"
        onChange={(e) => onChange(e.target.value)}
        value={value || "-"}
        required
      >
        <option value="-" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="w-fit text-pretty"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default SelectDropdown;
