<script setup lang="ts">
import { type Legend } from "@/schemas/legends";
import { BaseButton } from "@/components/ui";

defineProps<{ legend: Legend }>();
const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="max-w-md mx-auto group">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
      <header class="relative overflow-hidden transition-all duration-300">
        <img :src="legend.image_url" class="w-full aspect-square object-cover" :alt="`Image of ${legend.name}`" />

        <div
          class="absolute bottom-3 left-3 flex flex-wrap gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100"
        >
          <BaseButton size="xs" @click="emit('edit', legend)">editar</BaseButton>
          <BaseButton size="xs" variant="error" @click="emit('delete', legend)">eliminar</BaseButton>
        </div>
      </header>

      <div class="p-6 pt-2">
        <h2 class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          {{ legend.name }}
        </h2>
        <span
          class="text-sm font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full dark:bg-red-700 dark:text-red-200"
        >
          {{ legend.category.name }}
        </span>

        <p class="mt-2 text-gray-700 dark:text-gray-300 text-sm">
          {{ legend.description }}
        </p>

        <div class="mt-4 text-gray-500 dark:text-gray-400 text-sm flex flex-col gap-1">
          <p>📅 <strong>Fecha:</strong> {{ legend.relative_created_at }}</p>
          <p>
            📍 <strong>Ubicación:</strong> {{ legend.district.name }}, {{ legend.canton.name }},
            {{ legend.province.name }}
          </p>
        </div>

        <div class="mt-4">
          <p class="text-xs text-gray-500 dark:text-gray-400">🔗 Fuente: {{ legend.source }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
