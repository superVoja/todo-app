<template>
  <v-form
    v-model="validCard"
    @submit.prevent="createCard"
    @keydown.prevent.enter
    v-if="!creatingCard"
  >
    <v-layout column align-center>
      <v-col>
        <v-text-field
          v-model="card.title"
          :rules="notEmptyRules"
          label="Title"
          required
        ></v-text-field>
      </v-col>
      <v-btn type="submit" color="success" :disabled="!validCard"
        >Create Card</v-btn
      >
      <v-progress-circular
        v-if="creatingCard"
        :size="70"
        :width="7"
        indeterminate
        color="primary"
      >
      </v-progress-circular>
    </v-layout>
  </v-form>
</template>
<script>
import { notEmptyRules } from "../validators";
export default {
  name: "create-card",
  props: ["listId", "boardId", "createActivity", "user"],
  data() {
    return {
      validCard: false,
      creatingCard: false,
      notEmptyRules,
      card: {
        title: "",
        members: [],
      },
    };
  },
  methods: {
    async createCard() {
      if (this.validCard) {
        //console.log(this.list);
        const { Cards } = this.$FeathersVuex.api;
        this.card.listId = this.listId;
        this.card.boardId = this.boardId;
        const card = new Cards(this.card);
        this.creatingCard = true;
        await card.save();
        this.createActivity(
          `**${this.user.displayName}** created card **${card.title}**`
        );
        //console.log(this.user);
        this.creatingCard = false;
        this.card = {
          title: "",
          members: [],
        };
      }
    },
  },
};
</script>
