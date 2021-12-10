<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <Hello msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Hello from '@/components/Hello.vue'

@Options({
  components: {
    HelloWorld,
    Hello
  }
})
export default class Home extends Vue {}
</script>
