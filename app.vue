<script setup>
import "./assets/style.css";

const title = ref("LMG Bot")

useHead({
  title,
  meta: [
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: "LMG Bot" }
  ],
  link: [
    { rel: "apple-touch-icon", href: "icon.png" },
    { rel: "apple-touch-startup-image", href: "splash.png" }
  ]
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
