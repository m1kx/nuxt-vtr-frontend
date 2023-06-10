<script lang="ts" setup>
const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
});

function refresh() {
  pb.collection("users").authRefresh();
}
</script>

<template>
  <div id="health" @click="refresh" v-if="user">
    <img src="/public/refresh.svg" />
  </div>
</template>