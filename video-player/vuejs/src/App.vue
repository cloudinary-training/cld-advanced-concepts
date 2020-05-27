<template>
  <div>
    <h1><router-link to="/">Video</router-link></h1>
    <div>
      <router-link to="/tag">Tag </router-link>
    </div>
    <div>
      <router-link to="/player">Player </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  display: grid;
  place-items: center;
}
a {
  font-size: 2rem;
  text-decoration: none;
}
.router-link-exact-active {
  color: white;
  background: black;
}
</style>
