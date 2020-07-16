<script>
export default {
  render: function(createElement) {
    return createElement(this.tag, this.displayCount);
  },
  props: {
    to: {
      type: Number,
      required: true,
    },
    dp: {
      type: Number,
      required: false,
      default: 0,
    },
    tag: {
      type: String,
      required: false,
      default: "span",
    },
  },
  data() {
    return {
      previousCount: 0,
      count: 0,
      dirUp: true,
      interval: null,
      intervalTiming: 40,
    };
  },
  computed: {
    displayCount() {
      let count = this.count;

      if ((this.dirUp && this.count > this.to) || (!this.dirUp && this.count < this.to)) {
        count = this.to;
      }

      if (this.dp !== 0) {
        return count.toFixed(this.dp);
      }
      return count;
    },
    increment() {
      let inc = Math.ceil(this.to / 20);

      if (this.dp !== 0) {
        inc = parseFloat((Math.abs(this.to - this.previousCount) / 20).toFixed(this.dp));
      }

      if (inc <= 0) {
        if (this.dp !== 0) {
          return 10 ** (-1 * this.dp);
        }

        return 1;
      }

      return inc;
    },
  },
  mounted() {
    if (this.to < 0) {
      this.dirUp = false;
    }

    this.interval = setInterval(this.tick, this.intervalTiming);
  },
  watch: {
    to(newValue, oldValue) {
      this.previousCount = oldValue;
      this.dirUp = newValue >= oldValue;

      if (this.interval !== null) {
        clearInterval(this.interval);
      }

      this.interval = setInterval(this.tick, this.intervalTiming);
    },
  },
  methods: {
    tick() {
      if (
        (this.dirUp && this.count + this.increment >= this.to) ||
        (!this.dirUp && this.count + this.increment <= this.to)
      ) {
        this.count = this.to;

        return clearInterval(this.interval);
      }

      if (!this.dirUp) {
        if (this.dp !== 0) {
          return (this.count = parseFloat((this.count - this.increment).toFixed(this.dp)));
        }

        return (this.count -= this.increment);
      }

      if (this.dp !== 0) {
        return (this.count = parseFloat((this.count + this.increment).toFixed(this.dp)));
      }

      return (this.count += this.increment);
    },
  },
};
</script>
