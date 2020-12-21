<template>
  <div class="home">
    <v-btn :to="{ name: 'login' }">Go to Login</v-btn>
    <v-btn :to="{ name: 'signup' }">Go to Signup</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
