var gameSize = 100;//X*X
var probabilityOfStartingSqaure = 8;// 1/N
var backgroundColour = "#fff";
var sqaureFillColour =  "#999";//'rgb('+102+','+154+','+204+')';
//var squaresBorderColour = "ffffff";
var squaresBorderColourHue = 40;
var squaresBorderColourHueIncrement = 4;
var refreshRate = 2000; //milliS

//create the canvas element
var myCanvas = document.createElement("canvas");

//set the canvas width and height
myCanvas.width = 10*gameSize;
myCanvas.height = 10*gameSize;

var game = new Array(gameSize);
for (var i = 0; i < gameSize; i++) {
	game[i] = new Array(gameSize);
}
var gameTemp = new Array(gameSize);
for (var i = 0; i < gameSize; i++) {
	gameTemp[i] = new Array(gameSize);
}

function getElementInGame(x,y) {
	//need to wrap around
	//to avoid multi if statements, recall (101+100)%100=1 and (-1+100)%100=99
	return game[(x+gameSize)%gameSize][(y+gameSize)%gameSize];
}

function countNeighbours(cx, cy) {
	var count = 0;
	for (var x = cx-1; x <= cx+1; x++) {
		for (var y = cy-1; y <= cy+1; y++) {
			if (x == cx && y == cy)
				continue;
			if (getElementInGame(x,y))
				count++;
		}
	}
	return count;
}

function setUpGame() {
    //create squares
    for (i = 0; i < gameSize; i++) {
    	for (j = 0; j < gameSize; j++) {
    		var random0or1 = Math.floor(Math.random() * probabilityOfStartingSqaure);
    		game[i][j] = random0or1==0;
    	}
    }
	//dont draw initial setup if random because many initial outliers die
}

function progressGame() {
    //get the 2-dimensional drawing context
    var ctx = myCanvas.getContext("2d");
    //first we clear the canvas
    ctx.clearRect(0, 0, gameSize*10, gameSize*10);
    ctx.fillStyle = backgroundColour;
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    //progress border colour
    squaresBorderColourHue += squaresBorderColourHueIncrement
    squaresBorderColourHue %= 360;
    var squaresBorderColour = HuetoHex(squaresBorderColourHue,1,1);

    //create squares
    for (i = 0; i < gameSize; i++) {
    	for (j = 0; j < gameSize; j++) {

    		var neighbours = countNeighbours(i,j);

    		if (game[i][j]) {
    			if (neighbours == 2 || neighbours == 3) {
    				gameTemp[i][j] = true;
    			} else if (neighbours < 2 || neighbours > 3) {
    				gameTemp[i][j] = false;
    			}
    		} else {
    			if (neighbours == 3) {
    				gameTemp[i][j] = true;
    			}
    		}

    		if (gameTemp[i][j]) {
				//indicate when starting drawing a rectangle
				ctx.beginPath();
				ctx.rect(0 + 10 * j, 0 + 10 * i, 10, 10);


	            //fill the rectangle with the selected color
	            ctx.fillStyle = sqaureFillColour;
	            ctx.fill();

	            //draw a white border for the rectangle
	            ctx.strokeStyle = squaresBorderColour;
	            ctx.stroke();

	            //indicating when finished drawing the rectangle
	            ctx.closePath();
	        }
	    }
	}
	for (i = 0; i < gameSize; i++) {
		for (j = 0; j < gameSize; j++) {
			game[i][j] = gameTemp[i][j];
	    }
	}
	drawGame();
}

//this will run when the document has finished loading (called at start of body)
function setDynamicBackground() {
	setUpGame();
	progressGame();
	setInterval("progressGame()", refreshRate);
}

function drawGame() {
    //generate the image from the canvas
    var imageDataURL = myCanvas.toDataURL();

    //set the dynamic image as the background
    document.body.style.background = "transparent url('" + imageDataURL + "') repeat";
}

//source http://stackoverflow.com/questions/17242144
function mix(a, b, v)
{
    return (1-v)*a + v*b;
}
function HuetoHex(H,S,V) {
	var V2 = V * (1 - S);
    var r  = ((H>=0 && H<=60) || (H>=300 && H<=360)) ? V : ((H>=120 && H<=240) ? V2 : ((H>=60 && H<=120) ? mix(V,V2,(H-60)/60) : ((H>=240 && H<=300) ? mix(V2,V,(H-240)/60) : 0)));
    var g  = (H>=60 && H<=180) ? V : ((H>=240 && H<=360) ? V2 : ((H>=0 && H<=60) ? mix(V2,V,H/60) : ((H>=180 && H<=240) ? mix(V,V2,(H-180)/60) : 0)));
    var b  = (H>=0 && H<=120) ? V2 : ((H>=180 && H<=300) ? V : ((H>=120 && H<=180) ? mix(V2,V,(H-120)/60) : ((H>=300 && H<=360) ? mix(V,V2,(H-300)/60) : 0)));
    var colour = "rgb("+Math.round(r * 255)+", "+Math.round(g * 255)+", "+Math.round(b * 255)+")";
    console.log(colour);
    return colour;
}