import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export const Home =  defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    return () => (
      <>
        <h1>Home.tsx</h1>
        <h1>{store.state.title}</h1>
      </>
    );
  }
});
