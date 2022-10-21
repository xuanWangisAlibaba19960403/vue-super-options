import { isFunction, isPlainObject } from "./tool"
export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$super', {
    get(name) {
      const $super = this.$options.super
      if (!$super) {
        return null
      }
      if (!$super.methods) {
        return null
      }
      if (!isPlainObject($super.methods)) {
        return null
      }
      return new Proxy($super.methods,
        {
          get: (target, property) => {
            if (isFunction(target[property])) {
              return target[property].bind(this)
            }
            return null
          }
        }
      )
    }
  })
}
