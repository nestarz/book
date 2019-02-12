const sketch = (width, height, props) => {
  return function(p5) {
    //let value = props.value;
    let circles = [];
    p5.setup = () => {
      p5.strokeWeight(100);
      // Create objects
      for (var i = 0; i < 10; i++) {
        //circles.push(new Circle());
      }
    };

    p5.draw = () => {
      for (var i = 0; i < circles.length; i++) {
        circles[i].move();
        circles[i].display();
      }
    };

    p5.receiveProps = nextProps => {
      //////console.log(nextProps.value)
      //value = nextProps.value;
    };

    p5.unmount = () => {
      ////console.log('The sketch was unmounted. Width was ' + width + ', height was ' + height);
    };

    // Circle class
    function Circle() {
      this.x = p5.random(width);
      this.y = p5.random(height);
      this.diameter = p5.random(10, 30);
      this.speed = 200;

      this.move = function() {
        this.x += p5.random(-this.speed, this.speed);
        this.y += p5.random(-this.speed, this.speed);
      };

      this.display = function() {
        p5.fill(0, 0, 255);
        p5.ellipse(this.x, this.y, this.diameter, this.diameter);
      };
    }
  };
};

export default sketch;
