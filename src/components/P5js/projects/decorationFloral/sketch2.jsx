const sketch = (width, height, props) => {
    return function (p5) {
      var branches = [];//holds a list of p5.Vectors
      var trunkSize = 10.4;
      var currentBranchLocL = null;
      var currentBranchLocR = null;
      var t = 0;
      var k = 0;

      function branchRecursive(x, y, angle, numBranches){
        //we want to stop recursing if our iterator is below 0
        if (numBranches <= 0) return;
        k += 1;

        //try replacing random with noise
        //not comfortable with sin and cos yet? No problem! Try using rotate()
        //instead.
        var x2 = x + (p5.cos(p5.radians(angle)) * numBranches * 10.0) + p5.noise(k)*20-10;
        var y2 = y + (p5.sin(p5.radians(angle)) * numBranches * 10.0) + p5.noise(k)*20-10;
        p5.line(x, y, x2, y2);
        p5.stroke(250,250, p5.noise(k)*255);
        //p5.ellipse(x,y, p5.exp(p5.noise(numBranches)*8), p5.noise(numBranches)*10)
        
        //we recurse on both side so that we have an even number of
        //branches.  What if we didn't have a symmetrical tree?
        branchRecursive(x2, y2, angle - 20, numBranches - 1);
        branchRecursive(x2, y2, angle + 20, numBranches - 1);
      }

      /**
       * This function does not produce the same result as the recursive example
       * It's meant to demonstrate another way one can draw generative tree-like shapes
       * Note: there is no 1 correct answer to this problem.
       */
      function superSimpleTreeDraw(x,y,angle, numBranches){
        var xL2, yL2;
        var xR2, yR2;
        var branchSize = 0.5;
        
        //we create an angleL and angleR so our tree can start
        //its growth vertically
        var angleL = angle;
        var angleR = angle;
        
        for(var i=0; i < numBranches; i++){
          if(i === 0){
            currentBranchLocL = p5.createVector(x,y);
            currentBranchLocR = p5.createVector(x,y);
            
            xL2 = currentBranchLocL.x;
            yL2 = currentBranchLocL.y;
            
            xR2 = currentBranchLocR.x;
            yR2 = currentBranchLocR.y;
          }
          else {
            //all branches other than the trunk lean in a direction
            angleL = angleL - Math.random() * 20;
            angleR = angleR + Math.random() * 20;
            
            // algorithm explanation:
            // take our branch location, and rotate by a given angle + a little random sway from-10 to 10
            xL2 = currentBranchLocL.x + (p5.cos(p5.radians(angleL)) * numBranches * branchSize * 20.0) + p5.random(-10,10);
            yL2 = currentBranchLocL.y + (p5.sin(p5.radians(angleL)) * numBranches * branchSize * 20.0) + p5.random(-10,10);
            xR2 = currentBranchLocR.x + (p5.cos(p5.radians(angleR)) * numBranches * branchSize *20.0) + p5.random(-10,10); 
            yR2 = currentBranchLocR.y + (p5.sin(p5.radians(angleR)) * numBranches * branchSize * 20.0) + p5.random(-10,10);
          }
          //draw our left branch
          p5.line(currentBranchLocL.x, currentBranchLocL.y, xL2, yL2);
          //draw our right branch
          p5.line(currentBranchLocR.x, currentBranchLocR.y, xR2, yR2);
          branchSize *= 0.66; //make each subsequent branch 2/3rds of the previous 
          currentBranchLocL = p5.createVector(xL2, yL2);
          currentBranchLocR = p5.createVector(xR2, yR2);
        }
      }

      /**
       * What if you chose a random branch left or right?
       * based on the random boolean example in class.
       * See week04 example as reference.
       * this function returns either our right side or left side coords
       * as a vector.  It should be randomly choosing which side;
       */
      function randomLeftOrRight(x1,y1, x2, y2){
        var bTruth = Math.round(p5.random(1));
        if(bTruth == 1){
          var vecLeft = p5.createVector(x1,y1);
          return vecLeft;
        } else {
          var vecRight = p5.createVector(x2,y2);
          return vecRight;
        }
      }

      p5.setup = () => {
        p5.strokeWeight(1);
        p5.stroke("black");
        p5.smooth();
        //p5.noStroke();
        //p5.filter(p5.BLUR,10);
        p5.frameRate(10);
        p5.noLoop();
      }

      p5.draw = () => {
        for (let i = 0; i < 500; i++) {
          p5.colorMode(p5.HSB)
          t += 0.01;
          p5.strokeWeight(p5.noise(t) * 100);
          var posY = p5.random() * height;
          if (i == 250) {
            branchRecursive(width / 2, height, -90, 12);
          }
          if (p5.random() > 0.98) {
            p5.stroke(255);
          }
          else {
            p5.stroke(100, posY/height * 255, posY/height * 30);
          }
          //superSimpleTreeDraw(p5.mouseX, p5.mouseY, -90, 10);
          superSimpleTreeDraw(p5.random() * width, height * 1, -90, 10);
          //branchRecursive(p5.random() * width, height, -90, 6 + p5.int(Math.random() * 4));
          if (p5.random() > 0.9) {
            superSimpleTreeDraw(p5.random() * width, height * 1, -90, 10 + Math.random() * 10);
          }
                    
        }
      };

      p5.mouseClicked = () => {
        // branchRecursive(mouseX, mouseY, -90, 10);
        //superSimpleTreeDraw(p5.mouseX, p5.mouseY, -90, 10);
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