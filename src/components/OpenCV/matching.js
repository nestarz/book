
import { videoDimensions } from "./utils/utils";
import { orb } from "./utils/feature2d";
const cv = require("./src/opencv");

export default function basic(video, canvasOutput, isStopped) {
    let scaledVideo = videoDimensions(video);
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let src2 = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);
    const FPS = 10;
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
            setTimeout(() => basic(video, canvasOutput, isStopped), 0);
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
        cap.read(src2);
        orb(src, dst);
        cv.resize(dst, dst, new cv.Size(scaledVideo.width, scaledVideo.height));
        cv.imshow(canvasOutput, dst);
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    };
    // schedule the first one.
    setTimeout(processVideo, 100);
};