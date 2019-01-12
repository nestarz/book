//view-source:https://docs.opencv.org/3.4/js_imgproc_camera.html

export function threshold(src, dst, thresholdValue) {
    cv.threshold(src, dst, thresholdValue, 200, cv.THRESH_BINARY);
    return dst;
}

export function canny(src, dstC1, cannyThreshold1, cannyThreshold2, 
                cannyApertureSize, cannyL2Gradient) {
    cv.cvtColor(src, dstC1, cv.COLOR_RGBA2GRAY);
    cv.Canny(dstC1, dstC1, cannyThreshold1, cannyThreshold2,
             cannyApertureSize, cannyL2Gradient);
    return dstC1;
}