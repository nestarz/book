export const initializeFFTs = (number, pointCount) => {
  var ffts = [];
  for (var i = 0; i < number; i++) {
    ffts.push(Array.apply(null, Array(pointCount)).map(
      Number.prototype.valueOf, 0
    ));
  }
  return ffts;
};
