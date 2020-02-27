<template>
  <div>
    <v-tooltip bottom :color="user.avatarColor">
      <template v-slot:activator="{ on }">
        <div
          class="user-initials d-flex justify-center align-center"
          v-on="on"
          :style="{
            width: initialsStyle.width,
            height: initialsStyle.height,
            fontSize: initialsStyle.fontSize,
            backgroundColor: user.avatarColor
          }"
        >
          <strong>{{ userFullName | fullNameInitials }}</strong>
        </div>
      </template>
      <span>{{ userFullName }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import fullNameInitials from "@/filters/fullNameInitials.js";

export default {
  name: "user-initials",
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    initialsStyle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    userFullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  },
  filters: {
    fullNameInitials
  }
};
</script>

<style lang="scss" scoped>
.user-initials {
  border-radius: 100%;
  letter-spacing: initial;
  color: white;
}
</style>
