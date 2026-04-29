import React, { createContext, useContext, useMemo, useState } from "react";

type WorkspaceContextValue = {
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  savedFilters: string[];
  addSavedFilter: (filter: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [savedFilters, setSavedFilters] = useState(["High value approvals", "Expiring leases", "Fleet at risk"]);

  const value = useMemo(
    () => ({
      commandPaletteOpen,
      setCommandPaletteOpen,
      savedFilters,
      addSavedFilter: (filter: string) => setSavedFilters((current) => [filter, ...current]),
    }),
    [commandPaletteOpen, savedFilters],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }

  return context;
}

