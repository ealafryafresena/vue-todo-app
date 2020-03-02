<template>
  <div>
    <v-form v-model="formValidty" ref="form">
      <v-text-field
        label="Add Task Title *"
        v-model="todo.title"
        :counter="50"
        outlined
        :rules="titleRules"
        required
      ></v-text-field>
      <v-textarea
        :counter="500"
        :rules="descriptionRules"
        outlined
        label="Add Task Description"
        v-model="todo.description"
      ></v-textarea>
      <v-select
        :items="selectUser"
        item-text="text"
        item-value="value"
        label="Select User *"
        outlined
        v-model="todo.userId"
        :rules="userRules"
        required
      ></v-select>
      <v-select
        :items="selectPriorities"
        item-text="text"
        item-value="value"
        label="Select Priority *"
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
          <v-btn color="indigo" outlined class="mr-4" @click="closeDialog"
            >Cancel</v-btn
          >
          <v-btn
            color="indigo"
            :disabled="!formValidty"
            @click="submitCreateTodo"
            >Save</v-btn
          >
        </div>
      </div>
    </v-form>
  </div>
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
      priorityRules: [value => !!value || "Select Priority"],
      userRules: [value => !!value || "Select User"],
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
      this.todo = await this.createFreshTodoObject();
      this.closeDialog();
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
    closeDialog() {
      this.$refs.form.reset();
      this.$emit("closeDialog");
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
