function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

function newPos(image, parent) {    
    // Viewport Dimensions
    var vpHeight = parent.height();
    var vpWidth = parent.width();
    
    // Image Position
    var xPos = getRandomInt(0, vpWidth - image.width());
    var yPos = getRandomInt(0, vpHeight - image.height());
    
    image.css('left', xPos);
    image.css('top', yPos);
};


jQuery(document).ready(function ($) {
    var lipsum = new LoremIpsum();

    var blackout = $('#blackout');
    var imgPath = "img/blackout/";
    var imageNumber = 51;
    var plan;
    for (let i = 0; i < imageNumber; i++) {
        elt = '<div id="plan' + i + '" class="plan"></div>';
        blackout.append(elt);
        let plan = $('#plan' + i);

        elt = '<p id="text' + i + '"></p>';
        plan.append(elt);
        let text = $('#text' + i);  
        blah = lipsum.generate(getRandomInt(10, 40));
        text.html(blah)
        newPos(text, plan);

        let src = imgPath + "blackout" + "_" + (i) + ".jpg";
        let img = new Image();
        img.src = src;
        img.addEventListener("load", function () {
            plan.css('z-index', imageNumber-i);
            plan.css('filter', 'blur('+i+'px)');

            let opacity = (imageNumber-i)/imageNumber;
            opacity = EasingFunctions.easeInQuart(opacity);
            plan.css('opacity', opacity);
            plan.append(this);
            newPos($(this), plan);
        });

        plan.click(function(){
            $(this).hide();
            let siblings = $(this).nextAll();
            let siblingsLength = siblings.length;
            $.each(siblings, function(index, value) {
                let opacity = (siblingsLength-index)/siblingsLength;
                opacity = EasingFunctions.easeInQuart(opacity);
                $(value).css('filter', 'blur('+index+'px)');
                $(value).css('opacity', opacity);
            })
        });
    }
});