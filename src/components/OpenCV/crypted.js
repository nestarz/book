import { videoDimensions } from "./utils/utils";
import { canny, threshold } from "./utils/filters";
const cv = require("./src/opencv");

export default function crypted(video, canvasOutput, isStopped) {
    let scaledVideo = videoDimensions(video);
    //console.log(video.height, video.width, scaledVideo.height, scaledVideo.width);
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);
    const FPS = 28;
    let deleted = false;
    function processVideo() {
        if (isStopped()) {
            if (!deleted) {
                // clean and stop.
                src.delete(); dst.delete(); 
                deleted = true;
            }
            setTimeout(processVideo, 1000);
            return;
        }
        if (!isStopped() && deleted) {
            setTimeout(() => crypted(video, canvasOutput, isStopped), 0);
            return;
        }
        if (src.cols != video.width || src.rows != video.height) {
            scaledVideo = videoDimensions(video);
            src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
            dst = new cv.Mat(scaledVideo.height, scaledVideo.width, cv.CV_8UC1);
        }
        let begin = Date.now();
        // start processing.
        cap.read(src);
        cv.resize(src, src, new cv.Size(30, scaledVideo.height));
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        //dst = threshold(dst, dst, 60);
        dst = canny(src, dst, 100, 100, 3, false);
        cv.resize(dst, dst, new cv.Size(scaledVideo.width, scaledVideo.height));
        cv.imshow(canvasOutput, dst);
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    };
    // schedule the first one.
    setTimeout(processVideo, 100);
}
