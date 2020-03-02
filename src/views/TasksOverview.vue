<template>
  <v-container>
    <v-row class="mt-6" justify="center">
      <v-col cols="12">
        <div class="todo-create mb-8 d-flex justify-space-between align-center">
          <h1 class="display-1">Tasks</h1>
          <v-btn color="indigo" class="mr-4" @click.stop="dialog = true"
            >Create Task</v-btn
          >
        </div>
        <TaskTable :todos="todosTableData" />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="640">
      <v-card>
        <v-card-title class="headline">Create a new Task</v-card-title>
        <v-card-text>
          <TodoCreate @closeDialog="closeDialog" />
        </v-card-text>
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
    ...mapActions("todos", ["fetchTodos"]),
    ...mapActions("users", ["fetchUsers"]),
    closeDialog() {
      this.dialog = false;
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
