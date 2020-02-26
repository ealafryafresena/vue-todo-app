<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Firstname</th>
          <th class="text-left">Lastname</th>
          <th class="text-left">Avatar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>
            <UserInitials
              :user="{ firstName: user.firstName, lastName: user.lastName }"
              :initials-style="initialsStyle"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import UserInitials from "@/components/UserInitials.vue";

export default {
  components: {
    UserInitials
  },
  data() {
    return {
      initialsStyle: {
        width: "26px",
        height: "26px",
        fontSize: "14px"
      }
    };
  },
  props: {
    users: Array
  }
};
</script>
