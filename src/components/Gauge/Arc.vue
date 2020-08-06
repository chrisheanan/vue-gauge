<template>
  <path
    :d="d"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :fill="fill"
    :style="{ transitionDelay: `${transitionDelay}s` }"
  />
</template>

<script>
import { arcPath, polarToCartesian } from "../../lib/chart";

export default {
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
    startAngle: {
      type: Number,
      required: true,
    },
    endAngle: {
      type: Number,
      required: true,
    },
    startInnerAngle: {
      type: Number,
      required: false,
    },
    endInnerAngle: {
      type: Number,
      required: false,
    },
    transitionDelay: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      originAngleOffset: 180,
    };
  },
  computed: {
    innerRadius() {
      return this.radius - this.thickness;
    },
    centerX() {
      return this.radius + this.offsetX;
    },
    centerY() {
      return this.radius + this.offsetY;
    },
    angleA() {
      return this.max360(this.startAngle - this.originAngleOffset);
    },
    angleB() {
      return this.max360(this.endAngle - this.originAngleOffset);
    },
    innerAngleA() {
      return this.max360(
        this.startInnerAngle ? this.startInnerAngle - this.originAngleOffset : this.angleA,
      );
    },
    innerAngleB() {
      return this.max360(
        this.endInnerAngle ? this.endInnerAngle - this.originAngleOffset : this.angleB,
      );
    },
    largeArcFlag() {
      return this.angleB - this.angleA > 180;
    },
    d() {
      const outerArc = arcPath(
        this.centerX,
        this.centerY,
        this.radius,
        this.angleA,
        this.angleB,
        this.largeArcFlag,
      );

      const outerStart = polarToCartesian(this.centerX, this.centerY, this.radius, this.angleB);

      const innerArc = arcPath(
        this.centerX,
        this.centerY,
        this.innerRadius,
        -1 * this.innerAngleB,
        -1 * this.innerAngleA,
        this.largeArcFlag,
        true,
      );

      const innerStart = polarToCartesian(
        this.centerX,
        this.centerY,
        this.innerRadius,
        this.innerAngleB,
      );

      const innerEnd = polarToCartesian(
        this.centerX,
        this.centerY,
        this.innerRadius,
        this.innerAngleA,
      );

      return `M ${innerStart.x} ${innerStart.y} L ${outerStart.x} ${outerStart.y} ${outerArc} L ${innerEnd.x} ${innerEnd.y} ${innerArc}`;
    },
  },
  methods: {
    max360(angle) {
      return (angle + 360) % 360;
    },
  },
};
</script>

<style scoped>
path {
  transition: 0.3s fill ease-in-out, 0.3s stroke ease-in-out, 0.3s stroke-width ease-in-out;
}
</style>
