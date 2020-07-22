<script>
export default {
  render: function(createElement) {
    return createElement(this.tag, this.$slots.default);
  },
  props: {
    isSection: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tag() {
      return this.isSection ? "section" : "div";
    },
  },
};
</script>
