import { defineStore } from "pinia";
import { type Province, type Canton, type District, type Category, type Legend } from "@/schemas/legends";
import { useLegends, useListForFilters } from "@/service/legends-service";

const { fetchLegends } = useLegends();
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

    addLegend(legend: Legend) {
      this.legends.push(legend);
    },

    updateLegend(id: string, updatedLegend: Partial<Legend>) {
      const index = this.legends.findIndex((legend) => legend.name === id);
      if (index !== -1) {
        this.legends[index] = { ...this.legends[index], ...updatedLegend };
      }
    },

    async getLegendById(id: number): Promise<Legend | undefined> {
      if (this.legends.length === 0) await this.fetchLegends();
      return this.legends.find((legend) => legend.id === id);
    },
  },
});
