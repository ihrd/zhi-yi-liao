import { isInSSRComponentSetup, injectHook, getCurrentInstance } from "vue";
const isString = (val) => typeof val === "string";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_RESIZE = "onResize";
function requireNativePlugin(name) {
  return weex.requireModule(name);
}
function formatAppLog(type, filename, ...args) {
  if (uni.__log__) {
    uni.__log__(type, filename, ...args);
  } else {
    console[type].apply(console, [...args, filename]);
  }
}
function resolveEasycom(component, easycom) {
  return isString(component) ? easycom : component;
}
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook(ON_SHOW);
const onHide = /* @__PURE__ */ createHook(ON_HIDE);
const onResize = /* @__PURE__ */ createHook(ON_RESIZE);
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
export {
  _export_sfc as _,
  resolveEasycom as a,
  onShow as b,
  onHide as c,
  formatAppLog as f,
  onResize as o,
  requireNativePlugin as r
};
