import bezierEasing from "bezier-easing";

// easing-alias : [x1, y1, x2, y2]
const easings = {
  ease: [0.25, 1, 0.25, 1],
  linear: [0, 0, 1, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
};

export const easing = (...easing) => {
  if (Object.prototype.hasOwnProperty.call(easings, easing[0])) {
    return bezierEasing(...easings[easing[0]]);
  }

  return bezierEasing(...easing);
};

export const easingInverse = (...easing) => {
  if (Object.prototype.hasOwnProperty.call(easings, easing[0])) {
    easing = Array.from(easings[easing[0]]);
  }

  [easing[1], easing[0], easing[3], easing[2]] = [easing[0], easing[1], easing[2], easing[3]];

  return bezierEasing(...easing);
};
