<template>
  <section>
    <h1>Gauges</h1>

    <button
      type="button"
      @click="() => {
        exampleValue = Math.random() * Math.floor(100);
      }"
    >Random Number</button>

    <div id="app">
      <Gauge
        title="Example Random Value"
        fontSize="1em"
        :min="0"
        :max="100"
        :dp="1"
        :value="exampleValue"
        unit="%"
        style="width: 430px"
        inactiveFill="#212121"
        :minThreshold="30"
        :maxThreshold="70"
        minThresholdFill="lawngreen"
        maxThresholdFill="darkred"
      />

      <Gauge
        title="Example 2 Fixed"
        :min="5"
        :max="30"
        :value="20"
        :maxThreshold="15"
        style="width: 430px"
        :pointerGap="2"
        :thickness="30"
        :pointerStrokeWidth="4"
        :pivotRadius="10"
        :pivotStrokeWidth="3"
        pivotFill="none"
      />

      <!--
      <Gauge title="Example 3 Zero Meter" :min="5" :max="30" :value="5" style="width: 430px" />
      <Gauge title="Example 4 Full Reading" :min="5" :max="30" :value="30" style="width: 430px" />-->
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
};
</script>

<style>
body {
  background-color: #000;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

button {
  margin: auto;
  display: block;
}
</style>
