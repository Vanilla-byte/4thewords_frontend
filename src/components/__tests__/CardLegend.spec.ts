import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CardLegend from "../CardLegend.vue";

describe("CardLegend", () => {
  const legend = {
    image_url: "https://example.com/image.jpg",
    name: "Legend Name",
    category: { name: "Category Name" },
    description: "Legend Description",
    relative_created_at: "2023-01-01",
    district: { name: "District Name" },
    canton: { name: "Canton Name" },
    province: { name: "Province Name" },
    source: "Legend Source",
  };

  it("renders properly with given props", () => {
    const wrapper = mount(CardLegend, { props: { legend } });
    expect(wrapper.text()).toContain("Legend Name");
    expect(wrapper.text()).toContain("Category Name");
    expect(wrapper.text()).toContain("Legend Description");
    expect(wrapper.text()).toContain("District Name");
    expect(wrapper.text()).toContain("Canton Name");
    expect(wrapper.text()).toContain("Province Name");
    expect(wrapper.text()).toContain("Legend Source");
  });

  it("emits edit event when edit button is clicked", async () => {
    const wrapper = mount(CardLegend, { props: { legend } });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().edit).toBeTruthy();
  });

  it("emits delete event when delete button is clicked", async () => {
    const wrapper = mount(CardLegend, { props: { legend } });
    await wrapper.findAll("button")[1].trigger("click");
    expect(wrapper.emitted().delete).toBeTruthy();
  });
});
