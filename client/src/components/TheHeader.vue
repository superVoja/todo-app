<template>
  <div>
    <v-app-bar color="">
      <router-link to="/dashboard" class="link">
        <v-toolbar-title>Todo App</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn :to="{ name: 'login' }" depressed>Login</v-btn>
        <v-btn :to="{ name: 'signup' }" depressed>SignUp</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <AppAvatar :user="user.user" />
        <v-btn @click="logout" depressed>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
import AppAvatar from "./AppAvatar";
export default {
  props: ["user", "logout"],
  components: {
    AppAvatar,
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #222;
}
</style>
