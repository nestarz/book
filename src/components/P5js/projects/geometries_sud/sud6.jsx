const sketch = (width, height, props) => {
    return function (p5) {
        var seed = 160;
        var siz = 35;
        p5.setup = () => {
            p5.background(0);
            p5.rectMode(p5.CORNER);
            seed = p5.random(1000);
            p5.noLoop();
        }

        p5.draw = () => {
            p5.background(255);
            p5.randomSeed(seed);
            p5.strokeWeight(10)
            p5.stroke(0)

            for (var i = siz; i < width - siz; i += siz) {
                for (var j = siz; j < height - siz; j += siz) {
                    p5.push()
                    var rd = p5.random(100)
                    if (rd < 25) {
                        p5.line(i, j, i, j + siz);
                    }
                    else if (rd > 25 && rd < 50) {
                        p5.line(i + siz, j, i + siz, j + siz);
                    }
                    else if (rd > 50 && rd < 75) {
                        p5.line(i, j, i + siz, j);
                    }
                    else if (rd > 25 && rd < 50) {
                        p5.line(i + siz, j + siz, i + siz, j + siz);
                    }

                    p5.pop()
                }
            }

        };

        p5.mouseReleased = () => {
            seed = p5.random(1000);
            siz = p5.int(p5.random(20, 50))
            p5.redraw();
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