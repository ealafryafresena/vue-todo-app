<template>
  <div class="todo-create">
    <h1>Create Task</h1>

    <div v-if="errors.length" class="todo-create-error">
      <strong>Please fill out the required fields:</strong>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>

    <form @submit.prevent="createTodo">
      <div class="todo-create-form-el">
        <label>Title (required)</label>
        <input
          v-model="todo.title"
          type="text"
          placeholder="Add a task title"
        />
      </div>
      <div class="todo-create-form-el">
        <label>Description</label>
        <textarea
          v-model="todo.description"
          placeholder="Add a task description"
        ></textarea>
      </div>
      <div class="todo-create-form-el">
        <label>Select a priority (required)</label>
        <select v-model="todo.priority">
          <option value="0" disabled selected>Select a priority</option>
          <option
            v-for="priority in priorities"
            :key="priority"
            :value="priority"
            >{{ priority | priority }}</option
          >
        </select>
      </div>
      <input type="submit" value="Save" />
    </form>
  </div>
</template>

<script>
import priority from "@/filters/priority.js";

export default {
  name: "todo-create",
  components: {},
  data() {
    return {
      priorities: this.$store.state.priorities,
      todo: this.createFreshTodoObject(),
      errors: []
    };
  },
  methods: {
    createTodo() {
      this.errors = [];

      if (this.todo.title && this.todo.priority) {
        this.$store
          .dispatch("createTodo", this.todo)
          .then(() => {
            this.$router.push({
              name: "todo-details",
              params: { id: this.todo.id }
            });
            this.todo = this.createFreshTodoObject();
          })
          .catch(() => {
            console.log("There was a problem creating your todo");
          });
      } else {
        if (!this.todo.title) {
          this.errors.push("Title");
        }
        if (!this.todo.priority) {
          this.errors.push("Priority");
        }
      }
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
    }
  },
  filters: {
    priority
  }
};
</script>

<style lang="scss" scoped>
.todo-create {
  &-error {
    color: #ff0000;
  }
  &-form-el {
    margin-bottom: 1.5rem;
  }
}
label {
  font-weight: bold;
  font-size: 1.4rem;
  display: block;
}
input,
textarea {
  font-size: 1.1rem;
  padding: 0.4rem;
}
select {
  display: block;
  font-size: 1.1rem;
}
input[type="submit"] {
  font-size: 1.4rem;
  font-weight: bold;
  background-color: #42b983;
  border-radius: 0.5rem;
  border: none;
  color: white;
  padding: 0.5rem 0.8rem;
  text-decoration: none;
  cursor: pointer;
}
</style>
