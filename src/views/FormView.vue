<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

import { InputSelect, InputText, TextArea, InputFile } from "@/components/ui";
import { Legend } from "@/schemas/legends";
import { useLegendStore } from "@/stores";

const route = useRoute();

const emptyLegend = {
  id: null,
  name: "",
  category: { id: null, name: "" },
  description: "",
  legend_date: "",
  location: {
    province: { id: null, name: "" },
    canton: {
      id: null,
      name: "",
      province_id: null,
    },
    district: {
      id: null,
      name: "",
      canton_id: null,
    },
  },
  image: "",
  source: "",
} satisfies Legend;

const store = useLegendStore();
const imageModel = ref<FileList | null>(null);
const form = ref<Legend>(emptyLegend);
const errors = ref<{ [key: string]: string[] }>({});

const filteredCantons = computed(() => store.cantons.filter((c) => c.province_id === form.value.location.province.id));
const filteredDistricts = computed(() => store.districts.filter((d) => d.canton_id === form.value.location.canton.id));

watch(
  () => route.params.id,
  async (newValue) => {
    const legend = await store.getLegendById(Number(newValue));
    form.value = legend ?? emptyLegend;
    if (!legend) console.log("No existe");
  },
  { immediate: true },
);

watch(
  () => form.value.location.province.id,
  (newValue, oldValue) => {
    if (newValue !== null && oldValue !== null) {
      form.value.location.canton = emptyLegend.location.canton;
      form.value.location.district = emptyLegend.location.district;
    }
  },
  { deep: true },
);

watch(
  () => form.value.location.canton.id,
  (newValue, oldValue) => {
    if (newValue !== null && oldValue !== null) {
      form.value.location.district = emptyLegend.location.district;
    }
  },
  { deep: true },
);

// Validación con Zod
const validateForm = () => {
  console.log(form.value);
  const result = Legend.safeParse(form.value);

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    return false;
  }
  errors.value = {};
  return true;
};
const saveLegend = () => {
  if (validateForm()) {
    console.log("✅ Formulario válido:", form.value);
    store.addLegend(form.value);
  } else {
    console.error("❌ Errores de validación:", errors.value);
  }
};
onMounted(async () => {
  await store.fetchCategories();
  await store.fetchProvinces();
  await store.fetchCantons();
  await store.fetchDistricts();
});
</script>

<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold">{{ route.params.id ? "Editar Leyenda" : "Crear Leyenda" }}</h2>
    <form @submit.prevent="saveLegend" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input-text v-model="form.name" type="text" required>
          <template #icon>
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path
                d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
              />
            </svg>
          </template>
        </input-text>
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
        <input-select v-model="form.category" :options="store.categories" />
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de la Leyenda</label>
        <input
          v-model="form.legend_date"
          type="date"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
        />
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provincia</label>
        <input-select v-model="form.location.province" :options="store.provinces">
          <template #manual-options>
            <option value="" disabled>Seleccione una provincia</option>
          </template>
        </input-select>
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantón</label>
        <input-select
          v-model="form.location.canton"
          :options="filteredCantons"
          :disabled="filteredCantons.length === 0"
        >
          <template #manual-options>
            <option value="" disabled>Seleccione un cantón</option>
          </template>
        </input-select>
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito</label>
        <input-select
          v-model="form.location.district"
          :options="filteredDistricts"
          :disabled="filteredDistricts.length === 0"
        >
          <template #manual-options>
            <option value="" disabled>Seleccione un distrito</option>
          </template>
        </input-select>
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL de Imagen</label>
        <input-file v-model="imageModel" required />
      </div>
      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fuente</label>
        <input-text v-model="form.source" type="text" required />
      </div>
      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
        <text-area v-model="form.description" required />
      </div>

      <div class="w-full ml-auto">
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition m-0">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>
