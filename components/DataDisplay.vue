<script lang="ts" setup>
const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
});

var formatted: any[] = [];

const props = defineProps<{
  heading: string,
  day: string
}>()

function fmt_data(rec: any) {
  let actions = []
  if (props.day == "h") {
    actions = atob(rec.h_hash).split("!!!")
  } else {
    actions = atob(rec.m_hash).split("!!!")
  }
  for (let i = 0; i < actions.length; i++) {
    // @ts-ignore
    actions[i] = actions[i].split("|")
  }
  formatted = actions as []
}

onBeforeMount(() => {
  if (!user) return;
  pb.collection("users").subscribe(user.id, async (e) => {
    fmt_data(e.record);
  })
})

fmt_data(user)
</script>

<template>
  <div class="data-display" v-if="formatted">
    <h2>{{ heading }}</h2>
    <div v-if="formatted[0] != ''">
      <div v-for="data, index in formatted" :key="index">
        <p>
          {{ data[1] }}  {{ data[2] }}  <i>{{ data[5] }}</i>
        </p>
      </div>
    </div>
    <div v-else>
      Keine Ereignisse
    </div>
  </div>
</template>