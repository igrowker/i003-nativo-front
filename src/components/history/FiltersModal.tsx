import React, { useState } from "react";
import SelectDropdown from "./SelectDropdown";
import DateRangeSelect from "./DateRangeSelect";
import { statusOptions } from "../../utils/statusOptions";
import { dateRangeOptions, getDateRange } from "../../utils/dateUtils";

export const FiltersModal: React.FC<{
  onClose: () => void;
  onFilterStatus: (status: string | null) => void;
  onFilterDate: (
    dateRange: { fromDate: string; toDate: string } | null,
  ) => void;
}> = ({ onClose, onFilterStatus, onFilterDate }) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
    null,
  );
  const [activeFilter, setActiveFilter] = useState<"status" | "date" | null>(
    null,
  );

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
    setActiveFilter("status");
  };

  const handleDateRangeChange = (range: string | null) => {
    setSelectedDateRange(range);
    setActiveFilter("date");
  };

  const handleSubmit = () => {
    if (activeFilter === "status") {
      onFilterStatus(selectedStatus);
      onFilterDate(null);
    } else if (activeFilter === "date" && selectedDateRange) {
      const { fromDate, toDate } = getDateRange(selectedDateRange);
      onFilterDate({ fromDate, toDate });
      onFilterStatus(null);
    }

    onClose();
  };

  const handleClose = () => {
    onFilterDate(null);
    onFilterStatus(null);
    onClose();
  };

  return (
    <>
      <h2 className="mb-2 border-b pb-1 text-lg font-medium">Filtrar por:</h2>
      <div className="mb-4 flex flex-col">
        <button
          className={`mb-2 p-1 text-sm ${activeFilter === "status" ? "bg-light-green font-bold text-primary-green" : "bg-gray-200"} rounded`}
          onClick={() => {
            setActiveFilter("status");
          }}
        >
          Estado
        </button>
        {activeFilter === "status" && (
          <SelectDropdown
            label="Estado"
            value={selectedStatus}
            options={statusOptions}
            onChange={(value) => handleStatusChange(value)}
          />
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <button
          className={`mb-2 p-1 text-sm ${activeFilter === "date" ? "bg-light-green font-bold text-primary-green" : "bg-gray-200"} rounded`}
          onClick={() => {
            setActiveFilter("date");
          }}
        >
          Fecha
        </button>
        {activeFilter === "date" && (
          <DateRangeSelect
            label="Rango de fechas"
            value={selectedDateRange}
            options={dateRangeOptions}
            onChange={(value) => handleDateRangeChange(value)}
          />
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleClose}
          className="w-full rounded-[20px] bg-light-green px-2 py-1 text-black"
        >
          Limpiar filtros
        </button>
        <button
          onClick={handleSubmit}
          className="w-full rounded-[20px] bg-primary-green px-2 py-1 text-white"
        >
          Filtrar
        </button>
      </div>
    </>
  );
};
