<template>
  <section :style="{fontSize}">
    <h2>{{ title }}</h2>

    <svg :viewBox="`0 0 ${diameter} ${radius + 35}`" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="cut-off-bottom">
          <rect x="0" y="0" :width="diameter" :height="radius + 10" />
        </clipPath>
      </defs>

      <g :style="needleRotationStyle">
        <circle :cx="radius" :cy="radius + 10" r="25" fill="currentcolor" />
        <line
          :x1="radius"
          :y1="radius + 10"
          x2="7"
          :y2="radius + 10"
          stroke-width="14"
          stroke="currentcolor"
          stroke-linecap="round"
        />
      </g>

      <g clip-path="url(#cut-off-bottom)">
        <g :style="needleRotationStyle">
          <Arc :radius="radius" :thickness="thickness" :offsetY="10" fill="currentcolor" />
        </g>
      </g>
    </svg>
    <div class="labels">
      <div class="min" :style="{ flexBasis: `${thickness}px`}">
        <span>{{ min }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
      <div class="max" :style="{ flexBasis: `${thickness}px`}">
        <span>{{ max }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
      <div class="value">
        <span>{{ displayValue }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import Arc from "./Gauge/Arc.vue";

export default {
  name: "Gauge",
  components: {
    Arc,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: false,
      default: null,
    },
    fontSize: {
      type: String,
      default: "16px",
    },
  },
  data() {
    return {
      radius: 215,
      height: 225,
      thickness: 70,
    };
  },
  computed: {
    diameter() {
      return this.radius * 2;
    },
    displayValue() {
      if (this.value > this.max) {
        return this.max;
      }

      if (this.value < this.min) {
        return this.min;
      }

      return this.value;
    },
    rotationAngle() {
      return ((this.displayValue - this.min) / (this.max - this.min)) * 180;
    },
    needleRotationStyle() {
      return {
        transition: "1s ease-in-out transform",
        transform: `rotate(${this.rotationAngle}deg)`,
        transformOrigin: "215px 225px",
      };
    },
  },
  mounted() {},
};
</script>

<style scoped>
section {
  position: relative;
}

svg {
  width: 100%;
  display: block;
  margin: auto;
}

.needleRotationStyle {
  transition: 1s ease-in-out transform;
  transform: rotate(90deg);
  transform-origin: 215px 225px;
}

.labels {
  display: flex;
  flex-flow: row nowrap;
  margin-top: -0.5rem;
}

.min,
.max {
  font-size: 2em;
  flex: 0 0 auto;
}

.max {
  order: 1;
}

.value {
  flex: 1 1 auto;
  font-size: 6em;
  margin-top: 1rem;
}

.value .unit,
.min .unit,
.max .unit {
  font-size: 0.6em;
  margin-left: 0.125em;
}
</style>