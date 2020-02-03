import Vue from "vue";
import VueRouter from "vue-router";
import TodosList from "../views/TodosList.vue";
import TodoDetails from "../views/TodoDetails.vue";
import TodoCreate from "../views/TodoCreate.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todos-list",
    component: TodosList
  },
  {
    path: "/todo/create",
    name: "todo-create",
    component: TodoCreate
  },
  {
    path: "/todo/:id",
    name: "todo-details",
    component: TodoDetails,
    props: true
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
