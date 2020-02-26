<template>
  <v-container>
    <v-row class="mt-8" justify="center">
      <v-col cols="12" md="6">
        <h1 class="display-1 mb-8">Task Details</h1>
        <v-card class="mx-auto mb-2" outlined>
          <v-card-text>
            <div class="overline mb-3 d-flex justify-space-between">
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
              <div>
                <strong>Priority: {{ todo.priority | priority }}</strong>
                <br />
                <strong>Status: {{ todo.status }}</strong>
              </div>
              <UserInitials :user="userName" :initials-style="initialsStyle" />
            </div>
            <v-list-item-title
              class="headline mb-3"
              style="white-space: normal"
              >{{ todo.title }}</v-list-item-title
            >
            <p class="body-1">{{ todo.description }}</p>
          </v-card-text>
        </v-card>
        <div class="todo-details-actions">
          <v-btn color="blue" outlined @click="backToList"
            >Back to Task Board</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "todo-details",
  props: ["id"]
};
</script>

<script>
import UserInitials from "@/components/UserInitials.vue";
import TodoService from "@/services/TodoService";
import priority from "@/filters/priority.js";
import { mapGetters } from "vuex";

export default {
  name: "todo-details",
  components: {
    UserInitials
  },
  props: ["id"],
  data() {
    return {
      todo: {},
      initialsStyle: {
        width: "34px",
        height: "34px",
        fontSize: "16px"
      }
    };
  },
  computed: {
    ...mapGetters("todos", ["getTodoById"]),
    userName() {
      return { firstName: this.todo.firstName, lastName: this.todo.lastName };
    }
  },
  created() {
    this.todo = this.getTodoById(this.id);
  },
  methods: {
    backToList() {
      this.$router.push({ name: "todos-list" });
    }
  },
  filters: {
    priority
  }
};
</script>

<style lang="scss" scoped>
.todo-details-actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
