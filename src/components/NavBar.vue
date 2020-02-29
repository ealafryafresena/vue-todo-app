<template>
  <div>
    <v-app-bar app flat color="grey darken-2" dark height="60">
      <v-app-bar-nav-icon
        v-if="!drawer"
        @click.stop="toggleDrawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title color="grey darken-2" v-if="!drawer">
        <router-link :to="{ name: 'todos-list' }">Task Manager</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="user-bar d-flex justify-end">
        <UserInitials
          class="ml-1"
          v-for="user in users"
          :key="user.id"
          :user="user"
          :initials-style="initialsStyle"
        />
      </div>
    </v-app-bar>

    <v-navigation-drawer color="white" app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <div class="d-flex justify-space-between">
            <v-list-item-title class="title">Task Manager</v-list-item-title>
            <v-app-bar-nav-icon @click.stop="toggleDrawer">
              <v-icon>mdi-close</v-icon>
            </v-app-bar-nav-icon>
          </div>
          <v-list-item-subtitle
            >Yeah, another task manager</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item
              color="indigo"
              v-for="link in links"
              :key="`${link.label}-header-link`"
              text
              rounded
              :to="link.url"
            >
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ link.label }}</v-list-item-title>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import UserInitials from "@/components/UserInitials.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { UserInitials },
  data: () => ({
    drawer: false,
    initialsStyle: {
      width: "30px",
      height: "30px",
      fontSize: "14px"
    }
  }),
  props: ["links"],
  created() {
    this.fetchUsers();
  },
  computed: {
    ...mapGetters("users", ["users"])
  },
  methods: {
    ...mapActions("users", ["fetchUsers"]),
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  a {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 600;
    text-decoration: none;
  }

  a:hover {
    color: rgba(255, 255, 255, 0.6) !important;
  }
}
</style>
