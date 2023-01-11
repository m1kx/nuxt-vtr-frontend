<script lang="ts">
import Options from '../components/Options.vue';
export default {
  components: {
    Options
  },
  data() {
    return {
      currentUser: pb.instance.authStore.model,
    }
  },
  methods: {
    loading(e: HTMLElement) {
      const dots = e;
      var text = "Lädt";
      dots.innerHTML = text + ".";
      setInterval(function() {
        if (dots.innerHTML.length > text.length + 3) {
          dots.innerHTML = text + ".";
        } else {
          dots.innerHTML += ".";
        }
      }, 400);
    },
    async signOut(e: Event) {
      // @ts-ignore
      this.loading(e.srcElement);
      pb.instance.authStore.clear();
    },
    async deleteAccount(e: Event) {
      const answer = prompt("Willst du den Account wirklich löschen? (ja/nein)")

      if (this.currentUser && answer == "ja") {
        pb.instance.collection("users").delete(this.currentUser.id);
      }
    }
  },
  mounted() {
    pb.instance.authStore.onChange((auth : any) => {
      this.currentUser = pb.instance.authStore.model;
    });
  },
}
</script>

<template>
  <div id="main-content">
    <div v-if="currentUser" id="main-settings">
      <div v-if="currentUser.verified">
        <h1>Einstellungen</h1>
        <Options :currentUser="currentUser"></Options>
        <p>Angemeldet!<br/>(user-id: {{ pb.currentUser.id }})</p>
      </div>
      <div v-else>
        <p id="confirm">Bitte email bestätigen und danach neu laden</p>
      </div>
      <button id="signout" @click="signOut($event)">ABMELDEN</button>
      <button id="delete" @click="deleteAccount($event)">ACCOUNT LÖSCHEN</button>
    </div>
    <div v-else>
      <h1>LMG Vertretungsplan Bot 🤖</h1>
      <p>Automatische Nachrichten zu deinen aktuellen Vertetungen/Entfällen (beta)</p>
      <NuxtLink to="/login"><button id="signin">ANMELDEN</button></NuxtLink>
      <NuxtLink to="/signup"><button id="signin">ACCOUNT ERSTELLEN</button></NuxtLink>
    </div>
  </div>
</template>

<style scoped>
* {
  transition: all 0.1s;
}
#confirm {
  padding-top: 20px;
}
.control-button {
  display: block;
}
#signout {
  background-color: rgba(152, 72, 63, 0.454);
}
#delete {
  background-color: rgba(152, 72, 63, 0.454);
  margin-left: 10px;
}
#main-content {
  text-align: center;
}
#signin {
  margin-left: 1px;
}
#main-settings {
  padding-bottom: 30px;
}
@media (max-width: 860px) {
  button {
    width: 90vw;
  }
  h1 {
    font-size: 25px;
  }
  #delete {
    background-color: rgba(152, 72, 63, 0.454);
    margin-left: 0px;
  }
}
</style>