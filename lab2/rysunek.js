var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillText("Hello World", 10, 10); //Wykreślenie podanego tekstu na płótnie / Drawing given text on canvas
ctx.fillRect(20, 20, 20, 30);

ctx.beginPath();
ctx.moveTo(30, 70);
ctx.lineTo(50, 90);
ctx.lineTo(50, 40);
ctx.fill();
ctx.closePath();

ctx.arc(30, 175, 25, 0, Math.PI * 2, true);
ctx.fill();