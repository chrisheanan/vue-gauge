<template>
  <section :style="{ fontSize }">
    <h2>{{ title }}</h2>

    <svg :viewBox="`0 0 ${diameter} ${radius + 35}`" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="cut-off-bottom">
          <rect x="0" y="0" :width="diameter" :height="radius + 10" />
        </clipPath>

        <clipPath id="cut-off-min" v-if="minThreshold !== null">
          <Arc
            :radius="radius"
            :thickness="thickness"
            :offsetY="10"
            :startAngle="0"
            :endAngle="minThresholdAngle"
          />
        </clipPath>

        <clipPath id="cut-off-max" v-if="maxThreshold !== null">
          <Arc
            :radius="radius"
            :thickness="thickness"
            :offsetY="10"
            :startAngle="maxThresholdAngle"
            :endAngle="180"
          />
        </clipPath>
      </defs>

      <g class="rotatable" :style="needleRotationStyle">
        <pointer
          :radius="radius"
          :pointerStroke="pointerStroke"
          :pointerStrokeWidth="pointerStrokeWidth"
          :pivotRadius="pivotRadius"
          :pivotFill="pivotFill"
          :pivotStroke="pivotStroke"
          :pivotStrokeWidth="pivotStrokeWidth"
        />
      </g>

      <g clip-path="url(#cut-off-bottom)">
        <g class="rotatable" :style="needleRotationStyle">
          <pointer-arcs
            :radius="radius"
            :thickness="thickness"
            :offsetY="10"
            :activeFill="compActiveFill"
            :activeStroke="compActiveStroke"
            :activeStrokeWidth="compActiveStrokeWidth"
            :inactiveFill="compInactiveFill"
            :inactiveStroke="compInactiveStroke"
            :inactiveStrokeWidth="compInactiveStrokeWidth"
            :angle="pointerGap"
            :transitionDelay="maxTransitionDelay"
          />
        </g>
      </g>

      <g clip-path="url(#cut-off-bottom)" v-if="minThreshold !== null">
        <g class="rotatable" :style="{ transform: `rotate(${minThresholdAngle}deg)` }">
          <g clip-path="url(#cut-off-min)">
            <g class="rotatable" :style="{ transform: `rotate(-${minThresholdAngle}deg)` }">
              <g class="rotatable" :style="needleRotationStyle">
                <pointer-arcs
                  :radius="radius"
                  :thickness="thickness"
                  :offsetY="10"
                  :active="false"
                  :inactiveFill="inactiveFill"
                  :inactiveStroke="inactiveStroke"
                  :inactiveStrokeWidth="inactiveStrokeWidth"
                  :angle="pointerGap"
                />
              </g>
            </g>
          </g>
        </g>
      </g>

      <g clip-path="url(#cut-off-bottom)" v-if="maxThreshold !== null">
        <g class="rotatable" :style="{ transform: `rotate(${maxThresholdAngle}deg)` }">
          <g clip-path="url(#cut-off-max)">
            <g class="rotatable" :style="{ transform: `rotate(-${maxThresholdAngle}deg)` }">
              <g class="rotatable" :style="needleRotationStyle">
                <pointer-arcs
                  :radius="radius"
                  :thickness="thickness"
                  :offsetY="10"
                  :inactive="false"
                  :activeFill="activeFill"
                  :activeStroke="activeStroke"
                  :activeStrokeWidth="activeStrokeWidth"
                  :angle="pointerGap"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <div class="labels">
      <div class="min" :style="{ flexBasis: `${thickness}px`}">
        <span v-text="min"></span>
        <span class="unit" v-text="unit"></span>
      </div>
      <div class="max" :style="{ flexBasis: `${thickness}px`}">
        <span v-text="max"></span>
        <span class="unit" v-text="unit"></span>
      </div>
      <div class="value">
        <count :to="displayValueWithDp" :dp="dp" />
        <span class="unit" v-text="unit"></span>
      </div>
    </div>
  </section>
</template>

<script>
import Arc from "./Gauge/Arc.vue";
import Pointer from "./Gauge/Pointer.vue";
import PointerArcs from "./Gauge/PointerArcs.vue";
import Count from "./Count.vue";
import styleProps from "../lib/svgStyleProps";
import { innerAnglePointerAdjustment } from "../lib/chart";
import { easingInverse } from "../lib/easing";

