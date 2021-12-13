import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@levi-m/core-ui/components/HelloWorld.vue' // @ is an alias to /src
import Hello from '@levi-m/core-ui/components/Hello.vue'

const VueImpl = [
  'data', 'beforeCreate', 'created', 'beforeMount',
  'mounted', 'beforeUnmount', 'unmounted',
  'beforeUpdate', 'updated', 'activated', 'deactivated',
  'render', 'errorCaptured', 'serverPrefetch'
];
// @Options({
//   components: {
//     HelloWorld,
//     Hello
//   }
// })
export class Setting extends Vue {
  beforeCreate() {
    console.log("beforeCreate")
  }
  beforeMount() {
    console.log(this)
    console.log("beforeMount")
  }
  beforeUpdate() {
    console.log("beforeUpdate")
  }
  render() {
    return (
      <div class="home">
        <img alt="Vue logo" src="src/assets/images/logo.png" />
        {/* <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> */}
        <Hello msg="Hello Vue 3.0 + Vite" />
      </div>
    )
  }
}

