<template>
  <v-card class="mx-auto mb-2" max-width="500" outlined>
    <v-card-text>
      <div class="overline mb-2 d-flex justify-space-between">
        <div>
          <div>
            <strong>Priority: {{ todo.priority | priority }}</strong>
          </div>
          <div>
            Created: {{ todo.createdAt | moment("ddd, MMM Do YYYY") }}
            <i v-if="todo.updatedAt !== null">(U)</i>
          </div>
        </div>
        <v-tooltip bottom color="#2196f3">
          <template v-slot:activator="{ on }">
            <div class="user-initials" v-on="on">
              <strong>{{ userFullName | fullNameInitials }}</strong>
            </div>
          </template>
          <span>{{ userFullName }}</span>
        </v-tooltip>
      </div>
      <v-list-item-title class="headline mb-1">{{
        todo.title
      }}</v-list-item-title>
      <v-list-item-subtitle>
        <span>{{ todo.description }}</span>
        <div
          :class="{
            placeholder: todo.description === ''
          }"
        ></div>
      </v-list-item-subtitle>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <div v-for="button in buttons" :key="button.icon">
        <TodoItemButton
          class="ml-1 mr-1"
          :key="button.icon"
          v-if="button.isStatus"
          :color="button.color"
          :width="button.width"
          :icon="button.icon"
          :id="todo.id"
          :onClick="button.event"
        />
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import TodoItemButton from "@/components/TodoItemButton.vue";
import priority from "@/filters/priority.js";
import fullNameInitials from "@/filters/fullNameInitials.js";

export default {
  components: {
    TodoItemButton
  },
  data() {
    return {
      buttons: [
        {
          color: "blue",
          width: "52",
          icon: "mdi-arrow-left",
          isStatus: this.todo.status !== "todo",
          event: this.updateStatusBack
        },
        {
          color: "blue",
          width: "52",
          icon: "mdi-information-outline",
          isStatus: true,
          event: this.showDetails
        },
        {
          color: "blue",
          width: "52",
          icon: "mdi-pencil",
          isStatus: this.todo.status !== "done",
          event: this.editTodo
        },
        {
          color: "blue",
          width: "52",
          icon: "mdi-arrow-right",
          isStatus: this.todo.status !== "done",
          event: this.updateStatusNext
        }
      ]
    };
  },
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    moveToStatus() {
      return this.todo.status === "todo" ? "Progress" : "Done";
    },
    userFullName() {
      return `${this.todo.firstName} ${this.todo.lastName}`;
    }
  },
  methods: {
    showDetails() {
      this.$emit("showDetails", this.todo.id);
    },
    updateStatusNext() {
      this.$emit("updateStatusNext", this.todo.id);
    },
    updateStatusBack() {
      this.$emit("updateStatusBack", this.todo.id);
    },
    editTodo() {
      this.$emit("editTodo", this.todo.id);
    }
  },
  filters: {
    priority,
    fullNameInitials
  }
};
</script>

<style lang="scss" scoped>
.v-card__text {
  padding: 10px 16px 16px 16px;
}
.placeholder {
  height: 22px;
}

.user-initials {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: rgba(33, 150, 243, 0.9);
  font-size: 14px;
  letter-spacing: initial;
  color: white;
}
</style>
