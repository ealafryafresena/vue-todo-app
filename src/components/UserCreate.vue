<template>
  <div>
    <div class="mt-4 mb-8">
      <v-form v-model="formValidty" ref="form">
        <v-text-field
          label="Firstname *"
          v-model="user.firstName"
          outlined
          :rules="firstNameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Lastname *"
          v-model="user.lastName"
          outlined
          :rules="lastNameRules"
          required
        ></v-text-field>
        <div class="user-create-actions d-flex justify-space-between">
          <div class="user-create-info subtitle-1 font-weight-regular">
            * Required
          </div>
          <div>
            <v-btn color="blue" outlined class="mr-4" @click="closeDialog"
              >Cancel</v-btn
            >
            <v-btn
              color="blue"
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
          (value && value.length <= 15) ||
          "Firstname must be less than 15 characters"
      ],
      lastNameRules: [
        value => !!value || "Lastname is required",
        value =>
          (value && value.length <= 15) ||
          "Lastname must be less than 15 characters"
      ],
      formValidty: false
    };
  },
  methods: {
    ...mapActions("users", ["createUser"]),
    async submitCreateUser() {
      this.createUser(this.user);
      this.user = await this.createFreshUserObject();
      this.closeDialog();
    },
    createFreshUserObject() {
      const id = Math.floor(Math.random() * 10000000);
      return {
        id: id,
        firstName: "",
        lastName: ""
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
