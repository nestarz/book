const sketch = (width, height, props) => {
    return function (p5) {
      let value = props.value;
      var centerX,centerY;
      var lefterX,righterX;
      var upperY,lowerY;
      var t=0;
      
      p5.setup = () => {
        p5.noFill();
        centerX = width/2; 
        centerY = height/2;
        
        lefterX = width/6;
        righterX = width*5/6; 
        upperY = height/6;//height*5/6;
        lowerY = height*5/6;
        p5.frameRate(25);
      }
  
      p5.draw = () => {
        p5.background(255);
        t+=0.01;
        for (var y = 0; y <= height; y += 20) {
          if (p5.noise(t + y) > 0.5) {
            p5.stroke("white");
          }
          else {
            p5.stroke("black");
          }
          p5.bezier(lefterX, centerY, 
            centerX, y, 
            centerX, y, 
            righterX, centerY);
        }
        
        for (var x = lefterX; x <= righterX; x += 29) {
          if (p5.noise(t + x) > 0.5) {
            p5.stroke("white");
          }
          else {
            p5.stroke("green");
          }
          p5.bezier(centerX , upperY, 
            x, centerY, 
            x, centerY, 
            centerX, lowerY);
        }
        
      };

      p5.receiveProps = (nextProps) => {
        //console.log(nextProps.value)
        value = nextProps.value;
      };
  
      p5.unmount = () => {
        //console.log('The sketch was unmounted. Width was ' + width + ', height was ' + height);
      }
    }
  };
  
  export default sketch;