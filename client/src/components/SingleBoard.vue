<template>
  <v-card class="" width="344">
    <v-img :src="board.background" height="200px"></v-img>
    <v-card-title>{{ board.name }}</v-card-title>
    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        :to="{ name: 'board', params: { id: board._id } }"
      >
        Go to
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["board"],
};
</script>
