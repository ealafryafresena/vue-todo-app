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
    },
    UPDATE_TODO_STATUS(state, id) {
      state.todos.find(todo => todo.id === id);
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
    },
    updateStatus({ state, commit }, id) {
      const todoItem = state.todos.find(todo => todo.id === id);
      todoItem.status === "todo"
        ? (todoItem.status = "progress")
        : (todoItem.status = "done");
      return TodoService.updateTodo(id, todoItem.status).then(() => {
        commit("UPDATE_TODO_STATUS", id);
      });
    }
  },
  getters: {
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id);
    }
  }
});
