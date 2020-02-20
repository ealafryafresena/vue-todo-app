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
import { mapActions } from "vuex";

export default {
  name: "todo-create",
  data() {
    return {
      todo: this.createFreshTodoObject(),
      selectPriorities: [
        { text: "High", value: this.$store.state.priorities[0] },
        { text: "Medium", value: this.$store.state.priorities[1] },
        { text: "Low", value: this.$store.state.priorities[2] }
      ],
      titleRules: [value => !!value || "Title is required"],
      priorityRules: [value => !!value || "Select a priority"],
      formValidty: false
    };
  },
  methods: {
    ...mapActions(["createTodo"]),
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
        status: "todo"
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
