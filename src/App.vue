<template>
  <div id="app">
    <button
      type="button"
      @click="() => {exampleValue = (Math.random() * Math.floor(100));}"
    >Random Number</button>
    <Gauge
      title="Example Gauge"
      fontSize="1em"
      :min="0"
      :max="100"
      :dp="1"
      :value="exampleValue"
      unit="%"
      style="width: 430px"
    />

    <Gauge title="Example 2 Gauge" :min="5" :max="30" :value="20" style="width: 430px" />
  </div>
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
  justify-content: space-around;
}
</style>
