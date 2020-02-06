<template>
  <div class="todo">
    <h1>Task Details</h1>
    <div class="todo-detail" :class="{ 'todo-detail-done': todo.done }">
      <p class="todo-detail-date">
        <span>Created: {{ todo.createdAt | moment("ddd, MMM Do YYYY") }}</span>
        <span v-if="todo.updatedAt"
          >Updated: {{ todo.updatedAt | moment("ddd, MMM Do YYYY") }}</span
        >
        <span>
          <strong>Priority: {{ todo.priority | priority }}</strong>
        </span>
      </p>
      <h2 :class="{ 'todo-detail-text-done': todo.done }">{{ todo.title }}</h2>
      <p
        :class="{ 'todo-detail-text-done': todo.done }"
        class="todo-detail-description"
      >
        {{ todo.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-details",
  props: ["id"]
};
</script>

<script>
import TodoService from "@/services/TodoService";
import priority from "@/filters/priority.js";

export default {
  name: "todo-details",
  components: {},
  props: ["id"],
  data() {
    return {
      todo: {},
      errorMessage: ""
    };
  },
  created() {
    TodoService.getTodo(this.id)
      .then(response => {
        this.todo = response.data;
      })
      .catch(error => {
        this.errorMessage = error.response;
      });
  },
  filters: {
    priority
  }
};
</script>

<style lang="scss" scoped>
.todo-detail {
  padding: 10px;
  background-color: #e5e5e5;
  width: 500px;

  &-done {
    opacity: 0.7;
  }

  &-text-done {
    text-decoration: line-through;
  }

  &-date {
    font-size: 0.8rem;
    margin: 0.2rem 0;
    display: flex;
    justify-content: space-between;

    span {
      display: block;
    }
  }

  h2 {
    margin: 0.2rem 0;
  }

  &-description {
    font-size: 1rem;
    margin: 0.2rem 0;
  }
}
</style>
