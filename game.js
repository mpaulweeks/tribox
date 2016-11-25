
function GameWrapper(){
  var self = {};

  var height = $(document).height() - 30;
  var width = $(document).width() - 30;
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  window.ctx = ctx; // todo debug
  canvas.height = height;
  canvas.width = width;

  self.KEYS = {
    MX: 'MOUSE_X',
    MY: 'MOUSE_Y',
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP2: 'UP2',
    DOWN2: 'DOWN2',
    LEFT2: 'LEFT2',
    RIGHT2: 'RIGHT2',
  }
  var currentInput = {};
  currentInput[self.KEYS.MX] = 1;
  currentInput[self.KEYS.MY] = 1;
  self.sendInput = function(key, value){
    currentInput[key] = value;
  }

  function Entity(){
    return {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
    };
  }

  var hero = Entity();
  hero.x = 100;
  hero.y = 100;
  hero.size = 20;
  hero.step = 5;
  var hero2 = Entity();
  hero2.x = 200;
  hero2.y = 200;
  hero2.size = hero.size;
  hero2.step = hero.step;
  var mouse = Entity();
  mouse.size = hero.size;
  function drawHero(hero, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(hero.x,hero.y,hero.size,0,2*Math.PI);
    ctx.arc(hero.x,hero.y,hero.size-5,0,2*Math.PI);
    ctx.fill("evenodd");
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
    ctx.fillStyle = fill;
    ctx.strokeStyle = "#DDDDDD";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(a.x, a.y);
    ctx.fill();
    ctx.stroke();
  }
  function drawAll(){
    var area = calcArea();
    var max = 90000;
    if (area > max) {
      area = max;
    }
    var grad = "" + Math.floor(100 * (1 - area / max));
    if (grad.length == 1){
      grad = "0" + grad;
    }
    var color = "#" + grad + grad + grad;

    drawTriangle(hero, hero2, mouse, color);
    drawHero(hero, "red");
    drawHero(hero2, "blue");
    drawHero(mouse, "green");
    // drawLink(hero, hero2);
    // drawLink(mouse, hero);
    // drawLink(mouse, hero2);
  }

  function calcDist(a, b){
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)); 
  }
  function calcArea(){
    var e1 = calcDist(hero, hero2);
    var e2 = calcDist(mouse, hero);
    var e3 = calcDist(mouse, hero2);
    var s = (e1 + e2 + e3)/2.0;
    return Math.sqrt(s * (s - e1) * (s - e2) * (s - e3));
  }
  function drawArea(){
    var area = calcArea();
    ctx.fillStyle = "white";
    ctx.fillText(area, 50, 50);
  }
  self.drawDelay = function(delay){
    ctx.fillStyle = "white";
    ctx.fillText(delay, 50, 40);
  }

  function clearCanvas(){
    ctx.fillStyle = "#111111";
    ctx.fillRect(
      0, 0, 
      width, height
    );
  };

  function handleInput(){
    mouse.x = currentInput[self.KEYS.MX];
    mouse.y = currentInput[self.KEYS.MY];
    if (currentInput[self.KEYS.UP] && hero.y - hero.size > 0){
      hero.y -= hero.step;
    }
    if (currentInput[self.KEYS.DOWN] && hero.y + hero.size < height){
      hero.y += hero.step;
    }
    if (currentInput[self.KEYS.LEFT] && hero.x - hero.size > 0){
      hero.x -= hero.step;
    }
    if (currentInput[self.KEYS.RIGHT] && hero.x + hero.size < width){
      hero.x += hero.step;
    }

    if (currentInput[self.KEYS.UP2] && hero2.y - hero2.size > 0){
      hero2.y -= hero2.step;
    }
    if (currentInput[self.KEYS.DOWN2] && hero2.y + hero2.size < height){
      hero2.y += hero2.step;
    }
    if (currentInput[self.KEYS.LEFT2] && hero2.x - hero2.size > 0){
      hero2.x -= hero2.step;
    }
    if (currentInput[self.KEYS.RIGHT2] && hero2.x + hero2.size < width){
      hero2.x += hero2.step;
    }
  }

  self.step = function(){
    clearCanvas();
    handleInput();
    drawAll();
    drawArea();
  }

  return self;
}
