<script lang="ts">
export default {
  name: "Display",
  props: {
    currentUser: pb.currentUser
  },
  data() {
    return {
      h_hash: atob(this.currentUser.h_hash),
      m_hash: atob(this.currentUser.m_hash),
    }
  }
}
</script>

<template>
  <div id="display">
    <div id="display-container" class="area">
      <DataDisplay heading="TAG 1" :day_data="h_hash" />
      <div id="seperator"></div>
      <DataDisplay heading="TAG 2" :day_data="m_hash" />
    </div>
  </div>
</template>