const sketch = (width, height, props) => {
    return function (p5) {
        var nLoop = 0;
        var timer =
        {
            val: 0,
            type: true
        };
        var dot =
        {
            x: 100,
            y: 100,
            diameter: p5.random(10, 30),
            type: 0,
            col: {
                r: 10,
                g: 10,
                b: 10,
                a: 100
            }
        };

        function randomise() {
            dot.type = p5.random(0, 5);
            dot.x = p5.random(0, width);
            dot.y = p5.random(0, height);
            dot.col.r = p5.map(dot.x, 0, width, 0, 255);
            dot.col.g = p5.map(dot.y, 0, height, 0, 255);
            dot.col.b = p5.map(dot.x + dot.y, 0, width + height, 0, 255);
            dot.col.a = p5.random(10, 200);
        }

        p5.setup = () => {
            p5.frameRate(60);
        }

        p5.draw = () => {
            if (nLoop > 200) p5.noLoop();
            nLoop++;

            randomise();
            p5.noStroke();
            p5.fill(dot.col.r, dot.col.g, dot.col.b, dot.col.a);

            if (dot.type <= 1) {
                p5.ellipse(dot.x, dot.y, dot.diameter, dot.diameter);
            }
            else if (dot.type <= 2) {
                p5.rect(dot.x, dot.y, dot.diameter, dot.diameter);
            }
            else if (dot.type <= 3 && dot.type >= 2.7) {
                p5.stroke(dot.col.r, dot.col.g, dot.col.b);
                var newx = p5.random(-dot.diameter / 100, dot.diameter / 100);
                var newy = p5.random(-dot.diameter, dot.diameter);
                p5.line(dot.x, dot.y, dot.x + newx, dot.x + newy);
            }
            else {
            }

        };

        p5.mousePressed = () => {
            //p5.background(dot.col.r, dot.col.g, dot.col.b);
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