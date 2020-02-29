<template>
  <v-container>
    <h1 class="display-1 mt-2 mb-8">Task Board</h1>
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
    <v-dialog v-model="dialog" max-width="640">
      <v-card>
        <v-card-title class="headline">Task Details</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <TodoDetail :todo="todo" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mt-1 mr-3 mb-1"
            color="blue"
            outlined
            text
            @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TodoDetail from "@/components/TodoDetail.vue";
import TodoItem from "@/components/TodoItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "todos-list",
  components: {
    TodoItem,
    TodoDetail
  },
  data() {
    return {
      todo: {},
      dialog: false
    };
  },
  created() {
    this.fetchUsers();
    this.fetchTodos();
  },
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("todos", ["todos"]),
    ...mapGetters("todos", ["getTodoById"]),
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
        const { firstName, lastName, avatarColor } = user;
        todo.firstName = firstName;
        todo.lastName = lastName;
        todo.avatarColor = avatarColor;
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
      this.todo = this.getTodoById(id);
      this.dialog = true;
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
