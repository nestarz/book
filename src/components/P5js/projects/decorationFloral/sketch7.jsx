import DataFrame from "dataframe-js";
import csv from "./NutritionalFacts_Fruit_Vegetables_Seafood.csv";
console.log(csv);
//const df = new DataFrame(csv);
// const filteredDf = df
//     .filter(row => row.get("survived") === "yes")
//     .select("class", "age", "sex");
//df.show(3);

const sketch = (width, height, props) => {
    var color = "red";
    var foodIndex = props.index;
    return function (p5) {        
        p5.setup = () => {
            p5.strokeWeight(10);
            p5.stroke(color);
            p5.smooth();
            p5.noStroke();
            //p5.filter(p5.BLUR,10);
            p5.frameRate(25);

            p5.noLoop();
        }

        p5.draw = () => {
            p5.clear();
            p5.fill(color);
            p5.beginShape();
            let product = csv[foodIndex];
            let getField = field => product[field];
            let calcium = product["Calcium"] * 10;
            let calories = product["Calories"] * 10;
            p5.ellipse(width/2, height/2, calcium, calcium);
            p5.fill("black");
            p5.ellipse(width/2, height, calories, calories);
            p5.endShape();
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