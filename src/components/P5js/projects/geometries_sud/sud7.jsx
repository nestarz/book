const sketch = (width, height, props) => {
    return function (p5) {
        var slotSize = 100
        var pg
        var marginX
        var marginY
        var offsetX = 0.5
        var offsetY = 0.5
        var step = 10
        var strokeW = 10;
        var opacity = 255;
        p5.setup = () => {
            p5.pixelDensity(1)

            pg = p5.createGraphics(slotSize, slotSize)
            pg.pixelDensity(1)

            pg.stroke(0, 0, 255, opacity)
            pg.strokeWeight(strokeW)
            pg.line(0, 0, +slotSize, 0)
            pg.line(0, 0, 0, +slotSize)

            p5.imageMode(p5.CENTER)
            p5.noLoop();
        }

        p5.draw = () => {
            p5.background(255)

            for (var x = -slotSize * 5; x < width + slotSize * 5; x += slotSize * 2) {
                for (var y = -slotSize * 5; y < height + slotSize * 5; y += slotSize * 2) {
                    p5.push()

                    for (var i = 0; i < slotSize; i += step) {
                        p5.image(pg, x + i, y + i)
                    }

                    p5.pop()
                }

            }

            for (var x = -slotSize * 5; x < width + slotSize * 5; x += slotSize * 2) {
                for (var y = -slotSize * 5; y < height + slotSize * 5; y += slotSize * 2) {
                    p5.push()

                    p5.translate(x, y)
                    p5.rotate(p5.PI / 2)

                    for (var i = 0; i < slotSize; i += step) {
                        p5.image(pg, i - slotSize * offsetY, i - slotSize * offsetX)
                    }

                    p5.pop()
                }

            }

        };

        p5.mouseReleased = () => {
            offsetX = p5.random(-1, 1)
            offsetY = p5.random(-1, 1)
            step = p5.int(p5.random(2, 15))
            strokeW = 2 + p5.random(5)
            opacity = p5.random(100, 255)

            pg = p5.createGraphics(slotSize, slotSize)
            pg.pixelDensity(1)

            pg.stroke(0, 0, 255, opacity)
            pg.strokeWeight(strokeW)
            pg.line(0, 0, +slotSize, 0)
            pg.line(0, 0, 0, +slotSize)
            p5.redraw();
        }

        p5.receiveProps = (nextProps) => {
            ////console.log(nextProps.value)
            //value = nextProps.value;
        };

        p5.unmount = () => {
            //console.log('The sketch was unmounted. Width was ' + width + ', height was ' + height);
        }
    }
};

export default sketch;