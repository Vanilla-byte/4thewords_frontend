<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type Canton, type Category, type District, type Province } from "@/schemas/legends";
import { InputSelect, InputText } from "@/components/ui";
import { useListForFilters } from "@/service";

const { fetchListOfCategories, fetchListOfDistricts, fetchListOfCantons, fetchListOfProvinces } = useListForFilters();

const modelName = defineModel<string>("name");
const modelCategory = defineModel<Category>("category");
const modelDate = defineModel<Date>("date");
const modelProvince = defineModel<Province>("province");
const modelCanton = defineModel<Canton>("canton");
const modelDistrict = defineModel<District>("district");

const categories = ref<Category[]>([]);
const provinces = ref<Province[]>([]);
const cantonsFetch = ref<Canton[]>([]);
const districtsFetch = ref<District[]>([]);

const cantons = ref<Canton[]>([]);
const districts = ref<District[]>([]);

const loadCantons = () => {
  modelCanton.value = undefined;
  modelDistrict.value = undefined;
  cantons.value = cantonsFetch.value.filter((c) => c.province_id === modelProvince.value?.id);
};

const loadDistricts = () => {
  modelDistrict.value = undefined;
  districts.value = districtsFetch.value.filter((d) => d.canton_id === modelCanton.value?.id);
};

onMounted(async () => {
  categories.value = await fetchListOfCategories();
  provinces.value = await fetchListOfProvinces();
  cantonsFetch.value = await fetchListOfCantons();
  districtsFetch.value = await fetchListOfDistricts();
});
</script>

<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input-text v-model="modelName" type="text" placeholder="Buscar..." />
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
        <input-select v-model="modelCategory" :options="categories">
          <template #manual-options>
            <option value="">Todas</option>
          </template>
        </input-select>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
        <input
          v-model="modelDate"
          type="date"
          disabled
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
        />
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provincia</label>
        <input-select v-model="modelProvince" :options="provinces" @change="loadCantons">
          <template #manual-options>
            <option value="">Selecciona una provincia</option>
          </template>
        </input-select>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantón</label>
        <input-select v-model="modelCanton" :options="cantons" @change="loadDistricts" :disabled="!modelProvince">
          <template #manual-options>
            <option value="">Selecciona un cantón</option>
          </template>
        </input-select>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distrito</label>
        <input-select v-model="modelDistrict" :options="districts" :disabled="!modelCanton">
          <template #manual-options>
            <option value="">Selecciona un distrito</option>
          </template>
        </input-select>
      </div>
    </div>
  </div>
</template>
