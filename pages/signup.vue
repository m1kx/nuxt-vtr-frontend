<script lang="ts">

const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
});

export default {
  data() {
    return {
      password: "",
      username: "",
      password_w: "",
      current: "",
      courses: ""
    }
  },
  mounted() {
    if (user) {
      navigateTo("/");
    }
  },
  methods: {
    async login() {
      await pb.collection('users').authWithPassword(this.username,this.password);
    },
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
    async signUp(e: Event) {
      e.preventDefault();
      if (!this.validCheck()) {
        setTimeout(() => {
          alert("Bitte richtige Werte in markierte felder eingeben...");
        }, 100);
        return;
      }
      if (this.password != this.password_w) {
        alert("Passwörter unterscheiden sich...");
        return;
      }
      if (this.current == '') {
        alert("Bitte eine Stufe angeben...");
        return;
      }
      // @ts-ignore
      this.loading(e.srcElement);
      const data = {
        username: this.username.replace('@', '.'),
        password: this.password,
        passwordConfirm: this.password,
        email: this.username,
        class: this.current,
        subjects: this.courses.replace(/, /g, ',').replace(/,/g, ':'),
        new_version: true,
      };
      await pb.collection('users').create(data);
      await pb.collection('users').requestVerification(data.email);
      this.login()
    },
    button_select(e: Event) {
      e.preventDefault();
      const element = e.srcElement;
      // @ts-ignore
      this.current = element.innerHTML;
      const selects = document.getElementsByClassName('select');
      for (let i = 0; i < selects.length; i++) {
        const button = selects[i] as HTMLButtonElement;
        if (element == button) {
          // @ts-ignore
          element.classList.add('selected');
          continue
        }
        button.classList.remove('selected');
      }
    }
  }
}
</script>

<template>
  <div>
    <div id="header">
      <h1>ACCOUNT ERSTELLEN</h1>
    </div>
    <div id="main">
      <div id="login">
        <div id="login-style" class="area">
          <form>
            <label for="email">Mail</label>
            <input class="valid-check" v-model="username" type="email" id="email" required>
            <label for="password">Password (min. 8 Zeichen)</label>
            <input class="valid-check" v-model="password" type="password" minlength="8" id="password" required>
            <label for="password">Password wiederholen</label>
            <input class="valid-check" v-model="password_w" type="password" minlength="8" id="password_w" required>
              <label>Kurse</label>
              <input onkeyup="this.value = this.value.toUpperCase();" class="valid-check" v-model="courses" id="courses" type="text" placeholder="E G1,D G4,M L1,MU G1" pattern="^[A-Z]{1,2}\d?\s[A-Z][1-9](,\s?[A-Z]{1,2}\d?\s[A-Z][1-9])*$" required>
              <label>Stufe: {{ current }}</label>
              <button class="select" @click="button_select($event)">EF</button><button class="select" @click="button_select($event)">Q1</button><button class="select" @click="button_select($event)">Q2</button><br>
            <button id="signin" @click="signUp($event)">REGISTRIEREN</button>
            <div class="or">oder <NuxtLink to="/login">anmelden</NuxtLink></div>
          </form>
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