import React from "react";

interface DateRangeSelectProps {
  label: string;
  value?: string | null;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const DateRangeSelect: React.FC<DateRangeSelectProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <div className="col-span-1 bg-transparent text-sm">
      <select
        className="w-full rounded-[20px] border bg-transparent px-2 pb-2 pt-1"
        name="dateRange"
        id="dateRange"
        onChange={(e) => onChange(e.target.value)}
        value={value || "-"}
        required
      >
        <option value="-" disabled>
          Selecciona un rango de fechas
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-dark-green w-fit text-pretty"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateRangeSelect;
