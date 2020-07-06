<template>
  <div class="labels">
    <div class="min" :style="{ flexBasis: `${thickness}px` }">
      <span v-text="min"></span>
      <span class="unit" v-text="unit"></span>
    </div>
    <div class="max" :style="{ flexBasis: `${thickness}px` }">
      <span v-text="max"></span>
      <span class="unit" v-text="unit"></span>
    </div>
    <div class="value">
      <count :to="valueDp" :dp="dp" />
      <span class="unit" v-text="unit"></span>
    </div>
  </div>
</template>

<script>
import Count from "../Count.vue";

export default {
  components: {
    Count,
  },
  props: {
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
