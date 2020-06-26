<template>
  <path :d="d" :stroke="stroke" :stroke-width="strokeWidth" :fill="fill" />
</template>

<script>
import { arcPath, angleInRadians, angleInDegrees, polarToCartesian } from "../../lib/chart";

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
    arcAngle: {
      type: Number,
      required: true,
    },
    rotationAngle: {
      type: Number,
      default: 0,
    },
    pointerEdgeStart: {
      type: Boolean,
      default: false,
    },
    pointerEdgeEnd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      adjustedRotationAngle: this.rotationAngle - 180,
      innerRadius: this.radius - this.thickness,
      centerX: this.radius + this.offsetX,
      centerY: this.radius + this.offsetY,
    };
  },
  computed: {
    angleA() {
      return this.max360(this.adjustedRotationAngle);
    },
    angleB() {
      return this.max360(this.arcAngle + this.adjustedRotationAngle);
    },
    largeArcFlag() {
      return this.arcAngle > 180;
    },
    d() {
      let innerAngleA = this.angleA;
      let innerAngleB = this.angleB;

      if (this.pointerEdgeStart || this.pointerEdgeEnd) {
        const outerOpposite = Math.tan(angleInRadians(this.rotationAngle)) * this.radius;

        const pointerAdjustedInnerAngle = angleInDegrees(Math.atan(outerOpposite / this.innerRadius));
        if (this.pointerEdgeStart) {
          innerAngleA = this.max360(pointerAdjustedInnerAngle - 180);
        }

        if (this.pointerEdgeEnd) {
          const innerArcAngle = this.arcAngle + this.rotationAngle * 2 - pointerAdjustedInnerAngle * 2;
          innerAngleB = this.max360(pointerAdjustedInnerAngle + innerArcAngle - 180);
        }
      }

      const outerArc = arcPath(this.centerX, this.centerY, this.radius, this.angleA, this.angleB, this.largeArcFlag);

      const outerStart = polarToCartesian(this.centerX, this.centerY, this.radius, this.angleB);

      const innerArc = arcPath(
        this.centerX,
        this.centerY,
        this.innerRadius,
        -1 * innerAngleB,
        -1 * innerAngleA,
        this.largeArcFlag,
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
