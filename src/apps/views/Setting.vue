<template>
  <div>
    <h1>This is a setting.vue page views</h1>
    <p>store count is: {{ count }}</p>
    <div class="box red"></div>
    <div class="box green"></div>
    <div class="box red"></div>
    <!-- emmet语法 -->
  </div>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
}
.red {
  background-color: palevioletred;
}
.green {
  background-color: greenyellow;
}
</style>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Setting',
  computed: {
    count () {
      const store = useStore()
      return store.state.count
    }
  }
})
</script>
