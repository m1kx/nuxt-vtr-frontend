<script lang="ts">
export default {
  name: "Options",
  data() {
    return {
      current: "",
      courses: "",
      loading_upd: false
    }
  },
  props: {
    currentUser: pb.currentUser
  },
  mounted() {
    this.courses = this.currentUser.subjects.replaceAll(":", ",");
    this.current = this.currentUser.class;
    setTimeout(() => {
      const selects = document.getElementsByClassName('select');
      for (let i = 0; i < selects.length; i++) {
        const element = selects[i] as HTMLButtonElement;
        if (element.innerHTML == this.current) {
          element.classList.add('selected');
        }
        element.onclick = () => {
          element.classList.add('selected');
          for (let x = 0; x < selects.length; x++) {
            if (selects[x] != element) {
              selects[x].classList.remove('selected');
            }
          }
        }
      }
    }, 500);
  },
  methods: {
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
    button_select(e: Event) {
      e.preventDefault();
      // @ts-ignore
      this.current = e.srcElement.innerHTML;
    },
    loading(e: HTMLElement) {
      const dots = e;
      const btnm = e as HTMLButtonElement;
      btnm.disabled = true;
      const original_text = e.innerHTML;
      var text = "Lädt";
      dots.innerHTML = text + ".";
      this.loading_upd = true;
      var interval = setInterval(() => {
        if (!this.loading_upd) {
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
    async button_submit(e: Event) {
      if (!this.validCheck()) {
        setTimeout(() => {
          alert("Bitte richtige Werte in markierte felder eingeben...");
        }, 100);
        return;
      }
      if (this.current == '') {
        alert("Bitte eine Stufe angeben...");
        return;
      }
      // @ts-ignore
      if (this.current == this.currentUser.class && this.courses.replaceAll(",", ":") == this.currentUser.subjects) {
        return
      }
      // @ts-ignore
      this.loading(e.srcElement);
      const data_updated = {
        "class": this.current,
        // @ts-ignore
        "subjects": this.courses.replaceAll(',', ':')
      }
      try {
        await pb.instance.collection('users').update(this.currentUser.id, data_updated);
        await pb.instance.collection('users').update(this.currentUser.id, { "update": true });
      } catch (error) {
        alert("Ein unerwarteter Fehler ist aufgetreten, versuche es später erneut...");
        this.loading_upd = false;
      }
      this.loading_upd = false;
    }
  }
}
</script>

<template>
  <div id="login" style="text-align: center;">
    <div id="login-style" class="area">
      <h2 style="text-decoration: underline; underline-offset: 10px; font-weight: 500; margin-top: 0;">Daten Aktualisieren</h2>
      <div>(Kurse aktuell: <div class="highlight">{{ currentUser.subjects.replaceAll(":",",") }}</div> & Stufe: <div class="highlight">{{ currentUser.class }}</div>)</div>
      <label>Kurse</label>
      <input onkeyup="this.value = this.value.toUpperCase();" class="valid-check" v-model="courses" id="courses" type="text" placeholder="E G1,D G4,M L1,MU G1" pattern="^([A-Z]{1,2} [A-Z]\d)(,([A-Z]{1,2} [A-Z]\d))*$" required>
      <label>Stufe: {{ current }}</label>
      <button class="select" @click="button_select($event)">EF</button><button class="select" @click="button_select($event)">Q1</button><button class="select" @click="button_select($event)">Q2</button><br>
      <button @click="button_submit($event)" style="background-color: rgba(255, 255, 255, 0.162); margin-top: 35px; width: 50vw;">OK</button>
    </div>
  </div>
</template>

<style>
input {
  transition: all 0.3s;
}
</style>