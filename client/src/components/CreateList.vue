<template>
  <v-card max-width="344" class="pa-3">
    <v-card-title>Create List</v-card-title>
    <v-form
      v-model="validList"
      @submit.prevent="onCreateList"
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
</template>
<script>
import { notEmptyRules } from "../validators";
export default {
  props: ["createList", "creatingList"],
  data() {
    return {
      validList: false,
      notEmptyRules,
      list: {
        name: "",
        order: 0,
        archived: false,
      },
    };
  },
  methods: {
    onCreateList() {
      if (this.validList) {
        this.createList(this.list);
        this.list = {
          name: "",
          order: 0,
          archived: false,
        };
      }
    },
  },
};
</script>
