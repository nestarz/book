const sketch = (width, height, props, theme) => {
  return function (p5) {
    var xoff = 0;
    var yoff = 0;

    p5.setup = () => {
      p5.strokeWeight(0);
      p5.frameRate(24);
    }

    p5.draw = () => {
        // put drawing code here
        p5.clear();

        for (var i=0; i<50; i++){
            var x = p5.map(p5.noise(xoff+(i/50)), 0, 1, 0, width);
            var y = p5.map(p5.noise(yoff+(i/50)), 0, 1, 0, height);
            p5.ellipse(x+i/2, y+i/2, 4*i, 4*i+30)
            p5.fill(255-(i/50)*100);
        }

        p5.fill(255);
        p5.stroke(0, 20)
    //    noStroke();

        xoff += 0.01;
        yoff -= 0.01;
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
