// API base URL comes from the environment so it can differ between local and production.
// Vite bakes this in at build time - redeploy the frontend after changing it.
export const API = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export const MENU_URL = `${API}/api/menu`;
