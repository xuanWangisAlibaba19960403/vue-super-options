基于 Proxy，提供一个$super 处理程序，用于从子类访问父 vue 方法。
不支持 Proxy，则不可使用。
推荐使用 vue-super

> vue-super is tested against vue@2
> Example:

```js
import Vue from "vue";
import VueSuper from "Vue-super-options";
Vue.use(VueSuper);

const Parent = Vue.extend({
  methods: {
    doTheThing: function () {
      console.log("father doTheThing");
    },
  },
});

const Child = Parent.extend({
  $super: Parent,
  methods: {
    doTheThing: function () {
      this.$super.doTheThing();
      console.log("child doTheThing");
    },
  },
});
```

离开页面请销毁 proxy

```js
const Child = Parent.extend({
  $super: Parent,
  beforeDestroy() {
    // $destroy规避同名方法
    // 主动清除无用proxy的依赖
    this.$super.$destroy();
  },
  methods: {
    doTheThing: function () {
      this.$super.doTheThing();
      console.log("child doTheThing");
    },
  },
});
```
