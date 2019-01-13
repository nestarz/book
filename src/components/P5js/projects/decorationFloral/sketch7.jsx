const sketch = (width, height, props) => {
    var color = props.color ? props.color : "black";
    var product = props.product;
    var rawName = product["Food and Serving"].substr(0, product["Food and Serving"].indexOf(','));
    var sugar = product['Sugars'] * 10;
    var vitaminA = product['Vitamin A'] / 10000;
    var vitaminC = product['Vitamin C'] / 10000;

    class Point {
        constructor(xOrPoint, y) {
            if (xOrPoint.x !== undefined && xOrPoint.y !== undefined) {
                this.x = xOrPoint.x;
                this.y = xOrPoint.y;
            } else {
                this.x = xOrPoint;
                this.y = y;
            }
        }
    }

    const CANVAS_BOUNDS = new Point(width, height);

    class DrawingState {
        constructor(position, direction) {
            this.state = Object.create(null);
            this.state.position = position && new Point(position.x, position.y) || new Point(0, 0);
            this.state.direction = direction || 0; // right
            this.stack = [];
        }

        push() {
            this.stack.push(JSON.stringify(this.state));
        }

        pop() {
            this.state = JSON.parse(this.stack.pop() || '{}');
        }

        get depth() {
            return this.stack.length;
        }
    }

    function applyRule(rules, char) {
        return rules[char] || char;
    }

    function *fragmentGenerator(system, string) {
        for (const char of string) {
          yield applyRule(system.rules, char);
        }
      }
      
function renderAGeneration (system, previousGeneration) {
  let nextGeneration = '';
  for (const character of previousGeneration) {
    const nextCharacters = applyRule(system.rules, character);
    nextGeneration += nextCharacters;
  }
  return nextGeneration;
}
    return function (p5) {
        var numIters = 7;

        function drawForward(drawingState, params) {
            if (!drawingState.state.strokeWeight) drawingState.state.strokeWeight = 0
            let { x, y } = drawingState.state.position;
            let d = drawingState.state.direction + Math.random() * sugar - sugar/2;
            let newX = x + params.length * p5.cos(d);
            let newY = y + params.length * p5.sin(d);
            p5.push();
            p5.strokeWeight(drawingState.state.strokeWeight + Math.random() - 0.5/50 || 1);
            p5.line(x, y, newX, newY);
            if (Math.random() < vitaminA) {
                p5.strokeWeight(drawingState.state.strokeWeight + Math.random() - 0.5/50 || 1);
                p5.stroke("red");
            }
            else if (Math.random() < vitaminC) {
                p5.strokeWeight(drawingState.state.strokeWeight + Math.random() - 0.5/50 || 1);
                p5.stroke("blue");

            }
            p5.pop();
            drawingState.state.position.x = newX;
            drawingState.state.position.y = newY;
            drawingState.state.strokeWeight+=0.01;
            drawingState.state.strokeWeight = p5.min(drawingState.state.strokeWeight, 10);
        };

        const tree = {
            params: {
                angle: p5.min(product["Calories"], 100),
                length: p5.max(product["Calcium"]+1, 1),
            },
            axiom: 'X',
            rules: {
                X: 'F[-X][X]F[-X]+FX',
                F: 'FF',
            },
            commands: {
                'F': drawForward,
                '-'(drawingState, params) {
                    drawingState.state.direction -= params.angle;
                },
                '+'(drawingState, params) {
                    drawingState.state.direction += params.angle;
                },
                '['(drawingState, params) {
                    drawingState.push();
                },
                ']'(drawingState, params) {
                    drawingState.pop();
                },
            }
        }

        function drawSystem(system, fragmentIterator, drawingState) {
            const drawFrame = () => {
              const iter = fragmentIterator.next();
              if (iter.done) {
                return;
              }
              const fragment = iter.value;
              for (const character of fragment) {
                const drawingFunction = system.commands[character];
                if (drawingFunction) {
                  drawingFunction(drawingState, system.params);
                }
              }
              requestAnimationFrame(drawFrame);
            };
            requestAnimationFrame(drawFrame);
          }

          
        var system = tree;
        var i = 1;

        const origin = new Point(width / 2, height);
        let systemState = system.axiom;
        ////console.log(systemState);
        p5.preload = () => {
        }

        p5.setup = () => {
            p5.stroke(color);
            p5.angleMode(p5.DEGREES);
        }

        p5.draw = () => {
            if (i >= 6) return -1;
            p5.clear();
            const drawingState = new DrawingState(origin, -90);
            const shouldDraw = i === numIters - 1;
            systemState = renderAGeneration(system, systemState, drawingState);
            const fragmentIterator = fragmentGenerator(system, systemState);
            drawSystem(system, fragmentIterator, drawingState);
            //console.log(i);
            i++;
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