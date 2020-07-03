export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angle = angleInRadians(angleInDegrees);

  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

export const angleInRadians = deg => (deg * Math.PI) / 180.0;

export const angleInDegrees = rad => (rad * 180) / Math.PI;

export const arcPath = (
  x,
  y,
  radius,
  startAngle,
  endAngle,
  largeArcFlag = null,
  sweepFlag = false,
  moveTo = false,
) => {
  const end = polarToCartesian(x, y, radius, Math.abs(startAngle));

  if (largeArcFlag === null) {
    largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? 0 : 1;
  } else {
    largeArcFlag = largeArcFlag ? 1 : 0;
  }

  sweepFlag = sweepFlag ? 1 : 0;

  const arc = `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;

  if (moveTo) {
    const start = polarToCartesian(x, y, radius, Math.abs(endAngle));

    return `M ${start.x} ${start.y} ${arc}`;
  }

  return arc;
};

export const innerAnglePointerAdjustment = (outerAngle, outerRadius, innerRadius) => {
  const outerOpposite = Math.tan(angleInRadians(outerAngle)) * outerRadius;

  return angleInDegrees(Math.atan(outerOpposite / innerRadius));
};
