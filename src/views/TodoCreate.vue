<template>
  <v-container>
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8">
        <h1 class="display-1 mb-8">Create a Task</h1>
        <div class="mt-4 mb-8">
          <v-form v-model="formValidty">
            <v-text-field
              label="Add a Task Title *"
              v-model="todo.title"
              outlined
              :rules="titleRules"
              required
            ></v-text-field>
            <v-textarea
              outlined
              label="Add a Task Description"
              v-model="todo.description"
            ></v-textarea>
            <v-select
              :items="selectUser"
              item-text="text"
              item-value="value"
              label="Select a User *"
              outlined
              v-model="todo.userId"
              :rules="userRules"
              required
            ></v-select>
            <v-select
              :items="selectPriorities"
              item-text="text"
              item-value="value"
              label="Select a Priority *"
              outlined
              v-model="todo.priority"
              :rules="priorityRules"
              required
            ></v-select>
            <div class="todo-create-actions d-flex justify-space-between">
              <div class="todo-create-info subtitle-1 font-weight-regular">
                * Required
              </div>
              <div>
                <v-btn color="blue" outlined class="mr-4" @click="cancelCreate"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue"
                  :disabled="!formValidty"
                  @click="submitCreateTodo"
                  >Create Task</v-btn
                >
              </div>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { prioritiesLookUp } from "@/services/LookUpService";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "todo-create",
  data() {
    return {
      todo: this.createFreshTodoObject(),
      selectPriorities: prioritiesLookUp,
      titleRules: [value => !!value || "Title is required"],
      priorityRules: [value => !!value || "Select a Priority"],
      userRules: [value => !!value || "Select a User"],
      formValidty: false
    };
  },
  computed: {
    ...mapGetters("users", ["users"]),
    selectUser() {
      const renamedKeys = this.users.map(
        ({ id: value, firstName: firstName, lastName: lastName }) => ({
          value,
          text: `${firstName} ${lastName}`
        })
      );
      return renamedKeys;
    }
  },
  methods: {
    ...mapActions("todos", ["createTodo"]),
    async submitCreateTodo() {
      this.createTodo(this.todo);

      await this.$router.push({
        name: "todos-list",
        params: { id: this.todo.id }
      });
      this.todo = await this.createFreshTodoObject();
    },
    createFreshTodoObject() {
      const id = Math.floor(Math.random() * 10000000);
      return {
        id: id,
        priority: 0,
        title: "",
        description: "",
        createdAt: Date.now(),
        updatedAt: null,
        status: "todo",
        userId: 0
      };
    },
    cancelCreate() {
      this.$router.push({ name: "todos-list" });
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-create-actions {
  width: 100%;

  .theme--light.v-btn {
    color: white;
  }
}
.todo-create-info {
  color: rgba(0, 0, 0, 0.6);
}
</style>
