const sketch = (width, height, props) => {
    return function (p5) {
        let increment = 0.1
        let rows, columns
        let basePixels = 15
        let frameRateDisplay
        let timeOffset = 0.01

        p5.setup = () => {
            p5.background(255)
            rows = p5.floor(height / basePixels)
            columns = p5.floor(width / basePixels)
            p5.frameRate(10)
        }
    
        p5.draw = () => {
            let yOffset = 0
            for (let y = 0; y < rows; y++) {
                let xOffset = 0
                for (let x = 0; x < columns; x++) {
                let randomGrey = 300 - p5.noise(xOffset, yOffset, timeOffset) * 255
                xOffset += increment
                p5.noStroke()
                p5.fill(randomGrey)
                p5.rect(
                    x * basePixels,
                    y * basePixels,
                    basePixels,
                    basePixels
                )
                p5.rect(
                    x * basePixels  + p5.random(-4, 4),
                    y * basePixels  + p5.random(-4, 4),
                    basePixels,
                    basePixels
                )
                
                }
                timeOffset += increment * .005
                yOffset += increment
            }
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