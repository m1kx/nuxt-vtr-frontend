<script lang="ts">
const { $sentrySetUser } = useNuxtApp()

const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
});

if (user) {
  $sentrySetUser({ email: user.email, user_id: user.id });
}

export default {
  data() {
    return {
      robot_status: "happy",
      refreshed: false
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
        this.robot_status = "sad";
      }
    },
    urlBase64ToUint8Array(base64String: string) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
      const rawData = window.atob(base64);
      return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    }
  },
  async beforeMount() {
    this.refreshed = true;
  },
  mounted() {
    this.check_status()
    setInterval(() => {
      this.check_status()
    }, 10000);  
  },
}
</script>

<template>
  <div>
    <slot/>
    <RefreshButton />
  </div>
</template>
