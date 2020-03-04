<template>
  <v-container>
    <v-row class="mt-6" justify="center">
      <v-col cols="12">
        <div class="todo-create mb-8 d-flex justify-space-between align-center">
          <h1 class="display-1">Tasks</h1>
          <v-btn color="indigo" class="mr-4" @click.stop="createDialog = true"
            >Create Task</v-btn
          >
        </div>
        <TaskTable
          :todos="todosTableData"
          @openDeleteDialog="openDeleteDialog"
          @deleteTodo="emittedTodoData"
        />
      </v-col>
    </v-row>
    <v-dialog v-model="createDialog" max-width="640">
      <v-card>
        <v-card-title class="headline">Create a new Task</v-card-title>
        <v-card-text>
          <TodoCreate @closeDialog="closeDialog" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="440">
      <v-card>
        <v-card-title class="headline">Delete Task</v-card-title>

        <v-card-text>
          Do you really want to delete the task
          <strong>
            <i>{{ todoTitle }}</i> </strong
          >?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="indigo" outlined text @click="deleteDialog = false"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="indigo" dark @click="submitDeleteTodo">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TaskTable from "@/components/TaskTable.vue";
import TodoCreate from "@/components/TodoCreate.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TaskTable,
    TodoCreate
  },
  data() {
    return {
      createDialog: false,
      deleteDialog: false,
      todoId: null,
      todoTitle: ""
    };
  },
  created() {
    this.fetchUsers();
    this.fetchTodos();
  },
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("todos", ["todos"]),
    todosTableData() {
      this.todos.map(todo => {
        const user = this.users.find(user => user.id === todo.userId);
        const { firstName, lastName, avatarColor } = user;
        todo.firstName = firstName;
        todo.lastName = lastName;
        todo.avatarColor = avatarColor;
      });
      return this.todos;
    }
  },
  methods: {
    ...mapActions("todos", ["deleteTodo", "fetchTodos"]),
    ...mapActions("users", ["fetchUsers"]),
    closeDialog() {
      this.createDialog = false;
    },
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    emittedTodoData(id, title) {
      this.todoId = id;
      this.todoTitle = title;
    },
    submitDeleteTodo() {
      this.deleteTodo(this.todoId);
      this.deleteDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-create {
  .theme--light.v-btn {
    color: white;
  }
}
</style>
