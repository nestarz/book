const sketch = (width, height, props) => {
    return function (p5) {
      let value = props.value;
      let t = 0;
      p5.setup = () => {
        p5.strokeWeight(0);
        p5.stroke("white");
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
        let marginHeight = flowerHeight/2; //+ flowerHeight * ((height / flowerHeight) - p5.int(height / flowerHeight)) / 2;
        let marginWidth = flowerWidth/2; //+ flowerWidth * ((width / flowerWidth) - p5.int(width / flowerWidth)) / 2;
        p5.translate(marginWidth, marginHeight);
        for (let i = 0; i < stepsHeight; i++) {
          for (let j = 0; j < stepsWidth; j++) {
            // draw 5 petals, rotating after each one
            p5.fill(0, 0, 0); // green
            for (let k = 0; k < 5; k++) {
              if (Math.random() < 1) {
                p5.rect(0 + p5.noise(t + i + j) * 20, -40, 100, 40);
              } else {
                p5.ellipse(0, -40, 50, 50);
              }
              p5.rotate(p5.radians(72));
            }
            // centre circle
            p5.fill("white"); // light yellow
            p5.ellipse(0, 0, 50, 50);
            p5.translate(flowerWidth, 0);
          }          
          p5.translate(-stepsWidth*flowerWidth, flowerHeight);
        }
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