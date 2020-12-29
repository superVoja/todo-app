<template>
  <v-container flud>
    <v-slide-y-transition mode="out-in">
      <v-layout class="d-flex column mb-6">
        <v-progress-circular
          v-if="loadingBoard || loadingLists"
          :size="70"
          :width="7"
          indeterminate
          color="primary"
        >
        </v-progress-circular>
        <h2 v-if="board">{{ board.name }}</h2>
        <div v-if="!loadingLists" class="d-flex">
          <v-card
            max-width="374"
            v-for="list in lists"
            :key="list._id"
            @dragover="setDroppingList($event, list)"
            :class="{ green: droppingList == list }"
          >
            <v-card-title>{{ list.name }}</v-card-title>
            <v-col>
              <v-card>
                <ul v-if="cardsByListId[list._id]">
                  <v-card
                    v-for="card in cardsByListId[list._id]"
                    :key="card._id"
                    draggable="true"
                    @dragstart="startDraggingCard(card)"
                    @dragend="dropCard()"
                  >
                    {{ card.title }}
                  </v-card>
                </ul>
              </v-card>
            </v-col>
            <create-card
              :boardId="$route.params.id"
              :listId="list._id"
            ></create-card>
          </v-card>
          <v-card max-width="344">
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
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CreateCard from "../components/CreateCard.vue";
export default {
  components: { CreateCard },
  name: "boards",
  data() {
    return {
      draggingCard: null,
      droppingList: null,
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
    this.findCards({
      query: {
        boardId: this.$route.params.id,
      },
    }).then((response) => {
      const cards = response.data || response;
    });
  },
  methods: {
    ...mapActions("boards", { getBoard: "get" }),
    ...mapActions("lists", { findLists: "find" }),
    ...mapActions("cards", { findCards: "find" }),
    createList() {
      if (this.validList) {
        //console.log(this.list);
        const { Lists } = this.$FeathersVuex.api;
        this.list.boardId = this.$route.params.id;
        const list = new Lists(this.list);

        list.save();
      }
    },
    startDraggingCard(card) {
      console.log("Started dragging ", card);
      this.draggingCard = card;
    },
    setDroppingList(event, list) {
      this.droppingList = list;
      event.preventDefault();
    },
    dropCard() {
      if (this.droppingList) {
        this.draggingCard.listId = this.droppingList._id;
        this.draggingCard.save();
      }
      this.droppingList = null;
      this.draggingCard = null;
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
    ...mapGetters("cards", { findCardsInStore: "find" }),
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    cards() {
      return this.findCardsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || [];
        byId[card.listId].push(card);
        return byId;
      }, {});
    },
  },
};
</script>
