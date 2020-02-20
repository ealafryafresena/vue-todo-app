import Vue from "vue";
import Vuex from "vuex";
import TodoService from "@/services/TodoService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    priorities: [1, 2, 3],
    statuses: ["todo", "progress", "done"],
    todos: []
  },
  mutations: {
    ADD_TODO: (state, todo) => state.todos.push(todo),
    SET_TODOS: (state, todos) => (state.todos = todos),
    UPDATE_TODO: (state, id) => state.todos.find(todo => todo.id === id),
    DELETE_TODO: (state, id) =>
      (state.todos = state.todos.filter(todo => todo.id !== id))
  },
  actions: {
    async createTodo({ commit }, todo) {
      const response = await TodoService.postTodo(todo);
      commit("ADD_TODO", response.data);
    },
    async fetchTodos({ commit }) {
      const response = await TodoService.getTodos();
      commit("SET_TODOS", response.data);
    },
    updateStatusNext({ state, commit }, id) {
      const todoItem = state.todos.find(todo => todo.id === id);
      todoItem.status === "todo"
        ? (todoItem.status = "progress")
        : (todoItem.status = "done");
      return TodoService.updateTodo(id, todoItem.status).then(() => {
        commit("UPDATE_TODO", id);
      });
    },
    updateStatusBack({ state, commit }, id) {
      const todoItem = state.todos.find(todo => todo.id === id);
      todoItem.status === "done"
        ? (todoItem.status = "progress")
        : (todoItem.status = "todo");
      return TodoService.updateTodo(id, todoItem.status).then(() => {
        commit("UPDATE_TODO", id);
      });
    },
    editTodo({ state, commit }, id) {
      const todoItem = state.todos.find(todo => todo.id === id);
      return TodoService.editTodo(id, todoItem).then(() => {
        commit("UPDATE_TODO", id);
      });
    },
    async deleteTodo({ commit }, id) {
      await TodoService.deleteTodo(id);
      commit("DELETE_TODO", id);
    }
  },
  getters: {
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id);
    },
    todos: state => state.todos
  }
});
