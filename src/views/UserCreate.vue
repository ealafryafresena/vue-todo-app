<template>
  <v-container>
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8">
        <h1 class="display-1 mb-8">Create a User</h1>
        <div class="mt-4 mb-8">
          <v-form v-model="formValidty">
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
                <v-btn color="blue" outlined class="mr-4" @click="cancelCreate"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue"
                  :disabled="!formValidty"
                  @click="submitCreateUser"
                  >Create User</v-btn
                >
              </div>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "create-user",
  data() {
    return {
      user: this.createFreshUserObject(),
      firstNameRules: [value => !!value || "Firstname is required"],
      lastNameRules: [value => !!value || "Lastname is required"],
      formValidty: false
    };
  },
  methods: {
    ...mapActions("users", ["createUser"]),
    async submitCreateUser() {
      this.createUser(this.user);

      await this.$router.push({
        name: "todos-list",
        params: { id: this.user.id }
      });
      this.user = await this.createFreshUserObject();
    },
    createFreshUserObject() {
      const id = Math.floor(Math.random() * 10000000);
      return {
        id: id,
        firstName: "",
        lastName: ""
      };
    },
    cancelCreate() {
      this.$router.push({ name: "todos-list" });
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
