let cropObject = [];
var link;
var brightnessCounter = 1;
var contrastCounter = 1;
var hueCounter = 0;
var grayscaleCounter = 0;
var sepiaCounter = 0;
var saturateCounter = 1;
var blurCounter = 0;
var invertCounter = 0;
var opacityCounter = 100;
var defaultStyle = [ { property: "brightness", value: brightnessCounter, unit: "" }, { property: "contrast", value: contrastCounter, unit: "" }, { property: "saturate", value: saturateCounter, unit: "" }, { property: "grayscale", value: grayscaleCounter, unit: "" }, { property: "sepia", value: sepiaCounter, unit: "" }, { property: "hue-rotate", value: hueCounter, unit: "deg" }, { property: "blur", value: blurCounter, unit: "px" } , { property : "invert" , value : invertCounter , unit : "%"} , { property : "opacity" , value : opacityCounter , unit : "%"}];
var styles = [ { property: "brightness", value: brightnessCounter, unit: "" }, { property: "contrast", value: contrastCounter, unit: "" }, { property: "saturate", value: saturateCounter, unit: "" }, { property: "grayscale", value: grayscaleCounter, unit: "" }, { property: "sepia", value: sepiaCounter, unit: "" }, { property: "hue-rotate", value: hueCounter, unit: "deg" }, { property: "blur", value: blurCounter, unit: "px" } , { property : "invert" , value : invertCounter , unit : "%"} , { property : "opacity" , value : opacityCounter , unit : "%"}];
const canvas = document.getElementById('mycanvas');
const context = canvas.getContext( '2d', { willReadFrequently: true } );


var loadFile = function ( event ) {
    context.clearRect( 0, 0, 800, 400 )
    var image = new Image();
    image.src = URL.createObjectURL( event.target.files[ 0 ] );
    link = image.src
    console.log(link)
    
    image.onload = function () {
        context.drawImage( image, 0, 0, 800, 500 );
        document.getElementById("controls").style.display = "flex"
    }
}

function showColor( event ) {
    let x = event.offsetX;
        let y = event.offsetY;
        const imgData = context.getImageData( x, y, 1, 1 );
        let red = imgData.data[0];
        let green = imgData.data[1];
        let blue = imgData.data[2];
        let alpha = imgData.data[ 3 ];
        document.getElementById("imageData").innerHTML =   `Red : ${red} <br> Green : ${green} <br> Blue : ${blue} <br> Transparency : ${alpha}`
}


function showCoords( event ) {
        let x = event.offsetX;
    let y = event.offsetY;
    if ( cropObject.length < 2 ) {
        cropObject.push( { xPoint: x, yPoint: y } )
    }
    if ( cropObject.length == 2 ) {
        var updatedImage = new Image();
        updatedImage.src = link
        let cropStartX = cropObject[ 0 ].xPoint;
        let cropStartY = cropObject[ 0 ].yPoint;
        let cropEndX = cropObject[ 1 ].xPoint;
        let cropEndY = cropObject[ 1 ].yPoint;
        console.log( cropStartX, cropStartY, cropEndX - cropStartX, cropEndY - cropStartY )
    
        updatedImage.onload = function () {
            const cropData = context.getImageData( cropStartX, cropStartY, cropEndX - cropStartX, cropEndY - cropStartY );
            context.clearRect( 0, 0, 800, 400 )
            context.putImageData( cropData, 0, 0 );
        }
        cropObject = [];
        }
}

function updateValue( data , amount )
{
    for ( let i = 0; i < styles.length ; i++)
    {
        if ( styles[ i ].property == data )
            styles[ i ].value = amount;
    }
}

function activeReset() { 
    document.getElementById( "brightness" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "contrast" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "sepia" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "saturate" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "sepia" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "blur" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "grayscale" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "hue-rotate" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "invert" ).style.backgroundColor = "rgb(32, 178, 170)";
    document.getElementById( "opacity" ).style.backgroundColor = "rgb(32, 178, 170)";
}

