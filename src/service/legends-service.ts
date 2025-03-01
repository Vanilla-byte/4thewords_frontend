export type Province = {
  name: string;
  id: string;
};

export type Canton = {
  name: string;
  id: string;
  province_id: string;
};

export type District = {
  name: string;
  id: string;
  canton_id: string;
};

export type Category = {
  name: string;
  id: string;
};

export type Location = {
  province: Province;
  canton: Omit<Canton, "province_id">;
  district: Omit<District, "canton_id">;
};

export type Legend = {
  name: string;
  category: Category;
  description: string;
  legend_date: string;
  location: Location;
  image: string;
  source: string;
};

export function useLegends() {
  const fetchLegends = async (): Promise<Legend[]> => {
    const legendsData = await fetch("/demo/data/legends.json", {
      headers: { "Cache-Control": "no-cache" },
    });

    await new Promise((resolve) => {
      setTimeout(() => resolve("s"), 500);
    });
    return legendsData.json();
  };

  return { fetchLegends };
}

export function useListForFilters() {
  const fetchListOfCategories = async (): Promise<Category[]> => {
    const legendsData = await fetch("/demo/data/list-of-categories.json", {
      headers: { "Cache-Control": "no-cache" },
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(legendsData.json()), 500);
    });
  };

  const fetchListOfProvinces = async (): Promise<Province[]> => {
    const legendsData = await fetch("/demo/data/list-of-province.json", {
      headers: { "Cache-Control": "no-cache" },
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(legendsData.json()), 500);
    });
  };

  const fetchListOfCantons = async (): Promise<Canton[]> => {
    const legendsData = await fetch("/demo/data/list-of-canton.json", {
      headers: { "Cache-Control": "no-cache" },
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(legendsData.json()), 500);
    });
  };

  const fetchListOfDistricts = async (): Promise<District[]> => {
    const legendsData = await fetch("/demo/data/list-of-district.json", {
      headers: { "Cache-Control": "no-cache" },
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(legendsData.json()), 500);
    });
  };

  return { fetchListOfCategories, fetchListOfDistricts, fetchListOfCantons, fetchListOfProvinces };
}
