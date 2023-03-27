<script lang="ts">
export default {
  data() {
    return {
      robot_status: "happy"
    }
  },
  methods: {
    async check_status() {
      try {
        const res = await (await fetch("https://bot.mikadev.tech/app/api/health")).json();
        if (res.Status == "alive") {
          this.robot_status = "happy";
        } else {
          this.robot_status = "sad";
        }
      } catch (error) {
        console.log(error)
        this.robot_status = "sad";
      }
    }
  },
  mounted() {
    this.check_status()
    setInterval(() => {
      this.check_status()
    }, 9000);
  }
}
</script>

<template>
  <div>
    <slot/>
    <HealthCheck :bot_status="robot_status"/>
  </div>
</template>