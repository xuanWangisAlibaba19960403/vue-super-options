export const isPlainObject = function(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

export const isFunction = function (fn) {
  return typeof fn === 'function'
}