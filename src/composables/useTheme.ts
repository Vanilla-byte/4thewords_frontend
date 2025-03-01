import { ref, watch, onMounted } from "vue";

export default function useTheme() {
  const theme = ref(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  watch(theme, (newTheme) => {
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  onMounted(() => {
    if (
      theme.value === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      theme.value = "dark";
    }
  });

  return {
    theme,
    toggleTheme,
  };
}
