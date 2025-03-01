<script setup lang="ts">
const model = defineModel();

function handlePhoto(event: Event) {
  const valF = (event.target as HTMLInputElement)?.files;
  model.value = valF;
}
</script>

<template>
  <input
    @change="handlePhoto"
    class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    type="file"
  />
</template>
