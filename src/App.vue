<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <v-toolbar-title>
        <router-link :to="{ name: 'todos-list' }">Task Manager</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
        >{{ link.label }}</v-btn
      >
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer class="blue" color="white" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="`${link.label}-footer-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url"
          >{{ link.label }}</v-btn
        >
        <v-col class="blue lighten-1 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Task Manager</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    links: [
      { label: "Task Board", url: "/" },
      { label: "Create Task", url: "/todo/create" },
      { label: "Users", url: "/users" },
      { label: "About", url: "/about" }
    ]
  })
};
</script>

<style lang="scss">
.v-toolbar__title {
  a {
    color: white !important;
    font-weight: 600;
    text-decoration: none;
  }

  a:hover {
    color: rgba(255, 255, 255, 0.7) !important;
  }
}

h1:after {
  display: block;
  clear: both;
  content: "";
  position: relative;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 70px;
  border-bottom: 4px solid #2196f3;
  padding: 4px 0px;
}
</style>
