var canvas;
var ctx;

function init() {
  canvas = initFullScreenCanvas('canvas');
  ctx = canvas.getContext('2d');
  repaint();

  const data = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0],
    [0, 0, 2, 1, 1, 2, 0],
  ];

}

function initFullScreenCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  resizeCanvas(canvas);
  window.addEventListener('resize', function() {
    resizeCanvas(canvas);
  });
  return canvas;
}

function resizeCanvas(canvas) { 
  canvas.width = document.width || document.body.clientWidth;
  canvas.height = document.height || document.body.clientHeight;
  repaint();
} 

function repaint() {
  if (!ctx) return;
  var logo = new Image();
  logo.src = '../images/content/bg.png';
  var pattern = ctx.createPattern(logo, "repeat");
 ctx.fillStyle = pattern;
 ctx.lineWidth = 10;
 ctx.fillRect(0, 0, 800, 600); 
}

function reorient() {
  let angle = window.orientation;
  if (angle) {
    const rot = -Math.PI*(angle/180);
    ctx.translate(angle == -90 ? canvas.width : 0,
      angle == 90 ? canvas.height : 0);
    ctx.rotate(rot);
  }
} 





// function init() {
//   var canvas = document.getElementById("canvas");
//   var ctx = canvas.getContext("2d");
 
//   // Background
//   var gradient = ctx.createLinearGradient(0, 0, 0, 300);
//   gradient.addColorStop(0, "#fffbb3");
//   gradient.addColorStop(1, "#f6f6b2");
//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
 
//   // Drawing curves
//   ctx.strokeStyle = "#dad7ac";
//   ctx.fillStyle = "#f6f6b2";
//   ctx.beginPath();
//   ctx.moveTo(50, 300);
//   ctx.bezierCurveTo(450, -50, -150, -50, 250, 300);
//   ctx.fill();
//   ctx.beginPath();
//   ctx.moveTo(50, 0);
//   ctx.bezierCurveTo(450, 350, -150, 350, 250, 0);
//   ctx.fill();
//   // Border
//   ctx.strokeStyle = "#989681";
//   ctx.lineWidth = 2;
//   ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
 
//   // Grid and pieces (translate to center in on Canvas)
//   var cellSize = 40;
//   var gridWidth = cellSize*7;
//   var gridHeight = cellSize*6; 

//   var gridOffsetLeft = Math.floor((canvas.width - gridWidth)/2);
//  var gridOffsetTop = Math.floor((canvas.height - gridHeight)/2);

//  ctx.save();
//  ctx.translate(gridOffsetLeft, gridOffsetTop);

//  // Grid
//  ctx.beginPath();

//  // Drawing horizontal lines
//  for (var i = 0; i < 8; i++) {
//  ctx.moveTo(i*cellSize + 0.5, 0);
//  ctx.lineTo(i*cellSize + 0.5, cellSize*6)
//  }
//  // Drawing vertical lines
//  for (var j = 0; j < 7; j++) {
//  ctx.moveTo(0, j*cellSize + 0.5);
//  ctx.lineTo(cellSize*7, j*cellSize + 0.5);
//  }
//  // Stroking to show them on the screen
//  ctx.lineWidth = 1;
//  ctx.strokeStyle = "#989681";
//  ctx.stroke();

//  // Pieces
//  var data = [
//  [0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0],
//  [0, 0, 0, 2, 1, 0, 0],
//  [0, 0, 2, 1, 1, 2, 0]
//  ];
//  ctx.strokeStyle = "#000";
//  ctx.lineWidth = 3; 
//  for (var i = 0; i < data.length; i++) {
//   for (var j = 0; j < data[i].length; j++) {
//   var value = data[i][j];
//   if (!value)
//   continue;
//   // Determine the color of the token
//   var color;
//   switch (value) {
//   case 1:
//   color = "red"; 
//   break;
//   case 2:
//   color = "green";
//   break;
//   }
//   // Center of the token
//   var x = (j + 0.5)*cellSize;
//   var y = (i + 0.5)*cellSize;
 
//   // Token radius
//   var radius = cellSize*0.4;
 
//   // Center of the gradient
//   var gradientX = x + cellSize*0.1;
//   var gradientY = y - cellSize*0.1; 
//   var gradient = ctx.createRadialGradient(
//     gradientX, gradientY, cellSize*0.1, // inner circle
//     gradientX, gradientY, radius*1.2); // outer circle
//     gradient.addColorStop(0, "yellow"); // the color of the
//     gradient.addColorStop(1, color); // the color of the token
//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, 2*Math.PI, true);
//     ctx.fill();
//     }
//     }
//     // Restore the state of the context, since we've changed it
//     ctx.restore()
// } 

document.body.onload = init;