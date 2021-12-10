<!--
 * @Author: 可可同学
 * @Date: 2021-12-10 09:40:03
 * @LastEditTime: 2021-12-10 11:14:05
 * @LastEditors: 可可同学
 * @Description:
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
