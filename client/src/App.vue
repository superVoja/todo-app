<template>
  <v-app>
    <v-main>
      <TheHeader />
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

  data: () => ({
    //
  }),
  computed: {
    ...mapState("auth", { user: "payload" }),
  },
  mounted() {},
};
</script>
