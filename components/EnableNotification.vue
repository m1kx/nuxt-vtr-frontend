<script lang="ts">
export default {
  name: "EnableNotification",
  methods: {
    clicked() {
      if (pb.currentUser.notifications != "") {
        return
      }
      navigator.serviceWorker.register('service-worker.js')
      navigator.serviceWorker.ready
          .then(function(registration) {
            return registration.pushManager.getSubscription();
          })
          .then(async function(subscription) {
            if (!subscription) {
              notify.subscribe()
            } else {
              console.log(
                JSON.stringify({
                  subscription: subscription,
                })
              );
              await pb.instance.collection('users').update(pb.currentUser.id, {"notifications": JSON.stringify(subscription)});
            }
          });
    }
  }
}
</script>

<template>
  <button v-if="pb.currentUser.username == 'knixknax'" id="notify" @click="clicked">BENACHRICHTIGUNGEN</button>
</template>
