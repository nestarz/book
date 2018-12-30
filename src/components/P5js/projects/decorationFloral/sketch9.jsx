import DataFrame from "dataframe-js";

function loadImgErrFix(errEvt) {
    const pic = errEvt.target;

    if (!pic.crossOrigin) return //console.log(`Failed to reload ${pic.src}!`);

    //console.log(`Attempting to reload ${pic.src} as a tainted image now...`);
    pic.crossOrigin = null, pic.src = pic.src;
}

const sketch = (width, height, props) => {
    var color = "red";
    var product = props.product;
    var rawName = product["Food and Serving"].substr(0, product["Food and Serving"].indexOf(',')); 
    var URL, img;
    var firstTime = true;

    return function (p5) {
        p5.preload = () => {
            var url = "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=vegetable+"+encodeURIComponent(rawName)+"&count=1&imageType=Photo";
            p5.httpDo(
                url,
                {
                    method: 'GET',
                    // Other Request options, like special headers for apis
                    headers: { "Ocp-Apim-Subscription-Key": '413bafb604ae4557a6c6b19c3546dcd0' }
                },
                function (res) {
                    let json = JSON.parse(res);
                    //console.log(json, json.value);
                    if (json.value.length == 0) return //console.log('No hits');
                    //res.value.map((hit, i) => { //console.log(hit.url); });
                    URL = json.value[0].thumbnailUrl ? json.value[0].thumbnailUrl : json.value[0].contentUrl;
                    URL = URL.replace(/(^\w+:|^)\/\//, '');
                    URL = "https://images.weserv.nl/?url=" + URL;
                    img = p5.loadImage(URL, pic => null, loadImgErrFix);
                }
            );
        }

        p5.setup = () => {
        }

        p5.draw = () => {
            // wait until the data is loaded
            if (!img || !img.get(0, 0)) {
                return;
            }
            img.loadPixels();
            p5.clear();
            //img.filter("posterize", product["Calcium"]);
            for (var y = 0; y < img.height; y++) { 
                for (var x = 0; x < img.width; x++) { 
                    // loop over
                    var index = (x + (y * width)) * 4; 
                    img.pixels[index+0] = img.pixels[index+0] / 20; 
                    img.pixels[index+1] = img.pixels[index+1] / 20; 
                    img.pixels[index+2] = img.pixels[index+2] / 20; 
                } 
            } 
            img.updatePixels();
            p5.background(img);
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