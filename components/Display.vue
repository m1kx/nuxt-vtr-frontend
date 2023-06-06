<script lang="ts" setup>
const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
});

const { data } = await useAsyncData(
  'dates',
  async () => {
    const times = await pb.collection("times").getOne("ux8ausqmf2h57dd")
    return {
      day_1: times.day_1,
      day_2: times.day_2
    }
  }
)
</script>

<script lang="ts">
</script>

<template>
  <div id="display">
    <div id="display-container" class="area" pos="top">
      <DataDisplay :heading="data?.day_1" day="h" />
      <div id="seperator"></div>
      <DataDisplay :heading="data?.day_2" day="m" />
    </div>
  </div>
</template>