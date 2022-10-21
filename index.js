import { isFunction, isPlainObject } from "./tool"
const single = new Map()
export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$super', {
    get() {
      if (single.has(this)) {
        return single.get(this)
      }
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
      const { proxy, revoke } = Proxy.revocable($super.methods,
        {
          get: (target, property) => {
            // 销毁 防止无用对象占据内存
            if (property === 'destroy') {
              single.delete(this)
              return revoke
            }
            if (isFunction(target[property])) {
              return target[property].bind(this)
            }
            return null
          }
        }
      )
      single.set(this, proxy)
      return proxy
    }
  })
}
