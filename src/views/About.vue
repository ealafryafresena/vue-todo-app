<template>
  <v-container>
    <v-row class="mt-8 mb-8" justify="center">
      <v-col cols="12">
        <h1 class="display-1">About the Task Manager</h1>
        <div class="d-flex flex-wrap justify-space-around mt-12">
          <div class="about-item">
            <h2 class="headline mb-4">Create Tasks</h2>
            <ul>
              <li>Add a title</li>
              <li>Add a description</li>
              <li>Assign a user</li>
              <li>Assign a priority</li>
            </ul>
          </div>
          <div class="about-item">
            <h2 class="headline mb-4">Create Users</h2>
            <ul>
              <li>Add firstname</li>
              <li>Add lastname</li>
            </ul>
          </div>
          <div class="about-item">
            <h2 class="headline mb-4">Workflow</h2>
            <ul>
              <li>Move task to corresponding column</li>
              <li>next/prev</li>
            </ul>
          </div>
          <div class="about-item">
            <h2 class="headline mb-4">Edit Tasks</h2>
            <ul>
              <li>Edit title</li>
              <li>Edit description</li>
              <li>Change user</li>
              <li>Change priority</li>
            </ul>
          </div>
          <div class="about-item">
            <h2 class="headline mb-4">User Overview</h2>
            <ul>
              <li>User name</li>
              <li>Amount of tasks in Todo</li>
              <li>Amount of tasks in Progress</li>
              <li>Amount of tasks in Done</li>
            </ul>
          </div>
          <div class="about-item">
            <h2 class="headline mb-4">Task Details</h2>
            <ul>
              <li>Created at</li>
              <li>Last updated at</li>
              <li>Assigned user</li>
              <li>Status</li>
              <li>Title</li>
              <li>Description</li>
            </ul>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "todo-create"
};
</script>

<style lang="scss" scoped>
.about-item {
  width: 340px;
  padding: 20px 25px 25px;
  margin-bottom: 50px;
  border: 1px solid #2196f3;
  border-radius: 5px;

  h2 {
    border-bottom: 2px solid #2196f3;
  }

  ul {
    list-style: circle;
    font-size: 18px;
    line-height: 1.6;
  }
}
</style>
