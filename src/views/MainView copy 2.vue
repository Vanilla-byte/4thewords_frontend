<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useLegends, type Legend } from "@/service/legends-service";
import SearchBar from "@/components/SearchBar.vue";
import CardLegend from "@/components/CardLegend.vue";
import { debounce } from "@/utils";
import { Duration } from "effect";

const escapedText = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").toUpperCase();

const { fetchLegends } = useLegends();
const listLegends = ref<Legend[]>([]);
const listLegendFiltred = ref<Legend[]>([]);

const name = ref<string>("");
const category = ref<string>();
const date = ref<Date>();
const province = ref<string>();
const canton = ref<string>();
const district = ref<string>();

const filters2 = reactive({ name: "", category: "", date: undefined, province: "", canton: "", district: "" });

const filters = computed(() => [
  { key: "name", codition: (l: Legend) => !name.value || escapedText(l.name).includes(escapedText(name.value)) },
  { key: "category", codition: (l: Legend) => !category.value || l.category === category.value },
  { key: "province", codition: (l: Legend) => !province.value || l.location.province === province.value },
  { key: "canton", codition: (l: Legend) => !canton.value || l.location.canton === canton.value },
  { key: "district", codition: (l: Legend) => !district.value || l.location.district === district.value },
]);

const listLegendFiltred = computed<Legend[]>(() => {
  return listLegends.value.filter((legend) => filters.value.every(({ codition }) => codition(legend)));
});

watch(
  [name, category, date, province, canton, district],
  debounce(() => {}, Duration.seconds(0.5)),
);

onMounted(async () => {
  listLegends.value = await fetchLegends();
});
</script>

<template>
  <div class="about">
    <search-bar
      v-model:name="name"
      v-model:category="category"
      v-model:date="date"
      v-model:province="province"
      v-model:canton="canton"
      v-model:district="district"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
      <template v-for="(legend, i) in listLegendFiltred" :key="i">
        <CardLegend :legend="legend" />
      </template>
    </div>
  </div>
</template>
