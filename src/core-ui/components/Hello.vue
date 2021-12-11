<template>
  <h1>{{ msg }}</h1>
  <button @click="clickCount">count is: {{ count }}</button>
  <p>
    Edit <code>components/Hello.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { useStore } from 'vuex'
const store = useStore()

export default {
  name: 'Hello',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    clickCount () {
      this.$store.dispatch('increment')
    }
  }
}
</script>
