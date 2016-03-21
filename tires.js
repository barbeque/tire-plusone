function calculateTireCircumference(sectionWidthMm,
                                    profileRatio,
                                    wheelSizeInches) {
  var diameterInches = calculateTireDiameter(sectionWidthMm, profileRatio, wheelSizeInches);
  return Math.PI * diameterInches;
}

function calculateTireDiameter(sectionWidthMm, profileRatio, wheelSizeInches) {
  var widthInches = sectionWidthMm / 25.4;
  var sidewallHeightInches = widthInches * (profileRatio / 100);
  var diameterInches = sidewallHeightInches * 2 + wheelSizeInches;
  return diameterInches;
}

function calculateCircumferenceDifferential(oldCircumference, newCircumference) {
  return newCircumference/oldCircumference;
}

function formatDifference(difference) {
  var d = difference - 1;
  return d;
}
