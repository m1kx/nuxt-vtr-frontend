<script lang="ts" setup>
const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
});

var notifications = false;

function has_notifications() {
  if (!user) return false;
  return (user.notifications != "")
}

async function clicked() {
  if (has_notifications() && user) {
    await pb.collection('users').update(user.id, {"notifications": ""});
    notifications = false
    return
  }
  navigator.serviceWorker.register('service-worker.js')
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    const success = await notify.subscribe()
    notifications = success
  } else {
    if (!user) return;
    await pb.collection('users').update(user.id, {"notifications": JSON.stringify(subscription)});
    notifications = true
  }
}

onBeforeMount(() => {
  if (!user) return;
  notifications = (user.notifications != "")
})
</script>

<script lang="ts">
</script>

<template>
  <button :class="{disablenotification: notifications}" id="notify" @click="clicked">BENACHRICHTIGUNGEN</button>
</template>
