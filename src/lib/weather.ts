const BASE = "https://weather.indianapi.in";
const SANDBOX_BASE = "http://indianapi.in/sandbox/weather-api";

function getApiKey(): string {
  const key = process.env.INDIANAPI_KEY;
  if (!key) throw new Error("INDIANAPI_KEY is not set in environment");
  return key;
}

function getBaseUrl(): string {
  // Use sandbox for development/testing if specified
  const useSandbox =
    process.env.NODE_ENV === "development" &&
    process.env.USE_WEATHER_SANDBOX === "true";
  return useSandbox ? SANDBOX_BASE : BASE;
}

async function callIndianApi(path: string, params?: Record<string, string>) {
  const baseUrl = getBaseUrl();
  const url = new URL(baseUrl + path);
  if (params)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const headers: Record<string, string> = { "x-api-key": getApiKey() };

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    let parsed: any = null;
    try {
      parsed = JSON.parse(text);
    } catch (_e) {
      // not JSON
    }
    const detail = parsed?.detail ?? parsed?.error ?? null;
    const msg = detail
      ? `Indian API error ${res.status}: ${detail}`
      : `Indian API error ${res.status}: ${text}`;
    const err: any = new Error(msg);
    err.status = res.status;
    err.remote = parsed ?? text;
    throw err;
  }
  return res.json();
}

// India-specific
export async function getIndianCities() {
  return callIndianApi("/india/cities");
}

export async function getIndiaWeather(city: string) {
  return callIndianApi("/india/weather", { city });
}

export async function getIndiaWeatherById(city_id: string) {
  return callIndianApi("/india/weather_by_id", { city_id });
}

// Global endpoints
export async function getGlobalCurrent(location: string) {
  return callIndianApi("/global/current", { location });
}

export async function getGlobalWeather(location: string, days?: number) {
  const p: Record<string, string> = { location };
  if (days) p.days = String(days);
  return callIndianApi("/global/weather", p);
}

export async function getGlobalForecast(location: string, days?: number) {
  const p: Record<string, string> = { location };
  if (days) p.days = String(days);
  return callIndianApi("/global/forecast", p);
}

export default {
  getIndianCities,
  getIndiaWeather,
  getIndiaWeatherById,
  getGlobalCurrent,
  getGlobalWeather,
  getGlobalForecast,
};
