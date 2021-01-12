<template>
  <v-card>
    <v-container class="grey lighten-5">
      <v-card-title>Activity Log</v-card-title>
      <v-row v-for="task in activityLog" :key="task._id">
        <v-col cols="2" md="2">
          <v-icon color="green darken-2">
            mdi-calendar-plus
          </v-icon>
        </v-col>
        <v-col cols="8" md="8" v-html="markdownify(task.text)"> </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import marked from "marked";
export default {
  props: ["activityLog"],
  methods: {
    markdownify(text) {
      return marked(text);
    },
  },
};
</script>
