<template>
  <section>
    <h1>Demo Gauges</h1>

    <aside>
      <button type="button" @click="minToMax">0 - 100 Toggle</button>

      <button type="button" @click="random">Random Number</button>
    </aside>

    <div id="app">
      <gauge heading="Required Props" :min="0" :max="100" :value="exampleValue" />

      <gauge
        heading="Example"
        fontSize="1em"
        :min="0"
        :max="100"
        :dp="1"
        :value="exampleValue"
        unit="%"
        style="width: 430px"
        inactiveFill="#212121"
        :minThreshold="20"
        :maxThreshold="70"
        minThresholdFill="lawngreen"
        maxThresholdFill="darkred"
      />

      <gauge
        heading="Inverse Example"
        fontSize="1em"
        :min="100"
        :max="0"
        :dp="1"
        :value="exampleValue"
        unit="%"
        style="width: 430px"
        inactiveFill="#212121"
        :minThreshold="80"
        :maxThreshold="25"
        :pointerGap="5"
        :pointerStrokeWidth="16"
        minThresholdFill="darkred"
        maxThresholdFill="lawngreen"
      />

      <gauge
        heading="Minimal Example"
        :min="5"
        :max="30"
        :value="exampleValue"
        :maxThreshold="25"
        style="width: 430px"
        maxThresholdFill="darkred"
        :pointerGap="4"
        :thickness="15"
        :radius="100"
        fontSize="0.5em"
        :pointerStrokeWidth="4"
        :pivotRadius="6"
        :pivotStrokeWidth="3"
        pivotFill="none"
        inactiveFill="#222"
      />

      <gauge
        heading="Traffic Light Example"
        :min="0"
        :max="50"
        :value="exampleValue"
        :labelsOnArc="false"
        style="width: 430px"
        :minThreshold="15"
        minThresholdFill="lawngreen"
        :maxThreshold="35"
        maxThresholdFill="darkred"
        :valueToExceedLimits="true"
        activeFill="yellow"
        inactiveFill="yellow"
        :pointerGap="2"
        :thickness="40"
        :pointerStrokeWidth="4"
        :pivotRadius="10"
        :pivotStrokeWidth="3"
      />

      <gauge
        heading="Negative Range Example"
        :min="-50"
        :max="50"
        unit="C"
        :value="exampleValue - 50"
        :minThreshold="-15"
        minThresholdFill="skyblue"
        :maxThreshold="35"
        maxThresholdFill="green"
        style="width: 430px"
        activeFill="dodgerblue"
        inactiveFill="none"
        :pointerGap="2"
        :thickness="10"
        pointerStroke="dodgerblue"
        :pointerStrokeWidth="4"
        :pivotRadius="2"
        pivotFill="dodgerblue"
        pivotStroke="dodgerblue"
        :pivotStrokeWidth="1"
      />

      <gauge
        heading="Example Speed-o-meter"
        minLabel="Slowest"
        :min="0"
        maxLabel="Fastest"
        :max="120"
        unit="mph"
        :unitOnArc="false"
        :value="exampleValue"
        style="width: 430px"
        activeFill="currentcolor"
        inactiveFill="currentcolor"
        :pointerGap="2"
        :thickness="5"
        pointerStroke="darkred"
        :pointerStrokeWidth="4"
        :pivotRadius="10"
        pivotFill="none"
        pivotStroke="darkred"
        :pivotStrokeWidth="3"
        maxThresholdFill="darkred"
        :maxThreshold="70"
      />
    </div>
  </section>
</template>

<script>
import Gauge from "./components/Gauge.vue";

export default {
  name: "App",
  components: {
    Gauge,
  },
  data() {
    return {
      exampleValue: 0,
    };
  },
  mounted() {
    this.random();
  },
  methods: {
    random() {
      this.exampleValue = Math.random() * Math.floor(100);
    },
    minToMax() {
      this.exampleValue = this.exampleValue === 0 ? 100 : 0;
    },
  },
};
</script>

<style>
body {
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  margin: auto;
  padding: 1em;
  text-align: center;
}

aside {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

button {
  border: none;
  border-radius: 3px;
  background-color: #06c;
  color: #fff;
  display: block;
  font-weight: bold;
  font-size: 1em;
  height: 2em;
  margin: auto 1em;
  padding: 0 1em;
}

#app {
  text-align: center;
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
