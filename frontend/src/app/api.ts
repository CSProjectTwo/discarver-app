const BASE_URL = "/api";

function getToken(): string | null {
  return localStorage.getItem("token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiRegister(name: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data;
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export interface ListingFilters {
  make?:      string;
  model?:     string;
  year?:      number;
  min_price?: number;
  max_price?: number;
  condition?: string;
}

export async function apiGetListings(filters: ListingFilters = {}) {
  const params = new URLSearchParams();
  if (filters.make)      params.set("make",      filters.make);
  if (filters.model)     params.set("model",     filters.model);
  if (filters.year)      params.set("year",      String(filters.year));
  if (filters.min_price) params.set("min_price", String(filters.min_price));
  if (filters.max_price) params.set("max_price", String(filters.max_price));
  if (filters.condition) params.set("condition", filters.condition);

  const res = await fetch(`${BASE_URL}/listings?${params.toString()}`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch listings");
  return data;
}

export async function apiGetListing(id: string) {
  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Listing not found");
  return data;
}

export async function apiGetMakes(year: number) {
  const res = await fetch(`${BASE_URL}/makes/${year}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch makes");
  return data;
}

export async function apiGetModels(year: number, make: string) {
  const res = await fetch(`${BASE_URL}/models/${year}/${encodeURIComponent(make)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch models");
  return data;
}