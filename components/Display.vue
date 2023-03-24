<script lang="ts">
export default {
  name: "Display",
  props: {
    currentUser: pb.currentUser
  },
  data() {
    return {
      h_data: {
        hash: atob(this.currentUser.h_hash)
      },
      m_data: {
        hash: atob(this.currentUser.m_hash)
      },
      days: {
        day_1: "",
        day_2: ""
      }
    }
  },
  async mounted() {
    const times = await pb.instance.collection("times").getOne("ux8ausqmf2h57dd")
    this.days.day_1 = times.day_1;
    this.days.day_2 = times.day_2;
  }
}
</script>

<template>
  <div id="display">
    <div id="display-container" class="area" pos="top">
      <DataDisplay :day_data="h_data" :heading="days.day_1" />
      <div id="seperator"></div>
      <DataDisplay :day_data="m_data" :heading="days.day_2" />
    </div>
  </div>
</template>