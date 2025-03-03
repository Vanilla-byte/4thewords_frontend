import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import SearchBar from "../SearchBar.vue";

vi.mock("@/service", () => ({
  useListForFilters: () => ({
    fetchListOfCategories: vi.fn().mockResolvedValue([{ id: 1, name: "Categoría 1" }]),
    fetchListOfProvinces: vi.fn().mockResolvedValue([{ id: 1, name: "Provincia 1" }]),
    fetchListOfCantons: vi.fn().mockResolvedValue([{ id: 1, name: "Cantón 1", province_id: 1 }]),
    fetchListOfDistricts: vi.fn().mockResolvedValue([{ id: 1, name: "Distrito 1", canton_id: 1 }]),
  }),
}));

describe("SearchBar", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(SearchBar);
    await wrapper.vm.$nextTick();
  });

  it("renders properly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("loads categories, provinces, cantons, and districts on mount", async () => {
    expect(wrapper.vm.categories.length).toBeGreaterThan(0);
    expect(wrapper.vm.provinces.length).toBeGreaterThan(0);
    expect(wrapper.vm.cantonsFetch.length).toBeGreaterThan(0);
    expect(wrapper.vm.districtsFetch.length).toBeGreaterThan(0);
  });

  it("updates cantons and districts when province and canton are selected", async () => {
    wrapper.vm.modelProvince = wrapper.vm.provinces[0];
    await wrapper.vm.$nextTick();
    wrapper.vm.loadCantons();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.cantons.length).toBeGreaterThan(0);

    wrapper.vm.modelCanton = wrapper.vm.cantons[0];
    await wrapper.vm.$nextTick();
    wrapper.vm.loadDistricts();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.districts.length).toBeGreaterThan(0);
  });
});
