<template>
  <g>
    <Arc
      :radius="radius"
      :thickness="thickness"
      :offsetY="offsetY"
      :offsetX="offsetX"
      :transitionDelay="transitionDelay"
      :strokeWidth="inactiveStrokeWidth"
      :stroke="inactiveStroke"
      :fill="inactiveFill"
      :startAngle="outerAngle"
      :startInnerAngle="innerAngleAdjustment"
      :endAngle="180"
      v-if="inactive"
    />

    <Arc
      :radius="radius"
      :thickness="thickness"
      :offsetY="offsetY"
      :offsetX="offsetX"
      :transitionDelay="transitionDelay"
      :strokeWidth="activeStrokeWidth"
      :stroke="activeStroke"
      :fill="activeFill"
      :startAngle="180"
      :endAngle="360 - outerAngle"
      :endInnerAngle="360 - innerAngleAdjustment"
      v-if="active"
    />
  </g>
</template>

<script>
import Arc from "./Arc.vue";
import { innerAnglePointerAdjustment } from "../../lib/chart";
import styleProps from "../../lib/svgStyleProps";

export default {
  components: {
    Arc,
  },
  props: {
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
    angle: {
      type: Number,
      default: 4,
    },
    transitionDelay: {
      type: Number,
      required: false,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    ...styleProps("active", { fill: "currentcolor" }),
    inactive: {
      type: Boolean,
      default: true,
    },
    ...styleProps("inactive", { fill: "currentcolor" }),
  },
  computed: {
    innerRadius() {
      return this.radius - this.thickness;
    },
    outerAngle() {
      return this.angle;
    },
    innerAngleAdjustment() {
      return innerAnglePointerAdjustment(this.outerAngle, this.radius, this.innerRadius);
    },
  },
};
</script>
