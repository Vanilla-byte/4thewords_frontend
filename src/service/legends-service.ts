import { z } from "zod";

import { envVars } from "@/settings/env-vars";
import { Legend, LegendDto } from "@/schemas/legends";
import { jsonToFormData } from "@/utils";

export function useLegends() {
  const clearData = (legend: Partial<Legend>) => {
    const { category, province, canton, district, ...restLegend } = legend;

    return {
      category_id: category?.id ?? null,
      province_id: province?.id ?? null,
      canton_id: canton?.id ?? null,
      district_id: district?.id ?? null,
      ...restLegend,
    };
  };
  const fetchLegends = async (): Promise<Legend[]> => {
    const legendsData = await fetch(`${envVars.API_URL}/api/v1/legends`, {
      headers: { "Cache-Control": "no-cache" },
    });

    const data = await legendsData.json();
    const result = z.array(Legend).safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result);
      return [];
    }
  };

  const createLegend = async (legend: Omit<LegendDto, "id">, file?: File): Promise<Legend | null> => {
    try {
      const new_legend = clearData(legend);
      const formData = jsonToFormData(new_legend);
      if (file) {
        formData.append("file", file, file.name);
      }

      const response = await fetch(`${envVars.API_URL}/api/v1/legend`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const result = Legend.safeParse(data);
      return result.success ? result.data : null;
    } catch (error) {
      console.error("Error creando la leyenda:", error);
      return null;
    }
  };

  const updateLegend = async (id: string, legend: Partial<LegendDto>, file?: File): Promise<Legend | null> => {
    try {
      const new_legend = clearData(legend);
      const formData = jsonToFormData(new_legend);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(`${envVars.API_URL}/api/v1/legend/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      const result = Legend.safeParse(data);
      return result.success ? result.data : null;
    } catch (error) {
      console.error(`Error actualizando la leyenda con ID ${id}:`, error);
      return null;
    }
  };

  const deleteLegend = async (id: string): Promise<boolean | null> => {
    try {
      const response = await fetch(`${envVars.API_URL}/api/v1/legend/${id}`, {
        method: "DELETE",
      });
      return response.status === 204;
    } catch (error) {
      console.error(`Error eliminando la leyenda con ID ${id}:`, error);
      return null;
    }
  };
  return { fetchLegends, createLegend, updateLegend, deleteLegend };
}
