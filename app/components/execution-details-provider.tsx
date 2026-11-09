"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Execution } from "../lib/types";
import ExecutionDialog from "./execution-dialog";

const ExecutionDetailsContext = createContext<
  ((execution: Execution) => void) | null
>(null);

export function ExecutionDetailsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<Execution | null>(null);
  return (
    <ExecutionDetailsContext.Provider value={setSelected}>
      {children}
      {selected && (
        <ExecutionDialog
          execution={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </ExecutionDetailsContext.Provider>
  );
}

export function useExecutionDetails() {
  const openDetails = useContext(ExecutionDetailsContext);
  if (!openDetails) throw new Error("ExecutionDetailsProvider is required");
  return openDetails;
}
