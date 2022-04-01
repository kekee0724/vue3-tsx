// import { Vue } from "vue-class-component";

// import { get } from "@levi-m/core";

// const VueImpl = [
//   'data', 'beforeCreate', 'created', 'beforeMount',
//   'mounted', 'beforeUnmount', 'unmounted',
//   'beforeUpdate', 'updated', 'activated', 'deactivated',
//   'render', 'errorCaptured', 'serverPrefetch'
// ];
// export class Demo extends Vue {
//   beforeCreate() {
//     console.log("beforeCreate")
//   }
//   beforeMount() {
//     console.log(this)
//     console.log("beforeMount")
//     get('/index-infos').then(() => {

//     })
//   }
//   beforeUpdate() {
//     console.log("beforeUpdate")
//   }
//   renderBody(): JSX.Element {
//     return (
//       <div class="standard">
//         {/* <headerBack title="嵌套路由"></headerBack> */}
//         <router-view />
//       </div>
//     )
//   }
//   render(): JSX.Element {
//     return (
//       <div class="home">
//         {this.renderBody()}
//         <img alt="Vue logo" src="src/assets/images/logo.png" />
//       </div>
//     )
//   }
// }

import { defineComponent, reactive } from "vue"

import Toast, {
  ImagePicker,
  SegmentedControl,
  WingBlank
} from "antd-mobile-vue-next"

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121'
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122'
}];

export const Demo =  defineComponent({
  name: 'ImagePickerExample',
  setup(props, {emit, slots}) {
    const state = reactive({
      files: data,
      multiple: false
    });


    const onChange = (files, type, index) => {
      state.files = files;
    };
    const onSegChange = (index) => {
      state.multiple = index === 1;
    };


    return {
      state,
      onChange,
      onSegChange
    };
  },
  render() {
    const {files} = this.state;
    return (
        <WingBlank>
          <SegmentedControl
              values={['切换到单选', '切换到多选']}
              value={this.state.multiple ? 1 : 0}
              onChange={this.onSegChange}
          />
          <ImagePicker
              value={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 7}
              onFail={(msg) => {
                Toast.fail(msg);
              }}
              multiple={this.state.multiple}
          />
        </WingBlank>
    );
  }
});

