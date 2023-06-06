<script lang="ts" setup>
const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
});

var list: any[] = [];
var ranking = 0;

const { data } = await useAsyncData(
  'users',
  async () => {
    const users: object[] = await pb.collection("users").getFullList(200, {});
    list = users as any[];
    list.sort((a, b) => (b.score + b.h_score) - (a.score + a.h_score));
    
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == user?.id) {
        ranking = i + 1;
        break;
      }
    }
    
    list.splice(5,list.length - 5)
    return list
  },
)
</script>

<template>
  <div class="area" id="score-display">
    <div id="score-content">
      <h2>EVA SCORE</h2>
      <h3>DEIN SCORE</h3>
      <h3>TOP 5 SCORE</h3>
      <div id="your-score" class="score">
        <div>
          <h2>{{ user?.score + user?.h_score }}</h2>
          <h6 style="margin: 0;">(Platz {{ ranking }})</h6>
        </div>
      </div>
      <div id="score-seperator"></div>
      <div id="top-score" class="score">
        <div>
          <div v-for="item, index in data" :key="index">
            <div v-if="(item.score + item.h_score) != 0">
              <div v-if="item.id == user?.id" style="color: rgb(157, 241, 154);">
                {{ item.score + item.h_score }}
              </div>
              <div v-else>
                {{ item.score + item.h_score }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
