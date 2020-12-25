<template>
  <v-container flud>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center wrap>
        <v-progress-circular
          v-if="loadingBoard || loadingLists"
          :size="70"
          :width="7"
          indeterminate
          color="primary"
        >
        </v-progress-circular>
        <h2 v-if="board">{{ board.name }}</h2>
        <div v-if="!loadingLists">
          <v-flex sm3 v-for="list in lists" :key="list._id" pa-2>
            <v-card class="mx-auto" max-width="400">
              <v-card-title>{{ list.name }}</v-card-title>
            </v-card>
          </v-flex>
        </div>
        <v-card class="mx-auto pa-6" max-width="344">
          <v-card-title>Create List</v-card-title>
          <v-form
            v-model="validList"
            @submit.prevent="createList"
            @keydown.prevent.enter
            v-if="!creatingList"
          >
            <v-layout column align-center>
              <v-col cols="12">
                <v-text-field
                  v-model="list.name"
                  :rules="notEmptyRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-btn type="submit" :disabled="!validList">Create List</v-btn>
              <v-progress-circular
                v-if="creatingList"
                :size="70"
                :width="7"
                indeterminate
                color="primary"
              >
              </v-progress-circular>
            </v-layout>
          </v-form>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "boards",
  data() {
    return {
      validList: false,
      //creating: false,
      board: {},
      notEmptyRules: [(v) => !!v || "Name is required"],
      list: {
        name: "",
        order: 0,
        archived: false,
      },
    };
  },

  mounted() {
    this.getBoard(this.$route.params.id).then((response) => {
      this.board = response.data || response;
    });
    this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    }).then((response) => {
      const lists = response.data || response;
    });
  },
  methods: {
    ...mapActions("boards", { getBoard: "get" }),
    ...mapActions("lists", { findLists: "find" }),
    createList() {
      if (this.validList) {
        console.log(this.list);
        const { Lists } = this.$FeathersVuex.api;
        this.list.boardId = this.$route.params.id;
        const list = new Lists(this.list);

        list.save();
      }
    },
  },
  computed: {
    ...mapState("boards", {
      loadingBoard: "isGetPending",
    }),
    ...mapState("lists", {
      loadingLists: "isFindPending",
      creatingList: "isCreatePending",
    }),
    ...mapGetters("lists", { findListsInStore: "find" }),
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
  },
};
</script>
