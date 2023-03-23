<script lang="ts">
export default {
  name: "Display",
  props: {
    currentUser: pb.currentUser
  },
  data() {
    return {
      h_data: {
        hash: atob(this.currentUser.h_hash),
        date: this.currentUser.h_date.replaceAll("-", ".")
      },
      m_data: {
        hash: atob(this.currentUser.m_hash),
        date: this.currentUser.m_date.replaceAll("-", ".")
      },
    }
  }
}
</script>

<template>
  <div id="display">
    <div id="display-container" class="area" pos="top">
      <DataDisplay :day_data="h_data" />
      <div id="seperator"></div>
      <DataDisplay :day_data="m_data" />
    </div>
  </div>
</template>