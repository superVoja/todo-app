<template>
  <v-form
    v-model="valid"
    @submit.prevent="signUp"
    @keydown.prevent.enter
    v-if="!loading"
  >
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
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
              v-model="user.displayName"
              :rules="notEmptyRules"
              label="Display Name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="user.imageUrl"
              :rules="notEmptyRules"
              label="Image Url"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="user.password"
              :rules="notEmptyRules"
              type="password"
              label="Password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="user.confirmPassword"
              :rules="confirmPasswordRules"
              type="password"
              label="Confirm Password"
              required
            ></v-text-field>
          </v-col>
          <v-btn type="submit" :disabled="!valid">SignUp</v-btn>
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
            v-if="loading"
          ></v-progress-circular>
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </v-form>
</template>
<script>
import { notEmptyRules } from "@/validators";
import { mapState } from "vuex";
export default {
  name: "SignUp",
  data: (vm) => ({
    valid: false,
    user: {
      username: "",
      displayName: "",
      imageUrl: "",
      password: "",
      confirmPassword: "",
    },
    notEmptyRules,
    confirmPasswordRules: [
      (confirmPassword) =>
        confirmPassword === vm.user.password || "Password must match",
    ],
  }),
  computed: {
    ...mapState("users", { loading: "isCreatePending" }),
  },
  methods: {
    signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex.api;

        const user = new User(this.user);

        user.save().then((user) => {
          console.log(user);
          this.$router.push("/login");
        });
      }
    },
  },
};
</script>
