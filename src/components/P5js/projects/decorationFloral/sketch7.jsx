const sketch = (width, height, props) => {
    var Physics = require("../../physics/src/Physics");

    return function (p5) {
        var color = "#000";
        var w = width, h = height;
        var vertices_amount = 400

        var px_offset_x = w / 2;    // amplitude
        var px_offset_y = h / 2;    // amplitude

        var mass = 100;
        var radius_x = width / 3;
        var radius_y = height / 3;
        var strength = 0.0625;
        var drag = 0;

        var physics = new Physics();
        var points = [];

        var organicConstant = 30;
        
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
        var t = 0;
        
        p5.setup = () => {
            p5.strokeWeight(10);
            p5.stroke(color);
            p5.smooth();
            p5.noStroke();
            //p5.filter(p5.BLUR,10);
            p5.frameRate(25);

            physics.play()
            p5.noLoop();
        }

        p5.draw = () => {
            t += 0.01;
            p5.clear();
            //p5.colorMode(p5.HSB);
            physics.update();
            p5.ellipse(particle.position.x, particle.position.y, 5);
            p5.curveTightness(organicConstant);
            p5.fill(color);
            var colord = p5.color(255, 0, 0);
            //p5.fill(p5.color(100 + p5.noise(t) * 100, 250, 10));
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