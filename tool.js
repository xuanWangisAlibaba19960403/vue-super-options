export const isPlainObject = function (target) {
  return Object.prototype.toString.call(target) === "[object Object]";
};

export const isFunction = function (fn) {
  return typeof fn === "function";
};

export const $DESTROY = "$destroy";

export const isVueComponent = function (prototype, Ctor) {
  return prototype instanceof Ctor;
};
