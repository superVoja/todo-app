<template>
  <v-container flud>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex xs10>
          <v-layout class="d-flex column mb-6">
            <v-progress-circular
              v-if="loadingBoard || loadingLists"
              :size="70"
              :width="7"
              indeterminate
              color="primary"
            >
            </v-progress-circular>
            <div v-if="boardsError">
              <v-alert type="error" :value="boardsError">
                {{ boardsError.message }}
              </v-alert>
            </div>
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
                  :user="user.user"
                  :createActivity="createActivity"
                  :boardId="$route.params.id"
                  :listId="list._id"
                ></create-card>
              </v-card>
              <create-list
                :createList="createList"
                :creatingList="creatingList"
              ></create-list>
            </div>
          </v-layout>
        </v-flex>
        <activities :activityLog="activityLog"></activities>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import CreateCard from "../components/CreateCard.vue";
import Activities from "../components/Activities";
import CreateList from "../components/CreateList";
import { notEmptyRules } from "../validators";

export default {
  components: {
    CreateCard,
    CreateList,
    Activities,
  },
  name: "boards",
  data() {
    return {
      draggingCard: null,
      droppingList: null,
      board: {},
    };
  },

  mounted() {
    this.getBoard(this.$route.params.id);
    this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    });
    this.findCards({
      query: {
        boardId: this.$route.params.id,
      },
    });
    this.findTasks({
      query: {
        boardId: this.$route.params.id,
      },
    }).then((response) => {
      const tasks = response.data || response;
    });
  },
  methods: {
    ...mapActions("boards", { getBoard: "get" }),
    ...mapActions("lists", { findLists: "find" }),
    ...mapActions("cards", { findCards: "find" }),
    ...mapActions("tasks", { findTasks: "find" }),
    async createList(list) {
      const { Lists } = this.$FeathersVuex.api;
      list.boardId = this.$route.params.id;
      const newList = new Lists(list);

      await newList.save();
      await this.createActivity(
        `**${this.user.user.displayName}** created list **${list.name}**`
      );
    },
    startDraggingCard(card) {
      console.log("Started dragging ", card);
      this.draggingCard = card;
    },
    setDroppingList(event, list) {
      this.droppingList = list;
      event.preventDefault();
    },
    async dropCard() {
      if (this.droppingList) {
        if (this.draggingCard.listId !== this.droppingList._id) {
          const fromList = this.lists.find(
            (list) => list._id === this.draggingCard.listId
          );
          const toList = this.lists.find(
            (list) => list._id === this.droppingList._id
          );
          this.draggingCard.listId = this.droppingList._id;
          await this.draggingCard.save();
          this.createActivity(
            `**${this.user.user.displayName}** moved card **${this.draggingCard.title}** from **${fromList.name}** to **${toList.name}**`
          );
        }
      }
      this.droppingList = null;
      this.draggingCard = null;
    },
    markdownify(text) {
      return marked(text);
    },
    async createActivity(text) {
      const { Tasks } = this.$FeathersVuex.api;
      const task = new Tasks();
      task.text = text;
      task.boardId = this.$route.params.id;
      await task.save();
    },
  },
  computed: {
    ...mapState("boards", {
      loadingBoard: "isGetPending",
      boardsError: "errorOnGet",
    }),
    ...mapState("lists", {
      loadingLists: "isFindPending",
      creatingList: "isCreatePending",
      listsError: "errorOnFind",
    }),
    ...mapState("auth", { user: "payload" }),
    ...mapState("cards", {
      cardsError: "errorOnFind",
    }),
    ...mapGetters("lists", { findListsInStore: "find" }),
    ...mapGetters("cards", { findCardsInStore: "find" }),
    ...mapGetters("tasks", { findTasksInStore: "find" }),
    tasks() {
      return this.findTasksInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
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
    activityLog() {
      return this.tasks.slice().reverse();
    },
  },
};
</script>