function buttonReset() {
    document.getElementById( "upDownBrightness" ).style.display = "none";
    document.getElementById( "upDownContrast" ).style.display = "none";
    document.getElementById( "upDownSepia" ).style.display = "none";
    document.getElementById( "upDownHue" ).style.display = "none";
    document.getElementById( "upDownBlur" ).style.display = "none";
    document.getElementById( "upDownSaturate" ).style.display = "none";
    document.getElementById( "upDownGrayscale" ).style.display = "none";
    document.getElementById( "upDownOpacity" ).style.display = "none";
    document.getElementById( "upDownInvert" ).style.display = "none";
}

const handleBrightness = ( event ) => {
    activeReset();
    document.getElementById("brightness").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownBrightness" );
    buttonReset()
    document.getElementById("upDownBrightness").style.display = "flex";
    elementInc.addEventListener( "click", function () {
        brightnessCounter += 0.1;
        let styleFilter = ""
        updateValue( event.target.value , brightnessCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit + ") "
        })
        canvas.style.filter = styleFilter;
        // brightness.value = brightnessCounter;
        console.log( canvas.style.filter )
    } );
    const elementDec = document.getElementById("dec_upDownBrightness");
    elementDec.addEventListener( "click", function () {
        brightnessCounter -= 0.1;
        let styleFilter = ""
        updateValue( event.target.value, brightnessCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        //brightness.value = brightnessCounter;
        console.log( canvas.style.filter )
    });
}
const handleContrast = ( event ) => {
    activeReset();
    document.getElementById("contrast").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownContrast" );
    buttonReset()
    document.getElementById("upDownContrast" ).style.display = "flex";
    elementInc.addEventListener( "click", function () {
        contrastCounter += 0.1;
        let styleFilter = ""
        updateValue( event.target.value, contrastCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    } );
    const elementDec = document.getElementById("dec_upDownContrast");
    elementDec.addEventListener( "click", function () {
        contrastCounter -= 0.1;
        let styleFilter = ""
        updateValue(event.target.value, contrastCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    });
}
const handleHue = ( event ) => {
    activeReset();
    document.getElementById("hue-rotate").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownHue" );
    buttonReset()
    document.getElementById( "upDownHue" ).style.display = "flex";
    elementInc.addEventListener( "click", function () {
        hueCounter += 5;
        let styleFilter = ""
        updateValue( "hue-rotate", hueCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    } );
    const elementDec = document.getElementById("dec_upDownHue");
    elementDec.addEventListener( "click", function () {
        hueCounter -= 5;
        let styleFilter = ""
        updateValue( "hue-rotate", hueCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    });
}
const handleGrayscale = ( event ) => {
    activeReset();
    document.getElementById("grayscale").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownGrayscale" );
    buttonReset()
    document.getElementById("upDownGrayscale").style.display = "flex";
    elementInc.addEventListener( "click", function () {
        grayscaleCounter += 0.1;
        let styleFilter = ""
        updateValue( "grayscale", grayscaleCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    } );
    const elementDec = document.getElementById("dec_upDownGrayscale");
    elementDec.addEventListener( "click", function () {
        grayscaleCounter -= 0.1;
        let styleFilter = ""
        updateValue( "grayscale", grayscaleCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    });
}
const handleBlur = ( event ) => {
    activeReset();
    document.getElementById("blur").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownBlur" );
    buttonReset()
    document.getElementById( "upDownBlur" ).style.display = "flex";
    elementInc.addEventListener( "click", function () {
        blurCounter += 0.5;
        let styleFilter = ""
        updateValue( "blur", blurCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    } );
    const elementDec = document.getElementById("dec_upDownBlur");
    elementDec.addEventListener( "click", function () {
        blurCounter -= 0.5;
        let styleFilter = ""
        updateValue( "blur", blurCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    });
}
const handleSaturate = ( event ) => {
    activeReset();
    document.getElementById("saturate").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownSaturate" );
    buttonReset()
    document.getElementById("upDownSaturate" ).style.display = "flex";
    elementInc.addEventListener("click", function() {
        saturateCounter += 0.1;
        let styleFilter = ""
        updateValue( "saturate", saturateCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    } );
    const elementDec = document.getElementById("dec_upDownSaturate");
    elementDec.addEventListener( "click", function () {
        saturateCounter -= 0.1;
        let styleFilter = ""
        updateValue( "saturate", saturateCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    });
}
const handleSepia = ( event ) => {
    activeReset();
    document.getElementById("sepia").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownSepia" );
    buttonReset()
    document.getElementById( "upDownSepia" ).style.display = "flex";
    elementInc.addEventListener("click", function() {
        sepiaCounter += 0.1;
        let styleFilter = ""
        updateValue( "sepia", sepiaCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    } );
    const elementDec = document.getElementById("dec_upDownSepia");
    elementDec.addEventListener("click", function() {
        sepiaCounter -= 0.1;
        let styleFilter = ""
        updateValue( "sepia", sepiaCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    });    
}
const handleInvert = ( event ) => {
    activeReset();
    document.getElementById("invert").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownInvert" );
    buttonReset()
    document.getElementById( "upDownInvert" ).style.display = "flex";
    elementInc.addEventListener("click", function() {
        invertCounter += 5;
        let styleFilter = ""
        updateValue( "invert", invertCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    } );
    const elementDec = document.getElementById("dec_upDownInvert");
    elementDec.addEventListener("click", function() {
        invertCounter -= 5;
        let styleFilter = ""
        updateValue( "invert", invertCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    });   
}
const handleOpacity = ( event ) => {
    activeReset();
    document.getElementById("opacity").style.backgroundColor = "aquamarine"
    let canvas = document.getElementById( "mycanvas" )
    const elementInc = document.getElementById( "inc_upDownOpacity" );
    buttonReset()
    document.getElementById( "upDownOpacity" ).style.display = "flex";
    elementInc.addEventListener("click", function() {
        opacityCounter += 5;
        let styleFilter = ""
        updateValue( "opacity", opacityCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    } );
    const elementDec = document.getElementById("dec_upDownOpacity");
    elementDec.addEventListener("click", function() {
        opacityCounter -= 5;
        let styleFilter = ""
        updateValue( "opacity", opacityCounter );
        styles.forEach( data => {
            styleFilter += data.property + "(" + data.value + data.unit  + ") "
        })
        canvas.style.filter = styleFilter;
        console.log(canvas.style.filter)
    });   
}
const reset = () => {
    context.clearRect( 0, 0, 800, 400 );
    brightnessCounter = 1;
    contrastCounter = 1;
    hueCounter = 0;
    grayscaleCounter = 0;
    sepiaCounter = 0;
    saturateCounter = 1;
    blurCounter = 0;
    opacityCounter = 0;
    invertCounter = 0;
    resetImage = new Image();
    resetImage.src = link;
    resetImage.onload = function () {
        context.drawImage( resetImage, 0, 0, 800, 500 );
    }
    let styleFilter = ""
    defaultStyle.forEach( data => {
        styleFilter += data.property + "(" + data.value + data.unit  + ") "
    } )
    styles = [ { property: "brightness", value: brightnessCounter, unit: "" }, { property: "contrast", value: contrastCounter, unit: "" }, { property: "saturate", value: saturateCounter, unit: "" }, { property: "grayscale", value: grayscaleCounter, unit: "" }, { property: "sepia", value: sepiaCounter, unit: "" }, { property: "hue-rotate", value: hueCounter, unit: "deg" }, { property: "blur", value: blurCounter, unit: "px" } , { property : "invert" , value : invertCounter , unit : "%"} , { property : "opacity" , value : opacityCounter , unit : "%"}];
    //console.log(defaultStyle)
    canvas.style.filter = styleFilter;
    console.log( canvas.style.filter )
    console.log(styles)
}