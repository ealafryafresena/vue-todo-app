<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Firstname</th>
          <th class="text-left">Lastname</th>
          <th class="text-left">Tasks in Todo</th>
          <th class="text-left">Tasks in Progress</th>
          <th class="text-left">Tasks in Done</th>
          <th class="text-left">Avatar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.todosCount.statusTodo }}</td>
          <td>{{ user.todosCount.statusProgress }}</td>
          <td>{{ user.todosCount.statusDone }}</td>
          <td>
            <UserInitials
              :user="{
                firstName: user.firstName,
                lastName: user.lastName,
                avatarColor: user.avatarColor
              }"
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
        fontSize: "12px"
      }
    };
  },
  props: {
    users: Array
  }
};
</script>
