<script lang="ts">
export default {
  name: "DataDisplay",
  data() {
    return {
      formatted: []
    }
  },
  props: {
    day_data: {
      type: Object,
      default: "Null"
    },
    heading: {
      type: String,
      default: "err"
    },
    day: {
      type: String,
      default: "h"
    }
  },
  methods: {
    fmt_data(rec: any) {
      let actions = []
      if (this.day == "h") {
        actions = atob(rec.h_hash).split("!!!")
      } else {
        actions = atob(rec.m_hash).split("!!!")
      }
      for (let i = 0; i < actions.length; i++) {
        // @ts-ignore
        actions[i] = actions[i].split("|")
      }
      this.formatted = actions as []
    }
  },
  beforeMount() {
    pb.instance.collection("users").subscribe(pb.currentUser.id, async (e) => {
      this.fmt_data(e.record);
    })
  },
  mounted() {
    this.fmt_data(pb.currentUser);
  }
}
</script>

<template>
  <div class="data-display">
    <h2>{{ heading }}</h2>
    <div v-if="formatted[0] != ''" v-for="data, index in formatted">
      <p>
        {{ data[1] }}  {{ data[2] }}  <i>{{ data[5] }}</i>
      </p>
    </div>
    <div v-else>
      Keine Ereignisse
    </div>
  </div>
</template>