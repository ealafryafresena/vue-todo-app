<template>
  <v-card color="grey lighten-5" class="mx-auto mb-2" max-width="500" outlined>
    <v-card-text>
      <div class="overline mb-1 d-flex justify-space-between align-end">
        <div>
          <div>
            <strong>Priority: {{ todo.priority | priority }}</strong>
          </div>
        </div>
        <UserInitials :user="userData" :initials-style="initialsStyle" />
      </div>
      <v-list-item-title class="headline mb-1">
        {{ todo.title }}
      </v-list-item-title>
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
import UserInitials from "@/components/UserInitials.vue";
import TodoItemButton from "@/components/TodoItemButton.vue";
import priority from "@/filters/priority.js";
import fullNameInitials from "@/filters/fullNameInitials.js";

export default {
  components: {
    UserInitials,
    TodoItemButton
  },
  data() {
    return {
      initialsStyle: {
        width: "26px",
        height: "26px",
        fontSize: "12px"
      },
      buttons: [
        {
          color: "indigo",
          width: "50",
          icon: "mdi-arrow-left",
          isStatus: this.todo.status !== "todo",
          event: this.updateStatusBack
        },
        {
          color: "indigo",
          width: "50",
          icon: "mdi-information-outline",
          isStatus: true,
          event: this.showDetails
        },
        {
          color: "indigo",
          width: "50",
          icon: "mdi-pencil",
          isStatus: this.todo.status !== "done",
          event: this.editTodo
        },
        {
          color: "indigo",
          width: "50",
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
    userData() {
      return {
        firstName: this.todo.firstName,
        lastName: this.todo.lastName,
        avatarColor: this.todo.avatarColor
      };
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
  padding: 8px 12px 12px 12px;
}
.placeholder {
  height: 22px;
}
.theme--light.v-card.v-card--outlined {
  border: 4px solid #efefef !important;
}
</style>
