<template>
  <div class="todo-list">
    <h1>Simple Task Manager</h1>
    <div class="todo-list-wrapper">
      <!--  ToDo: refactor columns -->
      <div class="todo-list-col">
        <h2>Todo</h2>
        <div class="todo-list-item-placeholder" v-if="!openTodos.length">
          <h2>No Tasks in Todo</h2>
        </div>
        <TodoItem
          v-else
          v-for="todo in openTodos"
          :key="todo.id"
          :todo="todo"
          @showDetails="showDetails(todo.id)"
          @updateStatus="updateStatus(todo.id)"
        />
      </div>
      <div class="todo-list-col">
        <h2>In Progress</h2>
        <div class="todo-list-item-placeholder" v-if="!inProgressTodos.length">
          <h2>No Tasks in Progress</h2>
        </div>
        <TodoItem
          v-for="todo in inProgressTodos"
          :key="todo.id"
          :todo="todo"
          @showDetails="showDetails(todo.id)"
          @updateStatus="updateStatus(todo.id)"
        />
      </div>
      <div class="todo-list-col">
        <h2>Done</h2>
        <div class="todo-list-item-placeholder" v-if="!doneTodos.length">
          <h2>No Tasks in Done</h2>
        </div>
        <TodoItem
          v-for="todo in doneTodos"
          :key="todo.id"
          :todo="todo"
          @showDetails="showDetails(todo.id)"
          @updateStatus="updateStatus(todo.id)"
        />
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
  },
  methods: {
    showDetails(id) {
      this.$router.push({ name: "todo-details", params: { id } });
    },
    updateStatus(id) {
      this.$store.dispatch("updateStatus", id);
    }
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
    width: 320px;
  }

  &-item-placeholder {
    padding: 10px;
    margin: 10px 0;
    background-color: #e5e5e5;
    width: 300px;
  }

  h2 {
    margin: 0;
  }
}
</style>
