<script lang="ts" setup>
const pb = usePocketbase();
var user = pb.authStore.model;
pb.authStore.onChange((auth : any) => {
  user = pb.authStore.model;
});

var current = ref('')
var courses = ""
var loading_upd = false

function validCheck(): boolean {
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
}

function button_select(e: Event) {
  e.preventDefault();
  const element = e.srcElement;
  // @ts-ignore
  current.value = element.innerHTML;
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

function loading(e: HTMLElement) {
  const dots = e;
  const btnm = e as HTMLButtonElement;
  btnm.disabled = true;
  const original_text = e.innerHTML;
  var text = "Lädt";
  dots.innerHTML = text + ".";
  loading_upd = true;
  var interval = setInterval(() => {
    if (!loading_upd) {
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
}

async function button_submit(e: Event) {
  if (!validCheck()) {
    setTimeout(() => {
      alert("Bitte richtige Werte in markierte felder eingeben...");
    }, 100);
    return;
  }
  if (current.value == '') {
    alert("Bitte eine Stufe angeben...");
    return;
  }
  // @ts-ignore
  if (current.value == user.class && courses.replaceAll(",", ":") == user.subjects) {
    return
  }
  // @ts-ignore
  loading(e.srcElement);
  const data_updated = {
    "class": current.value,
    // @ts-ignore
    "subjects": courses.replaceAll(', ', ',').replaceAll(',', ':'),
    "new_update": true
  }
  try {
    if (!user) return;
    await pb.collection('users').update(user.id, data_updated);
  } catch (error) {
    alert("Ein unerwarteter Fehler ist aufgetreten, versuche es später erneut...");
    loading_upd = false;
  }
  loading_upd = false;
}

onBeforeMount(() => {
  if (!user) return;
  courses = user.subjects.replaceAll(":", ",");
  current.value = user.class;
  pb.collection("users").subscribe(user.id, async (e) => {
    courses = e.record.subjects.replaceAll(":", ",");
  })
})

</script>

<template>
  <div id="login" style="text-align: center;">
    <div id="login-style" class="area" pos="bottom">
      <h2 style="font-weight: 900; margin-top: 0;">DATEN ÄNDERN</h2>
      <!--<div>(Kurse aktuell: <div class="highlight">{{ currentUser.subjects.replaceAll(":",",") }}</div> & Stufe: <div class="highlight">{{ currentUser.class }}</div>)</div>-->
      <label>Kurse</label>
      <input onkeyup="this.value = this.value.toUpperCase();" class="valid-check" v-model="courses" id="courses" type="text" placeholder="E G1,D G4,M L1,MU G1" pattern="^[A-Z]{1,2}\d?\s[A-Z][1-9](,\s?[A-Z]{1,2}\d?\s[A-Z][1-9])*$" required>
      <label>Stufe: {{ current }}</label>
      <button ref="select_button_1" class="select" @click="button_select($event)">EF</button><button ref="select_button_2" class="select" @click="button_select($event)">Q1</button><button ref="select_button_3" class="select" @click="button_select($event)">Q2</button><br>
      <button id="update-button" @click="button_submit($event)" style="background-color: rgba(255, 255, 255, 0.162); margin-top: 35px; width: 50vw;">AKTUALISIEREN</button>
    </div>
  </div>
</template>

<style>
input {
  transition: all 0.3s;
}
</style>