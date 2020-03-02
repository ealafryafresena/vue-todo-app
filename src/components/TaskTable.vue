<template>
  <v-simple-table :fixed-header="fixedHeader" :height="height">
    <template v-slot:default>
      <thead>
        <tr>
          <th
            v-for="columnHeader in columnHeaders"
            :key="columnHeader.text"
            class="table-header text-left"
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
          <td>{{ todo.createdAt | moment("MM/DD/YYYY") }}</td>
          <td>
            <span v-if="todo.updatedAt !== null">
              {{ todo.updatedAt | moment("MM/DD/YYYY") }}
            </span>
            <span v-else class="d-flex justify-center align-center"
              >&mdash;</span
            >
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
      height: 450,
      columnHeaders: [
        { text: "Title" },
        { text: "Status" },
        { text: "Priority" },
        { text: "Task Created" },
        { text: "Task Last Updated" },
        { text: "Assigned User" }
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

<style lang="scss" scoped>
.table-header {
  min-width: 140px;
}
</style>
