<template>
  <div class="mx-auto mt-6 mb-2">
    <div class="overline mb-3 d-flex justify-space-between">
      <div>
        <strong>Priority: {{ todo.priority | priority }}</strong>
        <br />
        <strong>Status: {{ todo.status }}</strong>
      </div>
      <div>
        <div>
          Created:
          {{ todo.createdAt | moment("ddd, MMM Do YYYY") }}
        </div>
        <div v-if="todo.updatedAt">
          Updated:
          {{ todo.updatedAt | moment("ddd, MMM Do YYYY") }}
        </div>
      </div>
      <UserInitials :user="userData" :initials-style="initialsStyle" />
    </div>
    <div class="headline mt-5 mb-3" style="white-space: normal">
      {{ todo.title }}
    </div>
    <p class="body-1">{{ todo.description }}</p>
  </div>
</template>

<script>
import UserInitials from "@/components/UserInitials.vue";
import priority from "@/filters/priority.js";

export default {
  name: "todo-detail",
  components: {
    UserInitials
  },
  props: ["id", "todo"],
  data() {
    return {
      initialsStyle: {
        width: "34px",
        height: "34px",
        fontSize: "16px"
      }
    };
  },
  computed: {
    userData() {
      return {
        firstName: this.todo.firstName,
        lastName: this.todo.lastName,
        avatarColor: this.todo.avatarColor
      };
    }
  },
  filters: {
    priority
  }
};
</script>

<style lang="scss" scoped></style>
