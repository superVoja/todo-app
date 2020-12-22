<template>
  <v-container>
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
    <pre v-if="!loading">
      {{ boards }}
    </pre>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "boards",
  computed: {
    ...mapState("boards", { loading: "isFindPending" }),
    ...mapGetters("boards", { findBoardsInStore: "find" }),

    boards() {
      return this.findBoardsInStore().data;
    },
  },
  methods: {
    ...mapActions("boards", { findBoards: "find" }),
  },
  created() {
    this.findBoards({ query: {} });
  },
};
</script>
