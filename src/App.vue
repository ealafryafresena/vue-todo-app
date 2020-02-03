<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'todos-list' }">Tasks Board</router-link>
      <router-link :to="{ name: 'todo-create' }">Create Task</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  @media (min-width: 1024px) {
    width: 1020px;
  }
  margin: 0 auto;
}

#nav {
  padding: 2rem 0;
}

#nav a {
  margin-right: 1rem;
  padding: 0.5rem 0.8rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  border: 1px solid #c4c4c4;
  border-radius: 0.5rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
