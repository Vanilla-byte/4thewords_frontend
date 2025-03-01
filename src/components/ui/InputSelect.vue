<script setup lang="ts">
import { computed, onMounted } from "vue";

type OptionType<T = unknown> = T extends object ? T : Record<string, unknown>;
const model = defineModel();

const props = withDefaults(
  defineProps<{
    icon?: string;
    returnObject?: boolean;
    optionValue?: string;
    optionLabel?: string;
    options: Array<OptionType>;
  }>(),
  {
    returnObject: true,
    optionValue: "id",
    optionLabel: "name",
  },
);

const internalValue = computed({
  get() {
    if (!model.value) return "";
    if (typeof model.value === "object" && model.value !== null) {
      return model.value[props.optionValue];
    }
    return model.value;
  },
  set(value) {
    if (props.returnObject) {
      const selectedObject = props.options.find((opt) => {
        if (typeof opt === "string") {
          return opt === value;
        }
        return opt[props.optionValue] === value;
      });
      model.value = (selectedObject || value) as OptionType;
    } else {
      model.value = value as OptionType;
    }
  },
});

const normalizedOptions = computed(() => {
  return props.options.map((opt) => {
    if (typeof opt === "object") {
      return opt;
    }
    return { [props.optionValue]: opt, [props.optionLabel]: opt };
  });
});

onMounted(() => {
  if (model.value && props.returnObject && typeof model.value !== "object") {
    const selectedObject = props.options.find((opt) => {
      if (typeof opt === "string") {
        return opt === model.value;
      }
      return opt[props.optionValue] === model.value;
    });

    if (selectedObject) {
      model.value = selectedObject;
    }
  } else if (model.value && !props.returnObject && typeof model.value === "object") {
    model.value = (model.value as OptionType)[props.optionValue] as OptionType;
  }
});
</script>

<template>
  <select
    v-model="internalValue"
    class="w-full p-2 border bg-gray-100 focus:ring-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <slot name="manual-options" />
    <template v-for="(opt, i) in normalizedOptions" :key="i">
      <option :value="opt[props.optionValue]">{{ opt[props.optionLabel] }}</option>
    </template>
  </select>
</template>
