<template>
  <v-card width="344" class="pa-2">
    <v-card-title>Create Board</v-card-title>
    <v-form v-model="valid" @submit.prevent="onCreate" @keydown.prevent.enter>
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
</template>
<script>
import { notEmptyRules } from "@/validators";
export default {
  props: ["creating", "createBoard"],
  data() {
    return {
      valid: false,
      notEmptyRules,
      board: {
        name: "",
        background: "",
      },
    };
  },
  methods: {
    async onCreate() {
      if (this.valid) {
        await this.createBoard(this.board);
        this.board = {
          name: "",
          background: "",
        };
      }
    },
  },
};
</script>
