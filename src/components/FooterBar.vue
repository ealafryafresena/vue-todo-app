<template>
  <v-container class="container-footer" fluid>
    <v-row>
      <v-col class="white" cols="12">
        <v-footer class="d-flex justify-center" color="white" padless>
          <v-btn
            color="indigo"
            v-for="link in links"
            :key="`${link.label}-footer-link`"
            text
            rounded
            class="my-2"
            :to="link.url"
            >{{ link.label }}</v-btn
          >
        </v-footer>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="grey darken-2 copyright text-center"
        justify="center"
        cols="12"
      >
        {{ new Date().getFullYear() }} —
        <strong>Task Manager</strong>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["links"]
};
</script>

<style lang="scss" scoped>
.copyright {
  color: rgba(255, 255, 255, 0.9);
}
.container {
  padding: 0;
  &-footer {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>
