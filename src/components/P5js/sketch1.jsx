const sketch = (width, height, props) => {
  return function (p5) {
    let value = props.value;
    p5.setup = () => {
      p5.strokeWeight(30);
    }

    p5.draw = () => {
      // p5.fill(255,255,200);
      // //p5.noStroke();
      // p5.stroke(0,255,200, 100);
      // var x = p5.int(p5.random(0, width));
      // var y = p5.int(p5.random(0, height));
      // p5.point(x, y);
      //p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    };

    p5.receiveProps = (nextProps) => {
      console.log(nextProps.value)
      value = nextProps.value;
    };

    p5.unmount = () => {
      console.log('The sketch was unmounted. Width was ' + width + ', height was ' + height);
    }
  }
};

export default sketch;