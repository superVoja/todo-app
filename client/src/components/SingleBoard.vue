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
      <v-icon class="on-hover" @click="removeBoard(board)">
        mdi-delete
      </v-icon>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["board"],
  methods: {
    ...mapActions("boards", { remove: "remove" }),

    removeBoard(board) {
      console.log(board);
      this.$store.dispatch("boards/remove", board._id);
    },
  },
};
</script>
<style scoped>
.on-hover:hover {
  color: #ff9800;
}
</style>
