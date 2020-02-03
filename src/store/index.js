import Vue from "vue";
import Vuex from "vuex";
import TodoService from "@/services/TodoService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    priorities: ["High", "Medium", "Low"],
    todos: []
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    createTodo({ commit }, todo) {
      return TodoService.postTodo(todo).then(() => {
        commit("ADD_TODO", todo);
      });
    },
    fetchTodos({ commit }) {
      TodoService.getTodos()
        .then(response => {
          commit("SET_TODOS", response.data);
        })
        .catch(error => {
          this.errorMessage = error.response;
        });
    }
  },
  getters: {
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id);
    }
  }
});
