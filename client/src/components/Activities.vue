<template>
  <v-flex>
    <v-card>
      <v-card-title>Activity Log</v-card-title>
      <v-list v-for="task in activityLog" :key="task._id" class="pa-2">
        <v-list-item-content>
          <v-icon color="green">fas fa-edit</v-icon>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title v-html="markdownify(task.text)">
          </v-list-item-title>
        </v-list-item-content>
      </v-list>
    </v-card>
  </v-flex>
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