export default {
  name: "Gauge",
  components: {
    Arc,
    Count,
    Pointer,
    PointerArcs,
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
    maxThreshold: {
      type: Number,
      required: false,
      default: null,
    },
    minThreshold: {
      type: Number,
      required: false,
      default: null,
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
      required: false,
      default: 215,
    },
    height: {
      type: Number,
      required: false,
      default: 225,
    },
    thickness: {
      type: Number,
      required: false,
      default: 70,
    },
    fontSize: {
      type: String,
      required: false,
      default: "16px",
    },
    pointerGap: {
      type: Number,
      required: false,
      default: 4,
    },
    pointerStroke: {
      type: String,
      required: false,
      default: "currentcolor",
    },
    pointerStrokeWidth: {
      type: Number,
      required: false,
      default: 14,
    },
    pivotRadius: {
      type: Number,
      required: false,
      default: 20,
    },
    ...styleProps("pivot", { strokeWidth: 2, stroke: "currentcolor", fill: "currentcolor" }),
    ...styleProps("arc"),
    ...styleProps("minThreshold"),
    ...styleProps("maxThreshold"),
    ...styleProps("active", { fill: "currentcolor" }),
    ...styleProps("inactive", { fill: "none" }),
  },
  data() {
    return {
      minTransitionDelay: 0,
      maxTransitionDelay: 0,
    };
  },
  computed: {
    compActiveFill() {
      if (this.minThresholdActive) {
        return this.minThresholdFill;
      } else if (this.maxThresholdActive) {
        return this.maxThresholdFill;
      }

      return this.activeFill;
    },
    compActiveStroke() {
      if (this.minThresholdActive) {
        return this.minThresholdStroke;
      } else if (this.maxThresholdActive) {
        return this.maxThresholdStroke;
      }

      return this.activeStroke;
    },
    compActiveStrokeWidth() {
      if (this.minThresholdActive) {
        return this.minThresholdStrokeWidth;
      } else if (this.maxThresholdActive) {
        return this.maxThresholdStrokeWidth;
      }

      return this.activeStrokeWidth;
    },
    compInactiveFill() {
      if (this.minThresholdActive) {
        return this.minThresholdFill;
      } else if (this.maxThresholdActive) {
        return this.maxThresholdFill;
      }

      return this.inactiveFill;
    },
    compInactiveStroke() {
      if (this.minThresholdActive) {
        return this.minThresholdStroke;
      } else if (this.maxThresholdActive) {
        return this.maxThresholdStroke;
      }

      return this.inactiveStroke;
    },
    compInactiveStrokeWidth() {
      if (this.minThresholdActive) {
        return this.minThresholdStrokeWidth;
      } else if (this.maxThresholdActive) {
        return this.maxThresholdStrokeWidth;
      }

      return this.inactiveStrokeWidth;
    },
    diameter() {
      return this.radius * 2;
    },
    displayValueWithDp() {
      if (this.dp === 0) {
        return this.displayValue;
      }
      return parseFloat(this.displayValue.toFixed(this.dp));
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
    innerAngleAdjustment() {
      return innerAnglePointerAdjustment(this.pointerGap, this.radius, this.radius - this.thickness);
    },
    needleAngle() {
      return this.calcArcAngle(this.displayValueWithDp);
    },
    needleRotationStyle() {
      return {
        transform: `rotate(${this.needleAngle}deg)`,
      };
    },
    minThresholdAngle() {
      // if (this.maxThresholdActive) {
      //   return 180 + (180 - this.maxThresholdAngle);
      // }

      return this.calcArcAngle(this.minThreshold);
    },
    minThresholdActive() {
      return this.value <= this.minThreshold;
    },
    maxThresholdAngle() {
      // if (this.minThresholdActive) {
      //   return 0;
      // }

      return this.calcArcAngle(this.maxThreshold);
    },
    maxThresholdActive() {
      return this.value >= this.maxThreshold;
    },
  },
  methods: {
    calcArcAngle(value) {
      return ((value - this.min) / (this.max - this.min)) * 180;
    },
  },
  watch: {
    value(newValue, oldValue) {
      const newValueAngle = this.calcArcAngle(newValue);
      const oldValueAngle = this.calcArcAngle(oldValue);
      const easingFunction = easingInverse("ease-in-out");

      this.maxTransitionDelay = easingFunction(
        0.7 * Math.abs((this.maxThresholdAngle - oldValueAngle) / (newValueAngle - oldValueAngle)),
      );

      return this.newValue;
    },
  },
};
</script>

<style scoped>
section {
  position: relative;
  padding: 1em;
}

svg {
  width: 100%;
  display: block;
  margin: auto;
}

.rotatable {
  transition: 1s ease-in-out transform;
  transform: rotate(0deg);
  transform-origin: 215px 225px;
  will-change: transform;
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
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.value .unit,
.min .unit,
.max .unit {
  font-size: 0.6em;
  margin-left: 0.125em;
}
</style>
