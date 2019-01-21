const sketch = (width, height, props) => {
    var genome1 = [
        50, 88, 50, // center
        17, 50, 152, 10, //1st row
        11, 50, 300, 20 //2nd row
    ]
    var siz = 150
    var seed

    // enum type like way to adress arrays indexes
    // this is usefull to deal with names instead of numbers and make the code below more readable
    var centerSize = 0;
    var centerFillHue = 1;
    var centerOpacity = 2;

    var firstNumber = 3;
    var firstSize = 4;
    var firstFillHue = 5;
    var firstOpacity = 6;

    var secondNumber = 7;
    var secondSize = 8;
    var secondFillHue = 9;
    var secondOpacity = 10;


    return function (p5) {
        // a function to return a scaled value for each type of gene
        function randomGene(index) {
            var result = 0;
            if (index == centerSize || index == firstSize || index == secondSize) {
                result = p5.noise(index) + p5.random(15, 50); // it's a size param
            } else if (index == centerFillHue || index == firstFillHue || index == secondFillHue) {
                result = p5.random(10, 360); // it's a hue param
            } else if (index == centerOpacity || index == firstOpacity || index == secondOpacity) {
                result = p5.random(5, 80); // it's an opacity param
            } else if (index == firstNumber || index == secondNumber) {
                result = p5.int(p5.random(5, 25)); // it's a quantity param
            }
            return result;
        }

        // a function to return a new random genome
        function randomFlower() {
            var result = [11];
            for (var i = 0; i < 11; i++) {
                result[i] = randomGene(i);
            }
            return result;
        }

        // draw a flower with a given genome
        function drawFlower(xpos, ypos, genome) {

            p5.push()
            p5.translate(xpos, ypos);

            // first draw the second row (in the back)
            for (var i = 0; i < p5.int(genome[secondNumber]); i++) {
                p5.fill(genome[secondFillHue], 80, 100, genome[secondOpacity]);
                p5.noStroke();

                var x = p5.cos(i * (p5.TWO_PI) / genome[secondNumber]) * genome[centerSize];
                var y = p5.sin(i * (p5.TWO_PI) / genome[secondNumber]) * genome[centerSize];
                var rad = genome[secondSize];
                p5.ellipse(x, y, rad, rad);
            }
            // then the second one
            for (var i = 0; i < p5.int(genome[firstNumber]); i++) {
                p5.fill(genome[firstFillHue], 80, 100, genome[firstOpacity]);

                var x = p5.cos(i * (p5.TWO_PI) / genome[firstNumber]) * genome[centerSize] / 2;
                var y = p5.sin(i * (p5.TWO_PI) / genome[firstNumber]) * genome[centerSize] / 2;
                var rad = genome[firstSize];
                p5.ellipse(x, y, rad, rad);
            }
            // finally the center
            p5.fill(genome[centerFillHue], 80, 100, genome[centerOpacity]);
            p5.ellipse(0, 0, genome[centerSize], genome[centerSize]);

            p5.pop()
        }


        p5.setup = () => {
            p5.background(100);
            p5.colorMode(p5.HSB, 360, 100, 100, 100)
            seed = p5.random(9999)
        }

        p5.draw = () => {
            p5.randomSeed(seed)
            p5.background(0, 0, 100);
            for (var i = 0; i < (width - siz) / siz; i++) {
                for (var j = 0; j < (height - siz / 2) / siz; j++) {
                    drawFlower(i * siz + siz / 2, j * siz + siz / 2, randomFlower());

                }
            }
        };

        p5.mousePressed = () => {
            seed = p5.random(9999)
        }

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