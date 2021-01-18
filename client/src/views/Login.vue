<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-form
        v-model="valid"
        @submit.prevent="login({ valid, user })"
        @keydown.prevent.enter
        v-if="!loading"
      >
        <v-layout column align-center>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="user.username"
              :rules="notEmptyRules"
              label="Username"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="user.password"
              :rules="notEmptyRules"
              label="Password"
              type="password"
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
        </v-layout>
      </v-form>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { notEmptyRules } from "@/validators";
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",
  data: () => ({
    valid: false,
    user: {
      username: "",
      password: "",
    },
    notEmptyRules,
  }),
  computed: {
    ...mapState("auth", { loading: "isAuthenticatePending" }),
  },
  methods: {
    ...mapActions("localAuth", ["login"]),
  },
};
</script>
