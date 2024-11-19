<script setup lang="ts">
import Control from './components/Control.vue';
import Lrc from './views/Lrc.vue';
</script>

<template>
  <router-view></router-view>
  <Lrc></Lrc>
  <Control></Control>
</template>

<style scoped></style>