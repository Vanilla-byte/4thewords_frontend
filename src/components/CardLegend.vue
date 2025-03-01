<script setup lang="ts">
import { type Legend } from "@/service/legends-service";

defineProps<{ legend: Legend }>();
</script>

<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
      <img :src="legend.image" alt="Imagen de la leyenda" class="w-full h-56 object-cover" />

      <div class="p-6">
        <span
          class="text-sm font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full dark:bg-red-700 dark:text-red-200"
        >
          {{ legend.category.name }}
        </span>

        <h2 class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          {{ legend.name }}
        </h2>

        <p class="mt-2 text-gray-700 dark:text-gray-300 text-sm">
          {{ legend.description }}
        </p>

        <div class="mt-4 text-gray-500 dark:text-gray-400 text-sm flex flex-col gap-1">
          <p>📅 <strong>Fecha:</strong> {{ legend.legend_date }}</p>
          <p>
            📍 <strong>Ubicación:</strong> {{ legend.location.district.name }}, {{ legend.location.canton.name }},
            {{ legend.location.province.name }}
          </p>
        </div>

        <div class="mt-4">
          <p class="text-xs text-gray-500 dark:text-gray-400">🔗 Fuente: {{ legend.source }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
