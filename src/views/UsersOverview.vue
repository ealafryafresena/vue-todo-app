<template>
  <v-container>
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" sm="12">
        <div class="user-create mb-8 d-flex justify-space-between align-center">
          <h1 class="display-1">Users</h1>
          <v-btn color="blue" class="mr-4" @click.stop="dialog = true"
            >Create User</v-btn
          >
        </div>
        <UserTable :users="userTableData" />
      </v-col>
    </v-row>
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-dialog v-model="dialog" max-width="440">
          <v-card>
            <v-card-title class="headline">Create User</v-card-title>
            <v-card-text>
              <UserCreate @closeDialog="closeDialog" />
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import UserCreate from "@/components/UserCreate.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "users-overview",
  components: { UserTable, UserCreate },
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
    ...mapState("users", ["users"]),
    userTableData() {
      return this.users.map(user => {
        const todosByUser = this.todos.filter(todo => todo.userId === user.id);

        const statusTodo = todosByUser.filter(todo => todo.status === "todo");
        const statusProgress = todosByUser.filter(
          todo => todo.status === "progress"
        );
        const statusDone = todosByUser.filter(todo => todo.status === "done");

        user.todosCount = {};
        user.todosCount.statusTodo = statusTodo.length;
        user.todosCount.statusProgress = statusProgress.length;
        user.todosCount.statusDone = statusDone.length;
        return user;
      });
    }
  },
  methods: {
    ...mapActions("users", ["fetchUsers"]),
    ...mapActions("todos", ["fetchTodos"]),
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-create {
  .theme--light.v-btn {
    color: white;
  }
}
</style>
