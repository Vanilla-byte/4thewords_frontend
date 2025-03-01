<script setup lang="ts">
import { ref } from "vue";
import { Bars3Icon } from "@heroicons/vue/24/solid";
import useTheme from "../composables/useTheme";

const { theme, toggleTheme } = useTheme();

const isDrawerOpen = ref(true);
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>

<template>
  <div class="flex h-screen w-full flex-col bg-gray-100 dark:bg-gray-900 transition-all">
    <header class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      <button @click="toggleDrawer" class="p-2 text-gray-600 dark:text-gray-300">
        <Bars3Icon class="w-6 h-6" />
      </button>

      <div class="flex items-center gap-4">
        <label class="flex items-center cursor-pointer">
          <button @click="toggleTheme" class="p-2 rounded-md">
            {{ theme === "light" ? "🌙" : "☀️" }}
          </button>
        </label>
        <img src="/demo/images/avatar/avatar-m-3@2x.png" alt="Avatar" class="w-10 h-10 rounded-full" />
      </div>
    </header>

    <div class="flex flex-1">
      <aside
        class="bg-white dark:bg-gray-800 shadow-md transition-all duration-300"
        :class="isDrawerOpen ? 'w-64 p-4' : 'w-0 opacity-0 pointer-events-none'"
      >
        <p class="text-lg font-semibold text-gray-800 dark:text-gray-300">Menú</p>
        <ul class="mt-4 space-y-2">
          <li class="text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer">
            <router-link to="/"> Home </router-link>
          </li>
          <li class="text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer">
            <router-link to="/form-legend"> Add legend </router-link>
          </li>
        </ul>
      </aside>

      <main class="flex-1 p-6 bg-gray-50 dark:bg-gray-900 transition-all pb-16">
        <router-view />
      </main>
    </div>

    <footer
      class="fixed w-full bottom-0 p-4 bg-white dark:bg-gray-800 shadow-md text-center text-gray-600 dark:text-gray-300"
    >
      © 2025 - Legends
    </footer>
  </div>
</template>
