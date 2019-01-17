const cv = require("../src/opencv");

export function orb(src, dst) {
let kp = new cv.KeyPointVector();
let descriptors = new cv.Mat();
let orb = new cv.ORB();
orb.detectAndCompute(src, new cv.Mat(), kp, descriptors);

// Run a matcher.
let dm = new cv.DMatchVector();
let matcher = new cv.BFMatcher();
matcher.match(descriptors, descriptors, dm);

const matchingImage = new cv.Mat();
cv.drawMatches(src, descriptors, src, descriptors, dm, matchingImage);

matchingImage.delete();
descriptors.delete();
dm.delete();
kp.delete();
orb.delete();
}

export function orb_legacy(src, dst) {
    var orb = new cv.ORB();
    var kp = new cv.KeyPointVector();
    orb.detect(src, kp);
    cv.drawKeypoints(src, kp, dst);
    kp.delete();
    orb.delete();
}