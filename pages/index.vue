
<script lang="ts" setup>
const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
  window.location.reload();
});

function loading(e: HTMLElement) {
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
}

async function signOut(e: Event) {
  // @ts-ignore
  loading(e.srcElement);
  pb.authStore.clear();
}

async function deleteAccount(e: Event) {
  const answer = prompt("Willst du den Account wirklich löschen? (ja/nein)")

  if (user && answer == "ja") {
    pb.collection("users").delete(user.id);
  }
}
</script>

<template>
  <div id="main-content">
    <div v-if="user" id="main-settings">
      <div v-if="user.verified">
        <h1 id="main-heading">HALLO, {{ user?.email.split("@")[0].toUpperCase() }}</h1>
        <Display />
        <ScoreDisplay />
        <Options></Options>
        <EnableNotification />
        <!--<p>Angemeldet!<br/>(user-id: {{ user.id }})<br/>( <i id="mail-notify">{{ user.email }}</i>)</p>-->
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
  padding-bottom: 40px;
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