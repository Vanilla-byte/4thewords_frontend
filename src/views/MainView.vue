<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { type Legend, type Canton, type Category, type District, type Province } from "@/schemas/legends";
import SearchBar from "@/components/SearchBar.vue";
import CardLegend from "@/components/CardLegend.vue";
import { debounce } from "@/utils";
import { Duration, Match } from "effect";
import { useLegendStore } from "@/stores";
import { useNotify } from "@/composables/useSwal";

import { useConfirmDelete } from "@/composables/useConfirmDelete";
const { confirmDelete } = useConfirmDelete();
const { notify } = useNotify();

const escapedText = (text: string) =>
  text
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .toUpperCase()
    .trim();

const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const router = useRouter();
const store = useLegendStore();
const listLegendFiltred = ref<Legend[]>([]);

export type Filters = {
  name?: string;
  category?: Category;
  date?: Date;
  province?: Province;
  canton?: Canton;
  district?: District;
};

const filters = reactive<Filters>({
  name: undefined,
  category: undefined,
  date: undefined,
  province: undefined,
  canton: undefined,
  district: undefined,
});

const applyFilters = () => {
  listLegendFiltred.value = store.legends.filter((legend) =>
    Match.value(legend).pipe(
      Match.when(
        () => !!filters.name && !escapedText(legend.name).includes(escapedText(filters.name)),
        () => false,
      ),
      Match.when(
        () => !!filters.category && legend.category.id !== filters.category.id,
        () => false,
      ),
      Match.when(
        () => !!filters.province && legend.province.id !== filters.province.id,
        () => false,
      ),
      Match.when(
        () => !!filters.canton && legend.canton.id !== filters.canton.id,
        () => false,
      ),
      // TODO: definir como funcionaria el filtro de fecha
      Match.when(
        () => !!filters.date && !isSameDate(new Date(legend.created_at), new Date(filters.date)),
        () => false,
      ),
      Match.when(
        () => !!filters.district && legend.district.id !== filters.district.id,
        () => false,
      ),
      Match.orElse(() => true),
    ),
  );
};

const editLegend = (legend: Legend) => {
  router.push({ name: "form-legend", params: { id: legend.id } });
};

const deleteLegend = async (id: string) => {
  const result = await store.deleteLegend(id);
  if (result) {
    return notify({
      title: "Alerta",
      text: `La leyenda de ID ${id} fue eliminada`,
      variant: "success",
    });
  } else {
    notify({
      title: "Alerta",
      text: `La leyenda de ID ${id} no se pudo eliminar`,
      variant: "warning",
    });
  }
};

const cancelDelete = (id: string) => {
  console.log(`Eliminación cancelada: ${id}`);
};
const handleDelete = (id: string) => {
  confirmDelete(id, deleteLegend, cancelDelete);
};

watch(
  filters,
  debounce(() => {
    applyFilters();
  }, Duration.seconds(0.5)),
  { deep: true },
);

onMounted(async () => {
  await store.fetchLegends();
  listLegendFiltred.value = store.legends;
});
</script>

<template>
  <div class="about">
    <search-bar
      v-model:name="filters.name"
      v-model:category="filters.category"
      v-model:date="filters.date"
      v-model:province="filters.province"
      v-model:canton="filters.canton"
      v-model:district="filters.district"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4 h-[60vh] overflow-y-auto">
      <template v-for="(legend, i) in listLegendFiltred" :key="i">
        <CardLegend :legend="legend" @edit="editLegend" @delete="handleDelete(String($event.id))" />
      </template>
    </div>
  </div>
</template>
