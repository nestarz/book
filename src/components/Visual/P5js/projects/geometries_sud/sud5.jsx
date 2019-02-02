const sketch = (width, height, props) => {
    return function (p5) {
        // http://paulbourke.net/geometry/chladni/
        var m = 10;
        var n = 2;
        var epsilon = 0.05;
        var pg;
        p5.setup = () => {
            pg = p5.createGraphics(320, 240)
            pg.background(0);
            pg.pixelDensity(1)
            p5.pixelDensity(1)
            p5.frameRate(1);
        }

        p5.draw = () => {
            m = p5.map(p5.mouseX, 0, p5.width, 1, 20);
            n = p5.map(p5.mouseY, 0, p5.height, 1, 20);

            pg.strokeWeight(1.5)
            pg.background(0);
            pg.noFill()
            //pg.fill(255)
            pg.stroke(255, 15);

            for (var y = 0; y < pg.height; y++) {
                for (var x = 0; x < pg.width; x++) {
                    var chladni = p5.cos(n * p5.PI * x / pg.width) * p5.cos(m * p5.PI * y / pg.width) - p5.cos(m * p5.PI * x / pg.width) * p5.cos(n * p5.PI * y / pg.width);
                    if (p5.abs(chladni) <= epsilon) {
                        pg.ellipse(x, y, 20, 20);
                    }
                }
            }

            for (var i = 0; i < width / pg.width; i++) {
                for (var j = 0; j < width / pg.width; j++) {
                    p5.image(pg, i * pg.width, j * pg.height)
                }
            }


            /*
            var params = "m=" + int(m) + "; n=" + int(n) + "; epsilon=" + epsilon;
            fill(0, 205, 255);
            textSize(20)
            text(params, 5, 15);*/


        };

        p5.mousePressed = () => {
        }

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