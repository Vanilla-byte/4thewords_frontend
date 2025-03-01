<script setup lang="ts">
import { computed } from "vue";

type ButtonSize = "xs" | "sm" | "base" | "lg" | "xl";
type ButtonVariant = "primary" | "warning" | "error";

const props = withDefaults(defineProps<{ size?: ButtonSize; variant?: ButtonVariant }>(), {
  size: "base",
  variant: "primary",
});
const sizeClasses = computed(() => {
  return {
    xs: "px-3 py-2 text-xs",
    sm: "px-3 py-2 text-sm",
    base: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base",
  }[props.size];
});

const variantClasses = computed(() => {
  return {
    primary:
      "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600",
    error:
      "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700",
  }[props.variant];
});
</script>

<template>
  <button
    type="button"
    class="font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none"
    :class="[sizeClasses, variantClasses]"
  >
    <slot />
  </button>
</template>
