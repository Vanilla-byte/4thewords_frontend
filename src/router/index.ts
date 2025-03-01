import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import MainView from "@/views/MainView.vue";
import FormView from "@/views/FormView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainLayout",
      component: MainLayout,
      children: [
        {
          path: "/",
          name: "legends",
          component: MainView,
        },
        {
          path: "/form-legend",
          name: "form-legend",
          component: FormView,
        },
      ],
    },
  ],
});

export default router;
