<template>
  <v-container>
    <v-row class="mt-8 mb-8" justify="center">
      <v-col cols="12">
        <!-- ToDo: add content -->
        <h1 class="display-1">About the Task Manager</h1>
        <div class="d-flex flex-wrap justify-space-around mt-12">
          <v-card
            v-for="aboutCard in aboutCards"
            :key="aboutCard.title"
            class="mb-12"
            outlined
            width="300px"
          >
            <v-card-title class="headline">{{ aboutCard.title }}</v-card-title>

            <v-card-subtitle>{{ aboutCard.text }}</v-card-subtitle>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "todo-create",
  data() {
    return {
      aboutCards: [
        {
          title: "First Card",
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.`
        },
        {
          title: "Second Card",
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.`
        },
        {
          title: "Third Card",
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.`
        },
        {
          title: "Fourth Card",
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.`
        },
        {
          title: "Fith Card",
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.`
        },
        {
          title: "Sixt Card",
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.`
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
