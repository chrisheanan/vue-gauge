export default (property, defaults = {}) => {
  return {
    [`${property}Fill`]: {
      type: String,
      required: false,
      default: defaults.fill || "currentcolor",
    },
    [`${property}Stroke`]: {
      type: String,
      required: false,
      default: defaults.stroke || "none",
    },
    [`${property}StrokeWidth`]: {
      type: Number,
      required: false,
      default: defaults.strokeWidth || 0,
    },
  };
};
