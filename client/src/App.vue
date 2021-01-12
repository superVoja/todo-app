<template>
  <v-app>
    <v-main>
      <TheHeader :user="user" :logout="logout" />
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import TheHeader from "./components/TheHeader";
export default {
  name: "App",

  components: {
    TheHeader,
  },
  computed: {
    ...mapState("auth", { user: "payload" }),
  },

  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => {
          this.$router.push("/login");
          console.log("User logout");
        })
        .catch((e) => {
          console.log("Error");
        });
    },
  },
};
</script>
<style>
*,
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
