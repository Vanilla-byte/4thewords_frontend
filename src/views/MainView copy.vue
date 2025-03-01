<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useLegends, type Legend } from "@/service/legends-service";
import SearchBar from "@/components/SearchBar.vue";
import CardLegend from "@/components/CardLegend.vue";
import { Effect, pipe } from "effect";

const escapedText = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").toUpperCase();

const { fetchLegends } = useLegends();
const listLegends = ref<Legend[]>([]);

const name = ref<string>("");
const category = ref<string>("");
const date = ref<Date>();
const province = ref<string>();
const canton = ref<string>();
const district = ref<string>();

const listLegendFiltred = computed<Legend[]>(() => {
  const nameEscaped = escapedText(name.value);
  return pipe(
    Effect.succeed(listLegends.value),
    Effect.map((data) => (nameEscaped ? data.filter((l) => escapedText(l.name).includes(nameEscaped)) : data)),
    Effect.map((data) => (category.value ? data.filter((l) => l.category === category.value) : data)),
    Effect.map((data) => (province.value ? data.filter((l) => l.location.province === province.value) : data)),
    Effect.map((data) => (canton.value ? data.filter((l) => l.location.canton === canton.value) : data)),
    Effect.map((data) => (district.value ? data.filter((l) => l.location.district === district.value) : data)),
  ).pipe(Effect.runSync);
});

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
