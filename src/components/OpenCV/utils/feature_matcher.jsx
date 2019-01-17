export function orb(src, dst) {
    var img_color = new cv.Mat(); // Opencv likes RGB
    cv.cvtColor(src, img_color, cv.COLOR_RGBA2RGB, 0);
    var noArray = new cv.Mat();
    // Initiate STAR detector
    var orb = new cv.ORB(500, 1.2, 8, 31, 0, 2, 0, 31, 20);
    // find the keypoints with ORB
    var kp = new cv.KeyPointVector();
    orb.detect(img_color, kp, noArray);
    // compute the descriptors with ORB
    var des = new cv.Mat();
    orb.compute(img_color, kp, des);
    // draw only keypoints location,not size and orientation
    var img2 = new cv.Mat();
    var color = new cv.Scalar(0, 255, 0);
    cv.drawKeypoints(img_color, kp, img2, color, 0);
    show_image(img2, "canvas2");
    img2.delete();
    kp.delete();
    color.delete();
    orb.delete();
    des.delete();
    img_color.delete();
    return dst
}
