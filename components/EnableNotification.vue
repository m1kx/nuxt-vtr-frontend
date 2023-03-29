<script lang="ts">
export default {
  name: "EnableNotification",
  data() {
    return {
      notifications: false
    }
  },
  mounted() {
    this.notifications = (pb.currentUser.notifications != "")
  },
  methods: {
    async clicked() {
      if (this.has_notifications()) {
        await pb.instance.collection('users').update(pb.currentUser.id, {"notifications": ""});
        this.notifications = false
        return
      }
      navigator.serviceWorker.register('service-worker.js')
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        const success = await notify.subscribe()
        this.notifications = success
      } else {
        await pb.instance.collection('users').update(pb.currentUser.id, {"notifications": JSON.stringify(subscription)});
        this.notifications = true
      }
    },
    has_notifications() {
      return (pb.currentUser.notifications != "")
    }
  }
}
</script>

<template>
  <button :class="{disablenotification: notifications}" id="notify" @click="clicked">BENACHRICHTIGUNGEN</button>
</template>
