import type { ExecutionRecord } from "./types";

export interface ExecutionFilters {
  search: string;
  status: string;
  period: string;
}

export function filterExecutions(
  records: ExecutionRecord[],
  filters: ExecutionFilters,
  referenceDate: string,
) {
  const query = filters.search
    .trim()
    .toLocaleLowerCase("es")
    .replace(/^#(?:run-)?/i, "");
  const reference = Date.parse(`${referenceDate}T00:00:00Z`);
  return records.filter((record) => {
    const age = (reference - Date.parse(`${record.date}T00:00:00Z`)) / 86400000;
    return (
      `${record.id} ${record.pipeline}`
        .toLocaleLowerCase("es")
        .includes(query) &&
      (filters.status === "Todos" || record.result === filters.status) &&
      (filters.period === "all" || (age >= 0 && age < Number(filters.period)))
    );
  });
}

export function formatExecutionDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
