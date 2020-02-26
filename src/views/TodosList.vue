<template>
  <v-container>
    <div class="user-bar mt-3 d-flex justify-end">
      <UserInitials
        class="ml-2"
        v-for="user in users"
        :key="user.id"
        :user="user"
        :initials-style="initialsStyle"
      />
    </div>
    <h1 class="display-1 mt-2 mb-8">Task Manager</h1>
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
import UserInitials from "@/components/UserInitials.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "todos-list",
  components: { TodoItem, UserInitials },
  data() {
    return {
      initialsStyle: {
        width: "36px",
        height: "36px",
        fontSize: "16px"
      }
    };
  },
  created() {
    this.fetchUsers();
    this.fetchTodos();
  },
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("todos", ["todos"]),
    todosColumns() {
      return [
        { columnName: "Todo", columnData: this.openTodos },
        { columnName: "Progress", columnData: this.inProgressTodos },
        { columnName: "Done", columnData: this.doneTodos }
      ];
    },
    userTodos() {
      this.todos.map(todo => {
        const user = this.users.find(user => user.id === todo.userId);
        const { firstName, lastName } = user;
        todo.firstName = firstName;
        todo.lastName = lastName;
      });
      return this.todos;
    },
    openTodos() {
      return this.userTodos
        .filter(todo => todo.status === "todo")
        .sort(this.sortTodosByPriority);
    },
    inProgressTodos() {
      return this.userTodos
        .filter(todo => todo.status === "progress")
        .sort(this.sortTodosByPriority);
    },
    doneTodos() {
      return this.userTodos
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
    ...mapActions("users", ["fetchUsers"]),
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
