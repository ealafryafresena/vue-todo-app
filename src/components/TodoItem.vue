<template>
  <div class="todo-item" :class="{ 'todo-item-done': todo.status === 'done' }">
    <p class="todo-item-date">
      <span>Created at: {{ todo.createdAt | moment("ddd, MMM Do YYYY") }}</span>
      <span>
        <strong>Priority: {{ todo.priority | priority }}</strong>
      </span>
    </p>
    <h2 :class="{ 'todo-item-text-done': todo.status === 'done' }">
      {{ todo.title }}
    </h2>
    <p
      class="todo-item-description"
      :class="{ 'todo-item-text-done': todo.status === 'done' }"
    >
      {{ todo.description }}
    </p>
    <div class="todo-item-btn-wrapper">
      <button class="todo-item-btn" @click="showDetails">Show Details</button>
      <button
        v-if="todo.status !== 'done'"
        class="todo-item-btn"
        @click="updateStatus"
      >
        Move to {{ moveToStatus }}
      </button>
    </div>
  </div>
</template>

<script>
import priority from "@/filters/priority.js";

export default {
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    moveToStatus() {
      return this.todo.status === "todo" ? "Progress" : "Done";
    }
  },
  methods: {
    showDetails() {
      this.$emit("showDetails", this.todo.id);
    },
    updateStatus() {
      this.$emit("updateStatus", this.todo.id);
    }
  },
  filters: {
    priority
  }
};
</script>

<style lang="scss" scoped>
.todo-item {
  padding: 10px;
  margin: 10px 0;
  background-color: #e5e5e5;

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

  &-description {
    font-size: 1rem;
    margin: 0.2rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h2 {
    margin: 0.2rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    color: #2c3e50;
    text-decoration: none;
  }

  &-btn-wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }

  &-btn {
    font-size: 0.9rem;
    border-radius: 0.2rem;
    border: none;
    padding: 0.3rem 0.5rem;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: #b4b4b4;
      color: white;
    }
  }
}
</style>
