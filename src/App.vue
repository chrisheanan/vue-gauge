<template>
  <div id="app">
    <Gauge
      title="Example Gauge"
      fontSize="1em"
      :min="0"
      :max="100"
      :value="3"
      unit="%"
      style="width: 430px"
    />

    <Gauge title="Example 2 Gauge" :min="20" :max="30" :value="23" style="width: 430px" />
  </div>
</template>

<script>
import Gauge from "./components/Gauge.vue";

export default {
  name: "App",
  components: {
    Gauge,
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
