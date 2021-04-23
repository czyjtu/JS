function fitToContainer(canvas) {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  canvas.height *= 4;
  canvas.width *= 4;
}

function drawBar(ctx, X, Y, w, h, col) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = col;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(X, Y, w, h);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = col;
  ctx.rect(X, Y, w, h);
  ctx.stroke();
  ctx.restore();
}

function drawLine(ctx, startX, startY, endX, endY, col) {
  ctx.save();
  ctx.strokeStyle = col;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawPoint(ctx, x, y, r, col) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = col;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function barChart(ctx, data, labels, colors) {
  if (data === null || labels == null || colors == null) {
    return;
  }
  if (data.length != labels.length || labels.length != colors.length) {
    console.error("data or labels or colors size doesnt match");
    return;
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  var realW = ctx.canvas.width;
  var realH = ctx.canvas.height;
  var sizeX = 0.8 * realW;
  var sizeY = 0.8 * realH;
  var offY = (realH - sizeY) / 2;
  var offX = (2 * (realW - sizeX)) / 3;
  var barW = sizeX / data.length;
  var padd = barW / 6;
  var scaleMax = 1.2 * Math.max(...data);
  var unit = sizeY / scaleMax;
  var pointsNum = 11;
  var breakY = sizeY / pointsNum;

  // draw Axes
  drawLine(ctx, offX, offY + sizeY, offX + sizeX, offY + sizeY, "#262626");
  for (let i = 1; i < pointsNum; i++) {
    let value = Math.round((breakY * i) / unit).toString();
    var textW = ctx.measureText(value).width;
    ctx.font = 0.12 * offX.toString() + "px Arial";
    ctx.fillStyle = "#262626";
    ctx.fillText(
      value,
      (2 * (offX - textW)) / 3,
      offY + sizeY - breakY * i,
      offX * 0.7
    );
    drawLine(
      ctx,
      0.9 * offX,
      offY + sizeY - breakY * i,
      offX + sizeX,
      offY + sizeY - breakY * i,
      "#c9c9c9"
    );
  }

  // draw bars
  for (let i = 0; i < data.length; i++) {
    drawBar(
      ctx,
      offX + i * barW + padd,
      offY + sizeY - data[i] * unit,
      barW - 2 * padd,
      data[i] * unit,
      colors[i]
    );
    drawLine(
      ctx,
      offX + i * barW,
      offY + sizeY,
      offX + i * barW,
      offY,
      "#c9c9c9"
    );
    ctx.font = 0.3 * offY.toString() + "px Arial";
    var textW = ctx.measureText(labels[i].toString()).width;
    ctx.fillStyle = "#262626";
    ctx.fillText(
      labels[i].toString(),
      offX + i * barW + (barW - textW) / 2,
      1.5 * offY + sizeY,
      barW * 0.7
    );
  }
}

function scatterPlot(
  ctx,
  xData,
  yData,
  xStep,
  yStep,
  color,
  xLabel,
  yLabel,
  r
) {
  if (xData.length != yData.length) {
    console.error("x values and y values with different size");
    return;
  }
  if (r == null || r <= 0) {
    r = 0.04;
  }
  if(xStep <= 0 || yStep <= 0){
    console.error("step must be positive.");
    return;
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  var realW = ctx.canvas.width;
  var realH = ctx.canvas.height;
  var sizeX = 0.8 * realW;
  var sizeY = 0.8 * realH;
  var offY = (realH - sizeY) / 3;
  var offX = (2 * (realW - sizeX)) / 3;
  var minY = Math.min(...yData);
  var maxY = Math.max(...yData);
  var minX = Math.min(...xData);
  var maxX = Math.max(...xData);
  var unitX = sizeX / (maxX - minX);
  var unitY = sizeY / (maxY - minY);
  var ayLen = (maxY - minY) / yStep;
  var axLen = (maxX - minX) / xStep;

  //draw axes
  drawLine(ctx, offX, offY + sizeY, offX + sizeX, offY + sizeY, "#262626");
  drawLine(ctx, offX, offY + sizeY, offX, offY, "#262626");
  for (let i = 0; i <= ayLen; i++) {
    let value = round(yStep * i + minY, 2).toString();
    var textW = ctx.measureText(value).width;
    ctx.font = 0.5 * offY.toString() + "px Arial";
    ctx.fillText(
      value,
      (3 * (offX - textW)) / 4,
      offY + sizeY - yStep * i * unitY,
      offX * 0.7
    );
    drawLine(
      ctx,
      0.9 * offX,
      offY + sizeY - yStep * i * unitY,
      offX + sizeX,
      offY + sizeY - yStep * i * unitY,
      "#c9c9c9"
    );
  }

  textW = ctx.measureText(xLabel).width;
  ctx.font = 0.6 * offY.toString() + "px Arial";
  ctx.fillText(xLabel, offX + (sizeX - textW) / 2, offY * 2.5 + sizeY, sizeX);

  ctx.save();
  textW = ctx.measureText(yLabel).width;
  ctx.translate(offX * 0.3, offY + sizeY / 2 + textW / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = 0.6 * offY.toString() + "px Arial";
  ctx.fillText(yLabel, 0, 0, sizeY);
  ctx.restore();

  for (let i = 0; i <= axLen; i++) {
    value = round(xStep * i + minX, 2).toString();
    var textW = ctx.measureText(value).width;
    var textH = 0.5 * offY;
    ctx.font = textH.toString() + "px Arial";
    ctx.fillText(
      value,
      offX + xStep * i * unitX - textW / 2,
      sizeY + 2 * offY - (offY - textH) / 2,
      offY * 0.7
    );
    drawLine(
      ctx,
      offX + xStep * unitX * i,
      1.2 * offY + sizeY,
      offX + xStep * unitX * i,
      offY,
      "#c9c9c9"
    );
  }

  // draw points
  for (let i = 0; i < xData.length; i++) {
    drawPoint(
      ctx,
      offX + (xData[i] - minX) * unitX,
      offY + sizeY - (yData[i] - minY) * unitY,
      r* unitX,
      color
    );
  }
}
