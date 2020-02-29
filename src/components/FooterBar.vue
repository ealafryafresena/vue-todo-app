<template>
  <v-container fluid>
    <v-row>
      <v-col class="grey lighten-3 py-4" cols="12">
        <v-footer class="d-flex justify-center" color="grey lighten-3" padless>
          <v-btn
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
      <v-col class="grey lighten-2 py-4 text-center" justify="center" cols="12">
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
