<template>
  <div>
    <div class="mt-4 mb-8">
      <v-form v-model="formValidty" ref="form">
        <v-text-field
          label="Firstname *"
          v-model="user.firstName"
          :counter="20"
          outlined
          :rules="firstNameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Lastname *"
          v-model="user.lastName"
          :counter="20"
          outlined
          :rules="lastNameRules"
          required
        ></v-text-field>
        <div class="user-create-actions d-flex justify-space-between">
          <div class="user-create-info subtitle-1 font-weight-regular">
            * Required
          </div>
          <div>
            <v-btn color="indigo" outlined class="mr-4" @click="closeDialog"
              >Cancel</v-btn
            >
            <v-btn
              color="indigo"
              :disabled="!formValidty"
              @click="submitCreateUser"
              >Save</v-btn
            >
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: this.createFreshUserObject(),
      firstNameRules: [
        value => !!value || "Firstname is required",
        value =>
          (value && value.length <= 20) ||
          "Firstname must be less than 21 characters"
      ],
      lastNameRules: [
        value => !!value || "Lastname is required",
        value =>
          (value && value.length <= 20) ||
          "Lastname must be less than 21 characters"
      ],
      formValidty: false
    };
  },
  props: {
    avatarColors: Array
  },
  methods: {
    ...mapActions("users", ["createUser"]),
    async submitCreateUser() {
      this.createUser(this.user);
      this.user.avatarColor = this.avatarColors[
        Math.floor(Math.random() * this.avatarColors.length)
      ];
      this.user = await this.createFreshUserObject();
      this.closeDialog();
    },
    createFreshUserObject() {
      const id = Math.floor(Math.random() * 10000000);
      return {
        id: id,
        firstName: "",
        lastName: "",
        avatarColor: ""
      };
    },
    closeDialog() {
      this.$refs.form.reset();
      this.$emit("closeDialog");
    }
  }
};
</script>

<style lang="scss" scoped>
.user-create-actions {
  width: 100%;

  .theme--light.v-btn {
    color: white;
  }
}
.user-create-info {
  color: rgba(0, 0, 0, 0.6);
}
</style>
