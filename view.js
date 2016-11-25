function GameView(gameWrapper){

  var ctx = gameWrapper.ctx;
  var playBox = gameWrapper.playBox;
  var hero = gameWrapper.hero;
  var hero2 = gameWrapper.hero2;
  var mouse = gameWrapper.mouse;
  var puck = gameWrapper.puck;

  var backgroundColor = "#111111";

  function rgbToHex(r, g, b){
    // http://stackoverflow.com/a/6736135/6461842
    if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
    var number = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + ("000000" + number).slice(-6);
  }
  function drawDisc(disc){
    ctx.beginPath();
    ctx.arc(disc.x,disc.y,disc.size,0,2*Math.PI);
    ctx.arc(disc.x,disc.y,disc.size-5,0,2*Math.PI);
    if (disc.fill){
      ctx.fillStyle = disc.fill;
      ctx.fill();
    }
    if (disc.color){
      ctx.fillStyle = disc.color;
      ctx.fill("evenodd");
    }
  }
  function drawLink(a, b){
    ctx.strokeStyle = "#DDDDDD";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  function drawTriangle(a, b, c, fill){
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(a.x, a.y);
    ctx.fillStyle = fill;
    ctx.fill();

    var pixel = ctx.getImageData(puck.x, puck.y, 1, 1).data;
    var color = rgbToHex(pixel[0], pixel[1], pixel[2]);

    ctx.strokeStyle = "#DDDDDD";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();

    return color;
  }
  function drawAll(){
    clearCanvas();
    var area = calcArea();
    var max = 120000;
    var min = 20000;
    if (area > max) {
      area = max;
    } else if (area < min){
      area = min;
    }
    var grad = Math.floor(200 * (1 - ((area - min) / (max - min))));
    var color = rgbToHex(grad, grad, grad);

    var puckColor = drawTriangle(hero, hero2, mouse, color);
    drawDisc(hero);
    drawDisc(hero2);
    drawDisc(mouse);
    drawDisc(puck);
    return puckColor;
  }

  function calcDist(a, b){
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)); 
  }
  function calcArea(){
    var e1 = calcDist(hero, hero2);
    var e2 = calcDist(mouse, hero);
    var e3 = calcDist(mouse, hero2);
    var s = (e1 + e2 + e3)/2.0;
    return Math.floor(Math.sqrt(s * (s - e1) * (s - e2) * (s - e3)));
  }
  function drawStats(puckInBounds, loopDelay){
    var area = calcArea();
    ctx.fillStyle = "white";
    ctx.fillText(loopDelay, 10, 20);
    ctx.fillText(area, 10, 30);
    ctx.fillText(puckInBounds > puck.fill, 10, 40);
  }
  function clearCanvas(){
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(
      playBox.x, playBox.y,
      playBox.width, playBox.height
    );
  };

  return {
    drawSpace: drawAll,
    drawStats: drawStats,
  }
}
