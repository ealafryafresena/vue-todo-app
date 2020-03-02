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
              :counter="50"
              clearable
              required
            ></v-text-field>
            <v-textarea
              outlined
              label="Description"
              v-model="todo.description"
              :rules="descriptionRules"
              :counter="500"
              clearable
            ></v-textarea>
            <v-select
              :items="selectUser"
              item-text="text"
              item-value="value"
              label="Select User"
              outlined
              v-model="todo.userId"
            ></v-select>
            <v-select
              :items="selectPriorities"
              item-text="text"
              item-value="value"
              label="Select Priority"
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
              <v-btn color="indigo" outlined class="mr-4" @click="cancelEdit"
                >Cancel</v-btn
              >
              <v-btn
                color="indigo"
                outlined
                class="mr-4"
                @click.stop="dialog = true"
                >Delete Task</v-btn
              >
              <v-btn
                color="indigo"
                :disabled="!formValidty"
                @click="submitEditTodo(todo.id)"
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
          <v-btn color="indigo" outlined text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="indigo" dark @click="submitDeleteTodo(todo.id)"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { prioritiesLookUp, statusLookUp } from "@/services/LookUpService";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "todo-edit",
  props: ["id"],
  data() {
    return {
      todo: {},
      dialog: false,
      selectPriorities: prioritiesLookUp,
      selectStatus: statusLookUp,
      titleRules: [
        value => !!value || "Title is required",
        value =>
          (value && value.length <= 50) ||
          "Title must be less than 51 characters"
      ],
      descriptionRules: [
        value =>
          value.length <= 500 || "Description must be less than 501 characters"
      ],
      formValidty: false
    };
  },
  created() {
    this.todo = this.getTodoById(this.id);
  },
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("todos", ["getTodoById"]),
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
    ...mapActions("todos", ["deleteTodo", "editTodo"]),
    submitEditTodo(id) {
      this.todo.updatedAt = Date.now();
      this.todo.description === null
        ? (this.todo.description = "")
        : this.todo.description;
      this.editTodo(id);
      this.$router.push({ name: "todos-list", params: { id } });
    },
    cancelEdit() {
      this.$router.push({ name: "todos-list" });
    },
    submitDeleteTodo(id) {
      this.deleteTodo(id);
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
