<template>
  <v-simple-table :fixed-header="fixedHeader" :height="height">
    <template v-slot:default>
      <thead>
        <tr>
          <th
            v-for="columnHeader in columnHeaders"
            :key="columnHeader.text"
            :class="columnHeader.textAlign"
          >
            {{ columnHeader.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.title }}</td>
          <td>{{ todo.status | capitalizeFirstChar }}</td>
          <td>{{ todo.priority | priority }}</td>
          <td class="text-center">
            {{ todo.createdAt | moment("MM/DD/YYYY") }}
          </td>
          <td class="text-center">
            <span v-if="todo.updatedAt !== null">{{
              todo.updatedAt | moment("MM/DD/YYYY")
            }}</span>
            <span v-else>&mdash;</span>
          </td>
          <td class="d-flex justify-center align-center">
            <UserInitials
              :user="{
                firstName: todo.firstName,
                lastName: todo.lastName,
                avatarColor: todo.avatarColor
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
import priority from "@/filters/priority.js";
import capitalizeFirstChar from "@/filters/capitalizeFirstChar.js";

export default {
  components: {
    UserInitials
  },
  data() {
    return {
      fixedHeader: true,
      height: 420,
      columnHeaders: [
        { text: "Title", textAlign: "text-left" },
        { text: "Status", textAlign: "text-left" },
        { text: "Priority", textAlign: "text-left" },
        { text: "Task Created", textAlign: "text-center" },
        { text: "Task Last Updated", textAlign: "text-center" },
        { text: "Assigned User", textAlign: "text-center" }
      ],
      initialsStyle: {
        width: "26px",
        height: "26px",
        fontSize: "12px"
      }
    };
  },
  props: ["todos"],
  filters: {
    priority,
    capitalizeFirstChar
  }
};
</script>
