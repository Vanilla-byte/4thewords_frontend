<script setup lang="ts">
import { useAttrs } from "vue";

defineOptions({
  inheritAttrs: false,
});

const $attrs = useAttrs();
const model = defineModel();
</script>

<template>
  <div class="relative">
    <div v-if="$slots.icon" class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
      <slot name="icon" />
    </div>
    <input
      v-bind="$attrs"
      v-model="model"
      :class="[
        'outline-none bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
        $slots.icon && 'ps-10',
      ]"
    />
  </div>
</template>
