<template>
  <div>
    <v-app-bar color="">
      <v-toolbar-title>Todo App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn :to="{ name: 'login' }" depressed>Login</v-btn>
        <v-btn :to="{ name: 'signup' }" depressed>SignUp</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <v-btn @click="logout" depressed>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", { user: "payload" }),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
      console.log("User logout");
    },
  },
};
</script>
