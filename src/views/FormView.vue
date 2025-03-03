<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Match } from "effect";

import { InputSelect, InputText, TextArea, InputFile } from "@/components/ui";
import { Legend, type LegendDto } from "@/schemas/legends";
import { useLegendStore } from "@/stores";
import { useNotify } from "@/composables/useSwal";

const route = useRoute();
const { notify } = useNotify();
const extractFirst = <T,>(value: T | T[]): T => (Array.isArray(value) ? value[0] : value);

const emptyLegend = {
  id: null,
  name: "",
  category: { id: null, name: "" },
  description: "",
  legend_date: "",
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
  image_url: "",
  source: "",
} satisfies LegendDto;

const store = useLegendStore();
const imageModel = ref<File | null>(null);
const form = ref<LegendDto>(structuredClone(emptyLegend));
const errors = ref<{ [key: string]: string[] }>({});

const filteredCantons = computed(() => store.cantons.filter((c) => c.province_id === form.value.province.id));
const filteredDistricts = computed(() => store.districts.filter((d) => d.canton_id === form.value.canton.id));

watch(
  () => route.params.id,
  async (newValue) => {
    const id = extractFirst(newValue);
    const legend = await store.getLegendById(id);
    form.value = legend ?? structuredClone(emptyLegend);
    if (!legend && route.params.id)
      notify({
        title: "Alerta",
        text: `La leyenda de ID ${newValue} no existe`,
        variant: "warning",
      });
  },
  { immediate: true },
);

watch(
  () => form.value.province.id,
  (newValue, oldValue) => {
    if (newValue !== null && oldValue !== null) {
      console.log(emptyLegend);
      form.value.canton = structuredClone(emptyLegend.canton);
      form.value.district = structuredClone(emptyLegend.district);
    }
  },
);

watch(
  () => form.value.canton.id,
  (newValue, oldValue) => {
    if (newValue !== null && oldValue !== null) {
      form.value.district = structuredClone(emptyLegend.district);
    }
  },
);

const validateForm = () => {
  const result = Legend.safeParse(form.value);

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    return false;
  }
  errors.value = {};
  return true;
};

const saveLegend = async () => {
  if (validateForm()) {
    if (imageModel.value === null) {
      return notify({
        title: "Error",
        text: "la imagen es requerida",
        variant: "error",
      });
    }

    const id = extractFirst(route.params.id);
    const result = await Match.value(id).pipe(
      Match.when(
        (id) => !!id,
        async (id) => store.updateLegend(id, form.value, imageModel.value as File),
      ),
      Match.orElse(async () => store.createLegend(form.value, imageModel.value as File)),
    );

    if (result) {
      form.value = structuredClone(emptyLegend);
      imageModel.value = null;
      return notify({
        title: "Excelente",
        text: "La operacion se realizo con exito",
        variant: "success",
      });
    }
    notify({
      title: "Notificación",
      text: "No se puedo guardar el registro",
      variant: "warning",
    });
  } else {
    return notify({
      title: "Notificación",
      text: "Faltan datos en el formulario",
      variant: "info",
    });
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
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
      {{ route.params.id ? "Editar Leyenda" : "Crear Leyenda" }}
    </h2>
    <form @submit.prevent="saveLegend" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input-text required v-model="form.name" type="text">
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
        <input-select required v-model="form.category" :options="store.categories" />
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de la Leyenda</label>
        <input
          required
          v-model="form.legend_date"
          type="date"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
        />
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provincia</label>
        <input-select required v-model="form.province" :options="store.provinces">
          <template #manual-options>
            <option value="" disabled>Seleccione una provincia</option>
          </template>
        </input-select>
      </div>

      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantón</label>
        <input-select
          required
          v-model="form.canton"
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
          required
          v-model="form.district"
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
        <input-file required v-model="imageModel" />
      </div>
      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fuente</label>
        <input-text required v-model="form.source" type="text" />
      </div>
      <div class="w-full">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
        <text-area required v-model="form.description" />
      </div>

      <div class="w-full ml-auto">
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition m-0">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>
