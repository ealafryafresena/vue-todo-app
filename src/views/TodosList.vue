<template>
  <v-container>
    <h1 class="display-1 mt-8 mb-8">Task Manager</h1>
    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="todosColumn in todosColumns"
        :key="todosColumn.columnName"
      >
        <h2 class="headline">
          {{ todosColumn.columnName }}
          <span
            v-if="todosColumn.columnData.length"
            class="title font-weight-regular"
            >({{ todosColumn.columnData.length }})</span
          >
        </h2>
        <div v-if="!todosColumn.columnData.length">
          <v-card class="mx-auto mb-2" max-width="500" outlined>
            <v-card-text>
              <v-list-item-title>
                No Tasks in
                <strong>{{ todosColumn.columnName }}</strong>
              </v-list-item-title>
            </v-card-text>
          </v-card>
        </div>
        <TodoItem
          class="mb-4"
          v-else
          v-for="todo in todosColumn.columnData"
          :key="todo.id"
          :todo="todo"
          @showDetails="showDetails(todo.id)"
          @updateStatusNext="statusNext(todo.id)"
          @updateStatusBack="statusBack(todo.id)"
          @editTodo="editTodo(todo.id)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "todos-list",
  components: { TodoItem },
  created() {
    this.fetchTodos();
  },
  computed: {
    ...mapGetters("todos", ["todos"]),
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
    }
  },
  methods: {
    ...mapActions("todos", [
      "fetchTodos",
      "updateStatusBack",
      "updateStatusNext"
    ]),
    showDetails(id) {
      this.$router.push({ name: "todo-details", params: { id } });
    },
    statusNext(id) {
      this.updateStatusNext(id);
    },
    statusBack(id) {
      this.updateStatusBack(id);
    },
    editTodo(id) {
      this.$router.push({ name: "todo-edit", params: { id } });
    },
    sortTodosByPriority(a, b) {
      return a.priority - b.priority;
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  max-width: 500px;
  margin: auto;
}
</style>
