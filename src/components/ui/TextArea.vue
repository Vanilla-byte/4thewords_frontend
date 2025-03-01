<script setup lang="ts">
// import { computed } from "vue";

const model = defineModel<string>();
// const internalValue = computed({
//   get() {
//     // if (!model.value) return "";
//     return model.value;
//   },
//   set(value) {
//     if (!value) model.value = "";
//     model.value = value;
//   },
// });
</script>

<template>
  <textarea
    v-model="model"
    class="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
  ></textarea>
</template>
