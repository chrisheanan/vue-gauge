import Gauge from "./src/components/Gauge.vue";
import Count from "./src/components/Count.vue";
import Heading from "./src/components/Heading.vue";

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(Count);
  window.Vue.use(Gauge);
  window.Vue.use(Heading);
}

export default {
  install(Vue) {
    Vue.component("Count", Count);
    Vue.component("Gauge", Gauge);
    Vue.component("Heading", Heading);
  },
};

export { Gauge, Count, Heading };
