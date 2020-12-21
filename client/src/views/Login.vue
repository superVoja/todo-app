<template>
  <v-form
    v-model="valid"
    @submit.prevent="login()"
    @keydown.prevent.enter
    v-if="!loading"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.username"
            :rules="notEmptyRules"
            label="Username"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            required
          ></v-text-field>
        </v-col>
        <v-btn type="submit" :disabled="!valid">Login</v-btn>
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
          v-if="loading"
        ></v-progress-circular>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data: (vm) => ({
    valid: false,
    user: {
      username: "",
      password: "",
    },
    notEmptyRules: [(v) => !!v || "Name is required"],
  }),
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" }),
  },
  methods: {
    login() {
      if (this.valid) {
        this.$store
          .dispatch("auth/authenticate", {
            strategy: "local",
            username: this.user.username,
            password: this.user.password,
          })
          .then(() => {
            console.log("Logged in!");
          })
          .catch((e) => {
            console.error("Authenticate error", e);
          });
      }
    },
  },
};
</script>
