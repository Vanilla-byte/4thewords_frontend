import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import InputFile from "../ui/InputFile.vue";

describe("InputFile", () => {
  it("updates model value when file is selected", async () => {
    const modelValue = ref<File | null>(null);
    const wrapper = mount(InputFile, {
      props: {
        modelValue: modelValue.value,
        "onUpdate:modelValue": (value: File | null) => {
          modelValue.value = value;
        },
      },
    });

    const file = new File(["content"], "test.txt", { type: "text/plain" });
    const input = wrapper.find("input").element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });

    await wrapper.find("input").trigger("change");

    expect(modelValue.value).toEqual(file);
  });
});
