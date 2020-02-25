import Vue from "vue";
import Vuex from "vuex";
import todos from "@/store/modules/todos";
import users from "@/store/modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    users
  }
});
