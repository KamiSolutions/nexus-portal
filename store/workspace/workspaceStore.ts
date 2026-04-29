export type WorkspaceState = {
  commandPaletteOpen: boolean;
  savedFilters: string[];
};

export const initialWorkspaceState: WorkspaceState = {
  commandPaletteOpen: false,
  savedFilters: ["High value approvals", "Expiring leases", "Fleet at risk"],
};

