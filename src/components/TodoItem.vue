<template>
  <div class="todo-item" :class="{ 'todo-item-done': todo.status === 'done' }">
    <router-link :to="{ name: 'todo-details', params: { id: todo.id } }">
      <p class="todo-item-date">
        <span
          >Created at: {{ todo.createdAt | moment("ddd, MMM Do YYYY") }}</span
        >
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
    </router-link>
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
  width: 300px;
  &:hover {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  }

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
}
</style>
