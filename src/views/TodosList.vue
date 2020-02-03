<template>
  <div class="todo-list">
    <h1>Simple Task Manager</h1>
    <div class="todo-list-wrapper">
      <div class="todo-list-col">
        <h2>Todo</h2>
        <TodoItem v-for="todo in openTodos" :key="todo.id" :todo="todo" />
      </div>
      <div class="todo-list-col">
        <h2>In Progress</h2>
        <TodoItem v-for="todo in inProgressTodos" :key="todo.id" :todo="todo" />
      </div>
      <div class="todo-list-col">
        <h2>Done</h2>
        <TodoItem v-for="todo in doneTodos" :key="todo.id" :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import { mapState } from "vuex";

export default {
  name: "todos-list",
  components: { TodoItem },
  created() {
    this.$store.dispatch("fetchTodos");
  },
  computed: {
    openTodos() {
      return this.todos.filter(todo => todo.status === "todo");
    },
    inProgressTodos() {
      return this.todos.filter(todo => todo.status === "progress");
    },
    doneTodos() {
      return this.todos.filter(todo => todo.status === "done");
    },
    ...mapState({ todos: state => state.todos })
  }
};
</script>

<style lang="scss" scoped>
.todo-list {
  &-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  &-col {
    margin: 0 10px;
  }

  h2 {
    margin: 0;
  }
}
</style>
