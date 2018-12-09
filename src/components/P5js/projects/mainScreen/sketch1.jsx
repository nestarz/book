import Physics from "physics";

const sketch = (width, height, props) => {
    return function (p5) {
        var color = "#3CD670";
        var w = width, h = height;
        var vertices_amount = 9

        var px_offset_x = w * 0.9;    // amplitude
        var px_offset_y = h / 2.2;    // amplitude

        var mass = 10000;
        var radius_x = width / 3;
        var radius_y = height / 2;
        var strength = 0.0625;
        var drag = 10.0;

        var physics = new Physics();
        var points = [];

        var organicConstant = 0.01;
        
        for (var i = 0; i < vertices_amount; i++) {

            var pct = i / vertices_amount;
            var theta = pct * Math.PI * 2;

            var ax = radius_x * Math.cos(theta);
            var ay = radius_y * Math.sin(theta);

            var variance = Math.random() * 0.5 + 0.5;
            var bx = variance * ax;
            var by = variance * ay;

            var origin = physics.makeParticle(mass, ax, ay)
            var particle = physics.makeParticle(Math.random() * mass * 0.66 + mass * 0.33, bx, by);
            var spring = physics.makeSpring(particle, origin, strength, drag, 0);

            origin.makeFixed();

            points.push(particle);
        }
        
        p5.setup = () => {
            p5.strokeWeight(1);
            p5.stroke("black");
            p5.smooth();
            p5.noStroke();
            //p5.filter(p5.BLUR,10);
            p5.frameRate(60);

            physics.play()
        }

        p5.draw = () => {
            p5.clear();
            p5.colorMode(p5.HSB);
            physics.update();
            p5.ellipse(particle.position.x, particle.position.y, 5);
            p5.curveTightness(organicConstant);
            p5.fill(color);
            p5.beginShape();
            for (let i = 0; i < points.length; i++) {
                const particle = points[i].position;
                p5.curveVertex(
                    particle.x + px_offset_x, 
                    particle.y + px_offset_y
                );
            }
            for (let i = 0; i < 3; i++) {
                const particle = points[i].position;
                p5.curveVertex(
                    particle.x + px_offset_x, 
                    particle.y + px_offset_y
                );
            }
            p5.endShape();
        };
        p5.receiveProps = (nextProps) => {
            //console.log(nextProps.value)
            //value = nextProps.value;
        };

        p5.unmount = () => {
            console.log('The sketch was unmounted. Width was ' + width + ', height was ' + height);
        }
    }
};

export default sketch;