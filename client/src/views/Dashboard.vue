<template>
  <v-flex row>
    <!-- <v-progress-circular
          v-if="creating"
          :size="70"
          :width="7"
          indeterminate
          color="primary"
        >
        </v-progress-circular> -->
    <create-board
      :creating="creating"
      :createBoard="createBoard"
    ></create-board>
    <v-flex v-for="board in boards" :key="board._id" class="pa-1">
      <single-board :board="board"></single-board>
    </v-flex>
  </v-flex>
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
