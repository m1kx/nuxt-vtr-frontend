<script lang="ts">
export default {
  name: "DataDisplay",
  props: {
    day_data: {
      type: Object,
      default: "Null"
    },
    heading: {
      type: String,
      default: "err"
    }
  },
  methods: {
    split_inner(inner: string) {
      return inner.split("|")
    },
    fmt_data() {
      const actions = this.day_data.hash.split("!!!")
      for (let i = 0; i < actions.length; i++) {
        // @ts-ignore
        actions[i] = actions[i].split("|")
      }
      return actions
    }
  }
}
</script>

<template>
  <div class="data-display">
    <h2>{{ heading }}</h2>
    <div v-for="data, index in fmt_data()">
      <p>
        {{ data[1] }}  {{ data[2] }}  <i>{{ data[5] }}</i>
      </p>
    </div>
  </div>
</template>