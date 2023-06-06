<script lang="ts">
const pb = usePocketbase();
let user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
  navigateTo('/');
});

export default {
  data() {
    return {
      password: "",
      username: "",
      loading_auth: false
    }
  },
  mounted() {
    if (user) {
      navigateTo("/");
    }
  },
  methods: {
    loading(e: HTMLElement) {
      const dots = e;
      const btnm = e as HTMLButtonElement;
      btnm.disabled = true;
      const original_text = e.innerHTML;
      var text = "Lädt";
      dots.innerHTML = text + ".";
      this.loading_auth = true;
      var interval = setInterval(() => {
        if (!this.loading_auth) {
          clearInterval(interval);
          e.innerHTML = original_text;
          btnm.disabled = false;
          return
        }
        if (dots.innerHTML.length > text.length + 3) {
          dots.innerHTML = text + ".";
        } else {
          dots.innerHTML += ".";
        }
      }, 400);
    },
    validCheck(): boolean {
      const elements = document.getElementsByClassName('valid-check');
      let ok = true;
      for (let i = 0; i < elements.length; i++) {
        const element = <HTMLInputElement>elements[i];
        if (element.checkValidity()) {
          continue;
        }
        element.style.outline = `3px dashed #942525`;
        setTimeout(() => {
          element.style.outline = ``;
        }, 4000);
        ok = false;
      }
      return ok;
    },
    async login(e: Event) {
      if (!this.validCheck()) {
        setTimeout(() => {
          alert("Bitte richtige Werte in markierte felder eingeben...");
        }, 100);
        return;
      }
      // @ts-ignore
      this.loading(e.srcElement);
      try {
        await pb.collection('users').authWithPassword(this.username,this.password);
        this.loading_auth = false;
      } catch (error) {
        alert("EMail oder Passwort falsch")
        this.loading_auth = false;
      }
    },
  }
}
</script>

<template>
  <div>
    <div>
      <div id="header">
        <h1>ANMELDEN</h1>
      </div>
      <div id="main">
        <div id="login">
          <div id="login-style" class="area">
            <label for="email">Mail</label>
            <input class="valid-check" v-model="username" type="email" required id="email">
            <label for="password">Password</label>
            <input class="valid-check" v-model="password" type="password" id="password" required minlength="1">
            <button id="signin" @click="login($event)">EINLOGGEN</button>
            <div class="or">oder <NuxtLink to="/signup">registrieren</NuxtLink></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  transition: all 0.1s;
}
</style>