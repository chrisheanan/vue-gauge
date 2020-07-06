import Gauge from "./src/components/Gauge.vue";

if (typeof window !== "undefined") {
  window.Vue.use(Gauge);
}

export default {
  install(Vue) {
    Vue.component("Gauge", Gauge);
  },
};

export { Gauge };
