const sketch = (width, height, props) => {
    return function (p5) {
        //let value = props.value;
        let t = 0;
        var w = width, h = height;

        var r = (w < h) ? w / 10 : h / 10; // radius is a third of the smaller screen dimension
        var x_off = 0, y_off = 0, z_off = 1000;
        var vertices_amount = 15

        var px_offset_x = w/2;    // amplitude
        var px_offset_y = h/1.1;    // amplitude
        var NOISE_SCALE = 60;  // the higher the softer

        var Z_SPEED = .0001; // noise change per frame

        var X_SPEED = .001;
        var Y_SPEED = .001;


        var MOUSE_FORCE = 0.05;
        // positive 'push', negative 'pull'

        var prevTime;
        var color_x = 255,
            color_speed = -.25

        p5.setup = () => {
            p5.strokeWeight(20);
            p5.stroke("black");
            p5.smooth();
            //p5.noStroke();
            //p5.filter(p5.BLUR,10);
            p5.frameRate(50);
        }

        p5.draw = () => {
            p5.background(255)
            p5.colorMode(p5.HSB);
            // change noise direction with mouse
            if (p5.mouseX  || p5.mouseY) {
              var mouseVector = p5.createVector(p5.mouseX/w-.5, p5.mouseY/h-.5);
              mouseVector.mult(MOUSE_FORCE);
              X_SPEED = mouseVector.x;
              Y_SPEED = mouseVector.y;
            }
            
            // draw shape:
            p5.push();
            p5.translate(0, h/2);
            
            p5.background(255);   // bg color
            p5.stroke("#3CD670");
            p5.noFill();    // color
            p5.beginShape();
            for (var a=0; a<p5.TWO_PI;a+=p5.TWO_PI/vertices_amount) {
              var x = r*p5.sin(a);
              var y = r*p5.cos(a);
              
              var new_x = x + (
                p5.noise(
                  ((x_off+x)/NOISE_SCALE),
                  ((y_off+y)/NOISE_SCALE),
                         z_off) * px_offset_x * p5.sin(a));
              
              var new_y = y + (
                p5.noise(
                  ((x_off+x)/NOISE_SCALE),
                  ((y_off+y)/NOISE_SCALE),
                         z_off) * px_offset_y * p5.cos(a))
                         p5.vertex(new_x,new_y);
            }
            p5.endShape();
            
            p5.pop();
            
            
            // update NOISE offsets
            z_off += Z_SPEED;
            x_off += X_SPEED;
            y_off += Y_SPEED;
            color_x += color_speed;
            if(color_x > 360) color_x -= 360;
            prevTime = Date.now();
        };

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