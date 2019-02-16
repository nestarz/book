const sketch = (width, height, props, theme) => {
    return function (p5) {
        var res = 0
        var recursion = 8;
        var seed;

        function drawMe(sz, angle, level) {


            for (var i = 0; i < p5.TWO_PI; i += angle) {
                p5.rotate(i);

                p5.push();
                p5.beginShape();
                p5.vertex(0 - sz, 0);
                p5.vertex(0, 0 + sz * 2 / 3);
                p5.vertex(0 + sz, 0);
                p5.vertex(0, 0 + sz * 1 / 3);
                p5.vertex(0 - sz, 0);
                p5.endShape();
                p5.pop();

            }

            if (level > 1) {
                level -= 1;
                drawMe(sz - level * 25, res, level)
            }
        }




        p5.setup = () => {
            p5.background(255);
            p5.colorMode(p5.HSB, 360, 100, 100, 100)
            p5.noLoop();
            seed = p5.random(1000);
            res = p5.PI / 2;
        }

        p5.draw = () => {
            p5.background(0, 0, 100);
            p5.randomSeed(seed)
            p5.strokeWeight(0.15)
            p5.stroke(0)
            p5.fill(p5.random(100), 80, 100, p5.random(100));
            //noFill()
            p5.push();
            p5.translate(width / 2, height / 2)
            drawMe(10, res, recursion);
            p5.pop();
        };

        p5.mousePressed = () => {
            seed = p5.random(10000)
            res = p5.PI / (p5.int(p5.random(1,12)))
            recursion = p5.int(p5.random(5, 7))
            p5.redraw(1);
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