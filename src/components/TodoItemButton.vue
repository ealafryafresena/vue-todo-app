<template>
  <v-btn
    outlined
    :color="color"
    :buttonText="buttonText"
    text
    small
    :width="width"
    @click="onClick"
  >
    <v-icon>{{ icon }}</v-icon>
    {{ buttonText }}
  </v-btn>
</template>

<script>
export default {
  props: {
    id: Number,
    color: String,
    width: String,
    buttonText: String,
    icon: String,
    onClick: Function
  }
};
</script>

<style lang="scss" scoped></style>
