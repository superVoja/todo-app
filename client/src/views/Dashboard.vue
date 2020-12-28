<template>
  <v-container flud>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center wrap>
        <v-progress-circular
          v-if="creating"
          :size="70"
          :width="7"
          indeterminate
          color="primary"
        >
        </v-progress-circular>
        <v-card class="mx-auto pa-6" max-width="344">
          <v-card-title>Create Board</v-card-title>
          <v-form
            v-model="valid"
            @submit.prevent="createBoard"
            @keydown.prevent.enter
          >
            <v-layout column align-center>
              <v-col cols="12">
                <v-text-field
                  v-model="board.name"
                  :rules="notEmptyRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="board.background"
                  :rules="notEmptyRules"
                  label="Background"
                  required
                ></v-text-field>
              </v-col>
              <v-btn type="submit" :disabled="!valid">Create</v-btn>
            </v-layout>
          </v-form>
        </v-card>
        <div v-if="user">
          <v-flex
            v-for="board in boards"
            :key="board._id"
            class="pa-1 flex-row"
          >
            <v-card class="mx-auto pa-4" max-width="344">
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
          </v-flex>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "dashboard",
  data() {
    return {
      valid: false,
      notEmptyRules: [(v) => !!v || "Cannot be empty!"],
      board: {
        name: "",
        background: "",
      },
    };
  },
  components: {},
  created() {
    this.findBoards({ query: {} });
  },
  methods: {
    ...mapActions("boards", { findBoards: "find" }),
    createBoard() {
      if (this.valid) {
        const { Boards } = this.$FeathersVuex.api;
        const board = new Boards(this.board);

        board.save();
        //console.log(this.board._id);
      }
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
