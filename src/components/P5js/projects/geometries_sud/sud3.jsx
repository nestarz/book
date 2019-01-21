const sketch = (width, height, props) => {
    return function (p5) {
        var leaves, seed;
        var container_scale = 195;
        var unit_scale = 0.5;

        function PalmLeaf(x, y, rws, s, r, w) { // posx , posy, real-world-scale, unit_scale, ratio stem/leaf , leaf width
            this.xpos = x;
            this.ypos = y;
            this.real_world_scale = rws;
            this.scale = s;
            this.angle = -p5.PI;
            this.c = p5.color(0);
            this.ratio = r;
            this.wid = w;

            this.draw = function () {
                p5.push()
                p5.translate(this.xpos, this.ypos);
                p5.rotate(this.angle);
                p5.scale(this.scale)
                for (var i = -p5.PI / 4; i <= p5.PI / 4; i = i + p5.PI / 20) {
                    var length_offset = p5.map(p5.abs(i), p5.PI / 4, 0, 0, container_scale * 0.75);
                    var rand = p5.random(900);
                    p5.push()
                    //p5.fill(this.c)
                    p5.fill(p5.random(100), 80, 100, p5.random(100));
                    p5.stroke(p5.random(100), 80, 100, p5.random(100))
                    p5.strokeWeight(p5.random())
                    p5.rotate(i)
                    p5.beginShape()
                    p5.curveVertex(1, 0)
                    p5.curveVertex(1, container_scale * this.ratio)
                    p5.curveVertex(this.wid, container_scale + length_offset)
                    p5.curveVertex(p5.map(rand, 0, width, this.wid + this.wid / 2, -this.wid - this.wid / 2),
                    p5.map(rand, 0, height, container_scale - container_scale / 2 + length_offset, container_scale + container_scale / 2 + length_offset))
                    p5.curveVertex(-this.wid, container_scale + length_offset)
                    p5.curveVertex(-1, container_scale * this.ratio)
                    p5.curveVertex(-1, 0)
                    p5.endShape(p5.CLOSE)
                    p5.pop()
                }
                p5.pop()
            }
        }

        p5.setup = () => {
            p5.background(0);
            p5.noLoop();
            p5.colorMode(p5.HSB, 360, 100, 100, 100);
            seed = p5.random(9999)
            leaves = [];
            for (var i = container_scale / 2; i < width; i += container_scale) {
                for (var j = container_scale; j < height; j += container_scale) {
                    leaves.push(new PalmLeaf(i, j, container_scale, unit_scale, 0.85, 15));
                    leaves.push(new PalmLeaf(i, j, container_scale, unit_scale, 0.5, 5));


                }
            }
        }

        p5.draw = () => {
            p5.background(255)
            p5.randomSeed(seed)

            for (var i = 0; i < leaves.length; i++) {
                leaves[i].draw()
            }
        };

        p5.mousePressed = () => {
            seed = p5.random(9999)
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