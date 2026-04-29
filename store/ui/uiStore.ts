export type UiState = {
  themeMode: "light" | "dark";
  sidebarCollapsed: boolean;
};

export const initialUiState: UiState = {
  themeMode: "light",
  sidebarCollapsed: false,
};

