<template>
  <g fill="currentcolor">
    <text
      class="min"
      :x="thickness / 2"
      :y="radius + offsetY"
      :dy="2.5 * calculatedFontSize"
      v-if="labelsOnArc"
    >
      <tspan v-text="min" />
      <tspan class="unit" v-text="unit" v-if="unit && unitOnArc" />
    </text>

    <text
      class="max"
      :x="radius * 2 - thickness / 2"
      :y="radius + offsetY"
      :dy="2.5 * calculatedFontSize"
      v-if="labelsOnArc"
    >
      <tspan v-text="max" />
      <tspan class="unit" v-text="unit" v-if="unit && unitOnArc" />
    </text>

    <text
      class="value"
      :x="radius"
      :y="radius + offsetY"
      :dy="(labelsOnArc ? 6.25 : 5.25) * calculatedFontSize"
    >
      <count :to="valueDp" :dp="dp" tag="tspan" />
      <tspan class="unit" v-text="unit" v-if="unit" />
    </text>
  </g>
</template>

<script>
import Count from "../Count.vue";

export default {
  components: {
    Count,
  },
  props: {
    min: {
      type: [String, Number],
      required: true,
    },
    max: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    dp: {
      type: Number,
      required: false,
      default: 0,
    },
    unit: {
      type: String,
      required: false,
      default: null,
    },
    radius: {
      type: Number,
      required: true,
    },
    thickness: {
      type: Number,
      required: false,
      default: 70,
    },
    calculatedFontSize: {
      type: [String, Number],
      required: false,
      default: "1em",
    },
    offsetY: {
      type: Number,
      required: false,
      default: 0,
    },
    unitOnArc: {
      type: Boolean,
      required: false,
      default: true,
    },
    labelsOnArc: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    valueDp() {
      if (this.dp === 0) {
        return parseInt(this.value);
      }
      return parseFloat(this.value.toFixed(this.dp));
    },
  },
};
</script>

<style scoped>
svg {
  width: 100%;
  font-size: 1rem;
  overflow: visible;
}

text {
  /* word-spacing: 1em; */
  text-anchor: middle;
}

.min,
.max {
  font-size: 2em;
}

.value {
  font-size: 4em;
  text-anchor: middle;
}

.unit {
  font-size: 0.7em;
}
</style>
