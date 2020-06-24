<template>
  <path :d="d" :stroke="stroke" :stroke-width="strokeWidth" :fill="fill" />
</template>

<script>
import { arcPath, angleInRadians, angleInDegrees, polarToCartesian } from "../../lib/chart";

export default {
  props: {
    stroke: {
      type: String,
      default: "currentcolor",
    },
    strokeWidth: {
      type: Number,
      default: 1,
    },
    fill: {
      type: String,
      default: "none",
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
    offsetAngle: {
      type: Number,
      default: -180,
    },
  },
  data() {
    return {
      angle: 4,
      innerRadius: this.radius - this.thickness,
      centerX: this.radius + this.offsetX,
      centerY: this.radius + this.offsetY,
    };
  },
  computed: {
    angleA() {
      return this.max360(this.angle + this.offsetAngle);
    },
    angleB() {
      return this.max360(360 - this.angle + this.offsetAngle);
    },
    d() {
      const outerOpposite = Math.tan(angleInRadians(this.angle)) * this.radius;

      const innerAngle = angleInDegrees(Math.atan(outerOpposite / this.innerRadius));

      const innerAngleA = this.max360(innerAngle + this.offsetAngle);

      const innerAngleB = this.max360(360 - innerAngle + this.offsetAngle);

      const outerArc = arcPath(this.centerX, this.centerY, this.radius, this.angleA, this.angleB, true);

      const outerStart = polarToCartesian(this.centerX, this.centerY, this.radius, this.angleB);

      const innerArc = arcPath(
        this.centerX,
        this.centerY,
        this.innerRadius,
        -1 * innerAngleB,
        -1 * innerAngleA,
        true,
        true,
      );

      const innerStart = polarToCartesian(this.centerX, this.centerY, this.innerRadius, innerAngleB);

      const innerEnd = polarToCartesian(this.centerX, this.centerY, this.innerRadius, innerAngleA);

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

<style scoped></style>
