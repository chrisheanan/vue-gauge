<script>
export default {
  render: function(createElement) {
    return createElement(this.tag, this.$slots.default);
  },
  props: {
    level: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    tag() {
      if (this.level > 6) {
        return "h6";
      } else if (this.level < 1) {
        return "h1";
      }

      return `h${this.level}`;
    },
  },
};
</script>

<style scoped></style>
