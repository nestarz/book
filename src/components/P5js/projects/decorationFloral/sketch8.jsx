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

    return function (p5) {
        p5.preload = () => {
            var url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?count=1&q="+encodeURIComponent(rawName)+"&autoCorrect=true";
            p5.httpDo(
                url,
                {
                    method: 'GET',
                    // Other Request options, like special headers for apis
                    headers: { "X-RapidAPI-Key": '132f5adbf7msheca359e3b42336fp1f700bjsn15e6510181b3' }
                },
                function (res) {
                    let json = JSON.parse(res);
                    //console.log(json, json.value);
                    if (json.value.length == 0) return //console.log('No hits');
                    //res.value.map((hit, i) => { //console.log(hit.url); });
                    URL = json.value[0].thumbnail ? json.value[0].thumbnail : json.value[0].url;
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
            if (!img) {
                return;
            }
            p5.clear();
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