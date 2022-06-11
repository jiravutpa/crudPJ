import { createWebHistory, createRouter } from "vue-router";
import CreateComponent from "@/components/CreateComponent.vue";
import EditComponent from "@/components/EditComponent.vue";
import ListComponent from "@/components/ListComponent.vue";
import MaTest from "@/components/MaTest.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: CreateComponent,
  },
  {
    path: "/view",
    name: "view",
    component: ListComponent,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditComponent,
  },
  {
    path: "/matest",
    name: "matest",
    component: MaTest,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;