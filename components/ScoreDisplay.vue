<script lang="ts">

export default {
  name: "ScoreDisplay",
  data() {
    return {
      list: [] as any[]
    }
  },
  async mounted() {
    const users: object[] = await pb.instance.collection("users").getFullList(200, {});
    this.list = users as any[];
    this.list.sort((a, b) => (b.score + b.h_score) - (a.score + a.h_score));
    this.list.splice(5,this.list.length - 5)
    console.log(this.list)
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
            <div v-if="(item.score + item.h_score) != 0">
              <div v-if="item.id == pb.currentUser.id" style="color: rgb(157, 241, 154);">
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
