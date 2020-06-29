<template>
  <g>
    <circle
      :cx="radius"
      :cy="radius + 10"
      :r="pivotRadius"
      :fill="pivotFill"
      :stroke-width="pivotStrokeWidth"
      :stroke="pivotStroke"
    />
    <line
      :x1="radius / 2"
      :y1="radius + 10"
      :x2="pointerStrokeWidth / 2"
      :y2="radius + 10"
      :stroke-width="pointerStrokeWidth"
      :stroke="pointerStroke"
      stroke-linecap="round"
    />

    <line
      :x1="radius / 2"
      :y1="radius + 10"
      :x2="radius - pivotRadius + pivotStrokeWidth / 2"
      :y2="radius + 10"
      :stroke-width="pointerStrokeWidth"
      :stroke="pointerStroke"
      stroke-linecap="butt"
    />
  </g>
</template>

<script>
import styleProps from "../../lib/svgStyleProps";

export default {
  props: {
    radius: {
      type: Number,
      default: 215,
    },
    pointerStroke: {
      type: String,
      default: "currentcolor",
    },
    pointerStrokeWidth: {
      type: Number,
      default: 14,
    },
    pivotRadius: {
      type: Number,
      default: 20,
    },
    ...styleProps("pivot", { strokeWidth: 2, stroke: "currentcolor", fill: "currentcolor" }),
  },
};
</script>
