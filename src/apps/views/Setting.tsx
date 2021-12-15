import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@levi-m/core-ui/components/HelloWorld.vue' // @ is an alias to /src
import Hello from '@levi-m/core-ui/components/Hello.vue'
import { get } from '@levi-m/core';

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
    get('/index-infos').then(() => {

    })
  }
  beforeUpdate() {
    console.log("beforeUpdate")
  }
  renderBody(): JSX.Element {
    return (
      <div class="standard">
        {/* <headerBack title="嵌套路由"></headerBack> */}
        <div>
          <div class="tab">
            <router-link to="/setting/settingVue">
              <div class="children">我是settingVue组件</div>
            </router-link>
            <router-link to="/setting/homeTsx">
              <div class="children">我是homeTsx组件</div>
            </router-link>
            <router-link to="/setting/aboutVue">
              <div class="children">我是aboutVue组件</div>
            </router-link>
            <router-link to="/setting/about">
              <div class="children">我是about组件</div>
            </router-link>
            <router-link to="/setting/form">
              <div class="children">我是From组件</div>
            </router-link>
          </div>
          <router-view />
        </div>
      </div>
    )
  }
  render(): JSX.Element {
    return (
      <div class="home">
        {this.renderBody()}
        <img alt="Vue logo" src="src/assets/images/logo.png" />
        {/* <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> */}
        <Hello msg="Hello Vue 3.0 + Vite" />
      </div>
    )
  }
}

