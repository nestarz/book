const cv = require("./src/opencv");

export default function opticalFlow(video, canvasOutput, isStopped) {
    let cap = new cv.VideoCapture(video);

    let frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let fgmask = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let fgbg = new cv.BackgroundSubtractorMOG2(500, 16, true);

    const FPS = 10;
    let deleted = false;
    function processVideo() {
        if (isStopped()) {
            if (!deleted) {
                frame.delete(); fgmask.delete(); fgbg.delete();
                deleted = true;
            }
            setTimeout(processVideo, 1000);
            return;
        }
        if (!isStopped() && deleted) {
            setTimeout(() => opticalFlow(video, canvasOutput, isStopped), 0);
            return;
        }
        let begin = Date.now();
        // start processing.
        cap.read(frame);
        fgbg.apply(frame, fgmask);
        cv.imshow(canvasOutput, fgmask);
        // schedule the next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    };

    // schedule the first one.
    setTimeout(processVideo, 0);
};