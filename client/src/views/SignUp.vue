<template>
  <v-form
    v-model="valid"
    @submit.prevent="signUp"
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
            v-model="user.displayName"
            :rules="notEmptyRules"
            label="Display Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.imageUrl"
            :rules="notEmptyRules"
            label="Image Url"
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
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRules"
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
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
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
    notEmptyRules: [(v) => !!v || "Name is required"],
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
        //console.log("Form is valid, Welcome", this.user);

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
