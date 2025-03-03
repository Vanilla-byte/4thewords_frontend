import { defineStore } from "pinia";
import { type Province, type Canton, type District, type Category, type Legend } from "@/schemas/legends";
import { useLegends, useListForFilters } from "@/service";

const { fetchLegends, createLegend, updateLegend } = useLegends();
const { fetchListOfCategories, fetchListOfProvinces, fetchListOfCantons, fetchListOfDistricts } = useListForFilters();

export const useLegendStore = defineStore("legendStore", {
  state: () => ({
    provinces: [] as Province[],
    cantons: [] as Canton[],
    districts: [] as District[],
    categories: [] as Category[],
    legends: [] as Legend[],
  }),

  actions: {
    async fetchLegends() {
      this.legends = await fetchLegends();
    },

    async fetchProvinces() {
      this.provinces = await fetchListOfProvinces();
    },

    async fetchCantons() {
      this.cantons = await fetchListOfCantons();
    },

    async fetchDistricts() {
      this.districts = await fetchListOfDistricts();
    },

    async fetchCategories() {
      this.categories = await fetchListOfCategories();
    },

    async createLegend(legend: Legend, file: File) {
      const new_legend = await createLegend(legend, file);
      if (new_legend) this.legends.push(new_legend);
      return new_legend;
    },

    async updateLegend(id: string, legend: Partial<Legend>, file: File) {
      const update_legend = await updateLegend(id, legend, file);
      if (update_legend) {
        const index = this.legends.findIndex((legend) => String(legend.id) === id);
        if (index !== -1) {
          this.legends[index] = { ...this.legends[index], ...update_legend };
        }
      }
      return update_legend;
    },

    async getLegendById(id: string): Promise<Legend | undefined> {
      if (this.legends.length === 0) await this.fetchLegends();
      return this.legends.find((legend) => String(legend.id) === id);
    },
  },
});
