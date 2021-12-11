/*
 * @Author: 可可同学
 * @Date: 2021-12-10 09:40:03
 * @LastEditTime: 2021-12-10 11:13:39
 * @LastEditors: 可可同学
 * @Description:
 */
import { defineComponent } from 'vue';
import HelloWord from '@levi-m/core-ui/components/HelloWord';
import Logo from '@/assets/images/logo.png';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <h1>About</h1>
        <img src={Logo}/>
        <HelloWord/>
      </>
    );
  }
});
