<script lang="ts">
import { ListResult } from 'pocketbase';

export default {
  name: "ScoreDisplay",
  data() {
    return {
      list: [] as any[]
    }
  },
  async mounted() {
    const users: ListResult<any[]> = await pb.instance.collection("users").getList(1, 5, {
      sort: "-h_score"
    });
    // @ts-ignore
    //users.items.sort((a,b) => {
    //  return (b.score+b.h_score)-(a.score+a.h_score)
    //})
    //users.items.sort((a,b) => ((a.score+a.h_score) < (b.score+b.h_score)) ? 1 : -1 )
    this.list = users.items as any[];
  }
}
</script>

<template>
  <div class="area" id="score-display">
    <div id="score-content">
      <h2>EVA SCORE</h2>
      <h3>DEIN SCORE</h3>
      <h3>TOP 5 SCORE</h3>
      <div id="your-score" class="score">
        <div>
          <h2>{{ pb.currentUser.score + pb.currentUser.h_score }}</h2>
        </div>
      </div>
      <div id="score-seperator"></div>
      <div id="top-score" class="score">
        <div>
          <div v-for="item, index in list">
            <div v-if="item.score != 0">
              <div v-if="item.id == pb.currentUser.id" style="color: rgb(157, 241, 154);;">
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
