var loadcount = 0;
var loadtotal = 0;
var preloaded = false;

function loadImages(imagefiles) {
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    var loadedimages = [];
    for (var i=0; i<imagefiles.length; i++) {
        var image = new Image();

        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                preloaded = true;
            }
        };

        image.src = imagefiles[i];
        loadedimages[i] = image;
    }

    return loadedimages;
}

function draw() {
    var canvas = document.getElementById('myCanvas');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var circle = {'x': 10, 'y': 10, 'xVel': 5, 'yVel': 5, 'diameter': 50};
	var football = {'x': 10, 'y': 10, 'xVel': 5, 'yVel': 5, 'diameter': 50};
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return setTimeout(callback, 1);
        };

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var images = loadImages(["redBall.png", "wood.jpg", "football.jpg"]);
        var woodPattern;
        animate();
    } else {
        console.log("Canvas-unsupported code here");
    }

    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        woodPattern = ctx.createPattern(images[1], "repeat");
        ctx.fillStyle = woodPattern;
        ctx.fillRect(0, 0, 5000, 5000);
        
        
        ctx.drawImage(images[2], football.x, football.y, football.diameter, football.diameter);
        football.x += football.xVel;
        

        if (football.x > canvasWidth - football.diameter|| football.x < 0) {
            football.xVel *= -1
        }

        requestAnimationFrame(animate);

       
    }
}
