<template>
  <v-container>
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8">
        <h1 class="display-1 mb-8">Edit Task</h1>
        <div class="mt-4 mb-9">
          <v-form v-model="formValidty">
            <v-text-field
              label="Title"
              v-model="todo.title"
              outlined
              :rules="titleRules"
              clearable
              required
            ></v-text-field>
            <v-textarea
              outlined
              label="Description"
              v-model="todo.description"
              clearable
            ></v-textarea>
            <v-select
              :items="selectPriorities"
              item-text="text"
              item-value="value"
              label="Select a priority"
              outlined
              v-model="todo.priority"
            ></v-select>
            <v-select
              :items="selectStatus"
              item-text="text"
              item-value="value"
              label="Select a Status"
              outlined
              v-model="todo.status"
            ></v-select>
            <div class="todo-edit-actions">
              <v-btn color="blue" outlined class="mr-4" @click="cancelEdit"
                >Cancel</v-btn
              >
              <v-btn
                color="blue"
                outlined
                class="mr-4"
                @click.stop="dialog = true"
                >Delete Task</v-btn
              >
              <v-btn
                color="blue"
                :disabled="!formValidty"
                @click="editTodo(todo.id)"
                >Save</v-btn
              >
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="440">
      <v-card>
        <v-card-title class="headline">Delete Task</v-card-title>

        <v-card-text
          >Do you really want to permanently delete the task?</v-card-text
        >
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue" outlined text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="blue" dark @click="deleteTodo(todo.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "todo-edit",
  props: ["id"],
  data() {
    return {
      todo: {},
      priorities: this.$store.state.priorities,
      statuses: this.$store.state.statuses,
      dialog: false,
      selectPriorities: [
        { text: "High", value: this.$store.state.priorities[0] },
        { text: "Medium", value: this.$store.state.priorities[1] },
        { text: "Low", value: this.$store.state.priorities[2] }
      ],
      selectStatus: [
        { text: "Todo", value: "todo" },
        { text: "Progress", value: "progress" },
        { text: "Done", value: "done" }
      ],
      titleRules: [value => !!value || "Title is required"],
      formValidty: false
    };
  },
  created() {
    this.todo = this.$store.getters.getTodoById(this.id);
  },
  methods: {
    editTodo(id) {
      this.todo.updatedAt = Date.now();
      this.todo.description === null
        ? (this.todo.description = "")
        : this.todo.description;
      this.$store.dispatch("editTodo", id);
      this.$router.push({ name: "todos-list", params: { id } });
    },
    cancelEdit() {
      this.$router.push({ name: "todos-list" });
    },
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id);
      this.dialog = false;
      this.$router.push({ name: "todos-list" });
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-edit-actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .theme--light.v-btn {
    color: white;
  }
}
</style>
