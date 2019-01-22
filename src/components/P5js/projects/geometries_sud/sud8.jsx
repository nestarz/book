const sketch = (width, height, props) => {
    return function (p5) {

        var siz = 250;
        var pg
        var noiseX
        var noiseY
        var seed

        p5.setup = () => {
            p5.background(100);
            p5.pixelDensity(1)
            seed = p5.random(5000)


            noiseX = p5.random(10000);
            noiseY = p5.random(10000);


            pg = p5.createGraphics(siz, siz)

            pg.strokeCap(p5.ROUND)
            pg.stroke(0)
            p5.noLoop();
        }

        p5.draw = () => {
            p5.randomSeed(seed)
            //p5.background(0);
            //p5.noStroke();
            //p5.noFill();
            for (var x = 0; x < pg.width; x += 1) {
                for (var y = 0; y < pg.height; y += 1) {
                    var xpos = p5.map(x, 0, pg.width, 0, p5.TWO_PI)
                    var ypos = p5.map(y, 0, pg.height, 0, p5.TWO_PI)
                    var n = p5.noise((p5.cos(xpos) + 1) * 0.5 + noiseX, (p5.sin(ypos) + 1) * 0.5 + noiseY, p5.frameCount * 0.0004);
                    if (p5.int(n * 100) % 11 == 0) { // change 100 to higher values !
                        pg.stroke(0, 0, 0)
                        pg.point(x, y);
                    }
                }
            }

            for (var i = 0; i <= width; i += siz) {
                for (var j = 0; j <= height; j += siz) {
                    p5.push()
                    p5.imageMode(p5.CORNER)
                    p5.translate(i, j)
                    p5.image(pg, 0, 0)
                    p5.pop()
                }
            }
            //pg.background(0)
            pg.strokeWeight(2)


        };

        p5.mouseReleased = () => {
            seed = p5.random(50000)
            siz = p5.random(100, 300)
            noiseX = p5.random(10000);
            noiseY = p5.random(10000);
            pg = p5.createGraphics(siz, siz)
            pg.strokeCap(p5.ROUND)
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