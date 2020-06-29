<template>
  <section :style="{ fontSize }">
    <h2>{{ title }}</h2>

    <svg :viewBox="`0 0 ${diameter} ${radius + 35}`" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="cut-off-bottom">
          <rect x="0" y="0" :width="diameter" :height="radius + 10" />
        </clipPath>

        <clipPath id="cut-off-max">
          <Arc
            :radius="radius"
            :thickness="thickness"
            :offsetY="10"
            :startAngle="180"
            :endAngle="360 - pointerGap"
            :endInnerAngle="360 - innerAngleAdjustment"
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
            :activeFill="value >= maxThreshold ? maxThresholdFill : activeFill"
            :activeStroke="value >= maxThreshold ? maxThresholdStroke : activeStroke"
            :activeStrokeWidth="value >= maxThreshold ? maxThresholdStrokeWidth : activeStrokeWidth"
            :inactiveFill="value >= maxThreshold ? maxThresholdFill : inactiveFill"
            :inactiveStroke="value >= maxThreshold ? maxThresholdStroke : inactiveStroke"
            :inactiveStrokeWidth="value >= maxThreshold ? maxThresholdStrokeWidth : inactiveStrokeWidth"
            :angle="pointerGap"
            :transitionDelay="maxTransitionDelay"
          />
        </g>
      </g>

      <g clip-path="url(#cut-off-bottom)">
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
                  v-if="maxThreshold !== null"
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
        <Count :to="displayValueWithDp" :dp="dp"></Count>
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
    minThresold: {
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
      maxTransitionDelay: 0,
    };
  },
  computed: {
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
    maxThresholdRotationStyle() {
      const angle =
        this.value >= this.maxThreshold ? this.maxThresholdAngle : this.needleAngle - (180 - this.maxThresholdAngle);
      return {
        transform: `rotate(${angle < 0 ? 0 : angle}deg)`,
      };
    },
    maxThresholdAngle() {
      return this.calcArcAngle(this.maxThreshold);
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

      this.maxTransitionDelay =
        0.7 * Math.abs((this.maxThresholdAngle - oldValueAngle) / (newValueAngle - oldValueAngle));

      console.log({ newValue, oldValue, newValueAngle, oldValueAngle, delay: this.maxTransitionDelay });
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
  transition: 1s linear transform;
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
