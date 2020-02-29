<template>
  <v-app>
    <NavBar :links="links" />
    <v-content>
      <router-view></router-view>
    </v-content>
    <FooterBar :links="links" />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FooterBar from "@/components/FooterBar.vue";

export default {
  name: "App",
  components: { NavBar, FooterBar },
  data: () => ({
    links: [
      { icon: "mdi-view-dashboard", label: "Task Board", url: "/" },
      { icon: "mdi-view-list", label: "Create Task", url: "/todo/create" },
      { icon: "mdi-account-group", label: "Users", url: "/users" },
      { icon: "mdi-help-box", label: "About", url: "/about" }
    ]
  })
};
</script>

<style lang="scss">
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
