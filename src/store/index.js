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
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    UPDATE_TODO(state, id) {
      state.todos.find(todo => todo.id === id);
    },
    DELETE_TODO(state, id) {
      const index = state.todos.findIndex(todo => todo.id == id);
      state.todos.splice(index, 1);
    }
  },
  actions: {
    createTodo({ commit }, todo) {
      return TodoService.postTodo(todo).then(() => {
        commit("ADD_TODO", todo);
      });
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
    deleteTodo({ commit }, id) {
      return TodoService.deleteTodo(id).then(() => {
        commit("DELETE_TODO", id);
      });
    }
  },
  getters: {
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id);
    },
    todos: state => state.todos
  }
});
