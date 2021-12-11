import { defineComponent } from "vue";

import Logo from "@/assets/images/logo.png";
import { HelloWord } from "@levi-m/core-ui";

export const About = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <h1>About</h1>
        <img src={Logo} />
        <HelloWord />
      </>
    );
  }
});
