<script lang="ts">
export default {
  name: "HealthCheck",
  props: {
    bot_status: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      clicks: 0
    }
  },
  methods: {
    navigatetoerr() {
      this.clicks++
      if (this.bot_status == "sad" && this.clicks > 10) {
        window.open("https://bot.mikadev.tech/app/api/health", '_blank')?.focus();
      }
    }
  }
}
</script>

<template>
  <div id="health" @click="navigatetoerr">
    <img :src="`robot_${bot_status}.svg`" />
  </div>
</template>