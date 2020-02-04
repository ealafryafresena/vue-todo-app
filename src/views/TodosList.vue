<template>
  <div class="todo-list">
    <h1>Simple Task Manager</h1>
    <div class="todo-list-wrapper">
      <div
        class="todo-list-col"
        v-for="todosColumn in todosColumns"
        :key="todosColumn.columnName"
      >
        <h2>{{ todosColumn.columnName }}</h2>
        <div
          class="todo-list-item-placeholder"
          v-if="!todosColumn.columnData.length"
        >
          <h2>No Tasks in {{ todosColumn.columnName }}</h2>
        </div>
        <TodoItem
          v-else
          v-for="todo in todosColumn.columnData"
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
    todosColumns() {
      return [
        { columnName: "Todo", columnData: this.openTodos },
        { columnName: "Progress", columnData: this.inProgressTodos },
        { columnName: "Done", columnData: this.doneTodos }
      ];
    },
    openTodos() {
      return this.todos
        .filter(todo => todo.status === "todo")
        .sort(this.sortTodosByPriority);
    },
    inProgressTodos() {
      return this.todos
        .filter(todo => todo.status === "progress")
        .sort(this.sortTodosByPriority);
    },
    doneTodos() {
      return this.todos
        .filter(todo => todo.status === "done")
        .sort(this.sortTodosByPriority);
    },
    ...mapState({ todos: state => state.todos })
  },
  methods: {
    showDetails(id) {
      this.$router.push({ name: "todo-details", params: { id } });
    },
    updateStatus(id) {
      this.$store.dispatch("updateStatus", id);
    },
    sortTodosByPriority(a, b) {
      return a.priority - b.priority;
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
