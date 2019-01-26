const sketch = (width, height, props) => {
    return function (p5) {
      let value = props.value;
      let t = 0;
      p5.setup = () => {
        p5.strokeWeight(10);
        p5.stroke("black");
        p5.smooth();
        //p5.noStroke();
        //p5.filter(p5.BLUR,10);
        p5.frameRate(23);
      }
  
      p5.draw = () => {
        t = t+0.1;
        p5.background("white");
        // set centre point
        let flowerWidth = 160;
        let flowerHeight = 160;
        let stepsWidth = p5.int(width / flowerWidth);
        let stepsHeight = p5.int(height / flowerHeight);
        let marginHeight = flowerHeight/2 + flowerHeight * ((height / flowerHeight) - stepsHeight) / 2;
        let marginWidth = flowerWidth/2 + flowerWidth * ((width / flowerWidth) - stepsWidth) / 2;
        p5.translate(marginWidth, marginHeight)
        for (let i = 0; i < stepsHeight; i++) {
          for (let j = 0; j < stepsWidth; j++) {
            p5.ellipse(j*flowerHeight, i * flowerWidth, flowerWidth, flowerHeight);
          }          
        }
      };

      p5.receiveProps = (nextProps) => {
        ////console.log(nextProps.value)
        value = nextProps.value;
      };
  
      p5.unmount = () => {
        ////console.log('The sketch was unmounted. Width was ' + width + ', height was ' + height);
      }
    }
  };
  
  export default sketch;