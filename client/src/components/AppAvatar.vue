<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-title>{{ user.displayName }}</v-list-item-title>
      <v-list-item-subtitle>Logged In</v-list-item-subtitle>
    </v-list-item-content>
    <v-avatar :size="50" color="grey lighten-4">
      <img :src="user.imageUrl" alt="avatar" />
    </v-avatar>
  </v-list-item>
</template>

<script>
export default {
  props: ["user"],
};
</script>
