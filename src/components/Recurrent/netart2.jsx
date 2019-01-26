import { Graph, Mat, R, RandMat, Utils } from 'recurrent-js';

// settings of nnet:
let networkSize = 8;
let nHidden = 4;
let nOut = 3; // r, g, b layers

function getRandomLocation(mask, nImage) {
    var i, result = 0, r;
    for (i = 0; i < nImage; i++) {
        result += mask[i];
    }
    if (result === nImage) {
        mask = Utils.zeros(nImage);
    }
    do {
        r = Utils.randi(0, nImage);
    } while (mask[r] !== 0);
    mask[r] = 1;
    return r;
}

var initModel = function (networkSize, nHidden, nOut) {
    "use strict";
    var model = [];
    var i;
    var randomSize = 1.0;
    // define the model below:
    model.w_in = new RandMat(networkSize, 3, 0, randomSize); // x, y, and bias
    for (i = 0; i < nHidden; i++) {
        model['w_' + i] = new RandMat(networkSize, networkSize, 0, randomSize);
    }
    model.w_out = new RandMat(nOut, networkSize, 0, randomSize); // output layer
    return model;
};


var forwardNetwork = function (G, model, x_, y_) {
    // x_, y_ is a normal javascript float, will be converted to a mat object below
    // G is a graph to amend ops to
    var x = new Mat(3, 1); // input
    var i;
    x.set(0, 0, x_);
    x.set(1, 0, y_);
    x.set(2, 0, 1.0); // bias.
    var out;
    out = G.tanh(G.mul(model.w_in, x));
    for (i = 0; i < nHidden; i++) {
        out = G.tanh(G.mul(model['w_' + i], out));
    }
    out = G.sig(G.mul(model.w_out, out));
    return out;
};


function getColorAt(G, model, x, y) {
    // function that returns a color given coordintes (x, y)
    // (x, y) are scaled to -0.5 -> 0.5 for image recognition later
    // but it can be behond the +/- 0.5 for generation above and beyond
    // recognition limits
    var r, g, b;
    var out = forwardNetwork(G, model, x, y);

    r = out.w[0] * 255.0;
    g = out.w[1] * 255.0;
    b = out.w[2] * 255.0;

    return [r, g, b];
}


const sketch = (width, height, props) => {
    return function (p5) {
        // actual size of generated image
        var sizeh = p5.min(10*6, Math.floor(width / (12*6)));
        var sizew = sizeh;

        var G = new Graph(false);

        let nW, nH, nImage, mask, img;
        let model;

        function genImage(img, model) {
            img.loadPixels();
            for (var y = 0; y < img.height; y++) {
                for (var x = 0; x < img.width; x++) {
                    var c = getColorAt(G, model, x / sizeh - 0.5, y / sizew - 0.5);
                    var index = (x + y * img.width) * 4;
                    img.pixels[index + 0] = c[0];
                    img.pixels[index + 1] = c[1];
                    img.pixels[index + 2] = c[2];
                    img.pixels[index + 3] = 255;
                }
            }
            img.updatePixels();
        }

        p5.setup = () => {
            nW = Math.max(Math.ceil(width / sizew), 1);
            nH = Math.max(Math.ceil(height / sizeh), 1);
            nImage = nH * nW;
            mask = Utils.zeros(nImage);
            img = p5.createImage(sizeh, sizew);
            p5.pixelDensity(1);
            p5.frameRate(props.frameRate ? props.frameRate : 5);
            //console.log(props.frameRate ? props.frameRate : 5);
        }

        p5.draw = () => {
            model = initModel(networkSize, nHidden, nOut);
            genImage(img, model);
            var n = getRandomLocation(mask, nImage);
            var row = Math.floor(n / nW);
            var col = n % nW;
            p5.image(img, col * sizew, row * sizeh);
            //console.log(img);
        };

        p5.receiveProps = (nextProps) => {
            //////console.log(nextProps.value)
            //value = nextProps.value;
        };

        p5.unmount = () => {
            ////console.log('The sketch was unmounted. Width was ' + width + ', height was ' + height);
        }
    }
};

export default sketch;
