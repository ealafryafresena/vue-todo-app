<template>
  <div class="todo-edit">
    <h1>
      Edit Todo:
      <i>{{ todo.title }}</i>
    </h1>
    <form @submit.prevent="editTodo(id)">
      <div class="todo-edit-form-el">
        <label>Title</label>
        <input v-model="todo.title" type="text" @change="updatedValue" />
      </div>
      <div class="todo-edit-form-el">
        <label>Description</label>
        <textarea v-model="todo.description" @change="updatedValue"></textarea>
      </div>
      <div class="todo-edit-form-el">
        <label>Priority</label>
        <select v-model="todo.priority" @change="updatedValue">
          <option
            v-for="priority in priorities"
            :key="priority"
            :value="priority"
            >{{ priority | priority }}</option
          >
        </select>
      </div>
      <div class="todo-edit-form-el">
        <label>Status</label>
        <select v-model="todo.status" @change="updatedValue">
          <option v-for="status in statuses" :key="status" :value="status">{{
            status | capitalizeFirstChar
          }}</option>
        </select>
      </div>
      <button class="todo-edit-btn-cancel" @click="cancelEdit">Cancel</button>
      <input
        type="submit"
        value="Save"
        :disabled="disabled"
        :class="{ 'btn-disabled': disabled }"
      />
    </form>
  </div>
</template>

<script>
import capitalizeFirstChar from "@/filters/capitalizeFirstChar.js";
import priority from "@/filters/priority.js";

export default {
  name: "todo-edit",
  components: {},
  props: ["id"],
  data() {
    return {
      todo: {},
      priorities: this.$store.state.priorities,
      statuses: this.$store.state.statuses,
      disabled: true
    };
  },
  mounted() {
    this.todo = this.$store.getters.getTodoById(this.id);
  },
  methods: {
    editTodo(id) {
      this.todo.updatedAt = Date.now();
      this.$store.dispatch("editTodo", id);
      this.$router.push({ name: "todo-details", params: { id } });
    },
    cancelEdit() {
      this.$router.push({ name: "todos-list" });
    },
    updatedValue() {
      this.disabled = false;
    }
  },
  filters: {
    capitalizeFirstChar,
    priority
  }
};
</script>

<style lang="scss" scoped>
.todo-edit {
  &-form-el {
    margin-bottom: 1.5rem;
  }

  &-btn-cancel {
    font-size: 1.4rem;
    font-weight: bold;
    background-color: #42b983;
    border-radius: 0.5rem;
    border: none;
    color: white;
    padding: 0.5rem 0.8rem;
    text-decoration: none;
    cursor: pointer;
    margin-right: 20px;
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
input[type="text"] {
  width: 300px;
}
textarea {
  width: 300px;
  height: 150px;
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
input[type="submit"].btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
