 var config = {
    apiKey: "AIzaSyB4k0DxR5T9KKUm580XS1HTxFa4pauAXMw",
    authDomain: "collaborative-sketch-f55e9.firebaseapp.com",
    databaseURL: "https://collaborative-sketch-f55e9.firebaseio.com",
    storageBucket: "collaborative-sketch-f55e9.appspot.com",
    messagingSenderId: "106252827109"
  };
  firebase.initializeApp(config);

var pointsData = firebase.database().ref();

var points = [];

function setup() {
    var canvas = createCanvas(400, 400);
    background(255);
    fill(0);
    
    pointsData.on("child_added", function (point) {
        points.push(point.val());
    });
    pointsData.on("child_removed", function (point) {
        points = [];
    });
    
    canvas.mousePressed(drawPoint);
    canvas.mouseMoved(drawPointIfMousePressed);
}

function draw() {
    background(255);
    
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        ellipse(point.x, point.y, 5, 5);
    }
}

function drawPoint() {
    pointsData.push({x: mouseX, y: mouseY});
}

function drawPointIfMousePressed() {
    if (mouseIsPressed) {
        drawPoint();
    }
}

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
    saveCanvas();
}

$("#cleatDrawing").on("click", clearDrawing);

function clearDrawing() {
    pointsData.remove();
    points = [];
}