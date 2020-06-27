<template>
  <g>
    <Arc
      :radius="radius"
      :thickness="thickness"
      :offsetY="offsetY"
      :offsetX="offsetX"
      :strokeWidth="strokeWidth"
      :stroke="stroke"
      :fill="inactiveColor"
      :startAngle="this.outerAngle"
      :startInnerAngle="this.innerAngleAdjustment"
      :endAngle="180"
    />

    <Arc
      :radius="radius"
      :thickness="thickness"
      :offsetY="offsetY"
      :offsetX="offsetX"
      :strokeWidth="strokeWidth"
      :stroke="stroke"
      :fill="activeColor"
      :startAngle="180"
      :endAngle="360 - this.outerAngle"
      :endInnerAngle="360 - this.innerAngleAdjustment"
    />
  </g>
</template>

<script>
import Arc from "./Arc.vue";
import { angleInRadians, angleInDegrees } from "../../lib/chart";

export default {
  components: {
    Arc,
  },
  props: {
    stroke: {
      type: String,
      default: "none",
    },
    strokeWidth: {
      type: Number,
      default: 0,
    },
    fill: {
      type: String,
      default: "currentcolor",
    },
    thickness: {
      type: Number,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    activeColor: {
      type: String,
      default: "currentcolor",
    },
    inactiveColor: {
      type: String,
      default: "none",
    },
  },
  data() {
    return {
      innerRadius: this.radius - this.thickness,
      outerAngle: 4,
    };
  },
  computed: {
    innerAngleAdjustment() {
      const outerOpposite = Math.tan(angleInRadians(this.outerAngle)) * this.radius;

      return angleInDegrees(Math.atan(outerOpposite / this.innerRadius));
    },
  },
};
</script>
