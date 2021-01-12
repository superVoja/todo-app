<template>
  <v-container fluid>
    <v-row dense>
      <create-board
        :creating="creating"
        :createBoard="createBoard"
        width="344"
      ></create-board>
      <v-col v-for="board in boards" :key="board._id">
        <v-card width="344">
          <single-board :board="board"></single-board>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

import CreateBoard from "../components/CreateBoard";
import SingleBoard from "../components/SingleBoard.vue";

export default {
  name: "dashboard",
  components: {
    CreateBoard,
    SingleBoard,
  },
  mounted() {
    this.findBoards({ query: {} });
  },
  methods: {
    ...mapActions("boards", { findBoards: "find" }),
    async createBoard(board) {
      const { Boards } = this.$FeathersVuex.api;
      const newBoard = new Boards(board);

      await newBoard.save();
      //console.log(this.board._id);
    },
  },
  computed: {
    ...mapState("boards", {
      loading: "isFindPending",
      creating: "isCreatePending",
    }),
    ...mapState("auth", { user: "payload" }),

    ...mapGetters("boards", { findBoardsInStore: "find" }),
    boards() {
      //console.log(this.user.user._id);

      return this.user
        ? this.findBoardsInStore({
            query: { ownerId: this.user.user._id },
          }).data
        : [];
    },
  },
};
</script>
<style scoped>
.col {
  flex-grow: 0;
}
</style>
