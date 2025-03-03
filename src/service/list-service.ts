import { envVars } from "@/settings/env-vars";
import { Category, Province, Canton, District } from "@/schemas/legends";

export function useListForFilters() {
  const fetchListOfCategories = async (): Promise<Category[]> => {
    const legendsData = await fetch(`${envVars.API_URL}/api/v1/categories`, {
      headers: { "Cache-Control": "no-cache" },
    });
    return legendsData.json();
  };

  const fetchListOfProvinces = async (): Promise<Province[]> => {
    const legendsData = await fetch(`${envVars.API_URL}/api/v1/location/provinces`, {
      headers: { "Cache-Control": "no-cache" },
    });
    return legendsData.json();
  };

  const fetchListOfCantons = async (): Promise<Canton[]> => {
    const legendsData = await fetch(`${envVars.API_URL}/api/v1/location/cantons`, {
      headers: { "Cache-Control": "no-cache" },
    });
    return legendsData.json();
  };

  const fetchListOfDistricts = async (): Promise<District[]> => {
    const legendsData = await fetch(`${envVars.API_URL}/api/v1/location/districts`, {
      headers: { "Cache-Control": "no-cache" },
    });
    return legendsData.json();
  };

  return { fetchListOfCategories, fetchListOfDistricts, fetchListOfCantons, fetchListOfProvinces };
}
