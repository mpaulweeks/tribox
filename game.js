
function GameWrapper(){
  var self = {};

  self.fps = 60;
  var height = $(document).height() - 30;
  var width = $(document).width() - 30;
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  window.ctx = ctx; // todo debug
  canvas.height = height;
  canvas.width = width;
  var playBox = {
    x: 0,
    y: 0,
    width: width,
    height: height,
  };
  var boundX = playBox.x + 100;
  var boundY = playBox.y + 100;
  var boundWidth = playBox.width - 200;
  var boundHeight = playBox.height - 200;
  var loopDelay = 0;
  var timer = function(){
    var tself = {};
    tself.current = 0;
    tself.best = 0;
    var startDate = new Date();
    var allTicks = 0;
    tself.tick = function(){
      tself.current += 1;
    };
    tself.ping = function(){
      allTicks += 1;
    }
    tself.reset = function(){
      if (tself.current > tself.best){
        tself.best = tself.current;
      }
      tself.current = 0;
    }
    tself.fps = function(){
      return Math.floor((1000 * allTicks) / (new Date() - startDate));
    }
    return tself;
  }();

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
    UP3: 'UP3',
    DOWN3: 'DOWN3',
    LEFT3: 'LEFT3',
    RIGHT3: 'RIGHT3',
  }
  var currentInput = {};
  currentInput[self.KEYS.MX] = 500;
  currentInput[self.KEYS.MY] = 100;
  self.sendInput = function(key, value){
    currentInput[key] = value;
  }
  self.setDelay = function(delay){
    loopDelay = delay;
  }

  function Entity(){
    return {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      size: 20,
      step: Math.floor(300/self.fps),
      color: undefined,
      fill: undefined,
    };
  }

  var hero = Entity();
  hero.x = 100;
  hero.y = 100;
  hero.color = "red";
  var hero2 = Entity();
  hero2.x = 300;
  hero2.y = 300;
  hero2.color = "blue";
  var mouse = Entity();
  mouse.color = "green";
  var puck = Entity();
  puck.tx = playBox.width/2;
  puck.ty = playBox.height/2;
  puck.dx = puck.step/1.5;
  puck.dy = puck.step/2.5;
  puck.size = puck.size - 5;
  puck.fill = "#333333";

  function handleInput(){
    mouse.x = currentInput[self.KEYS.MX];
    mouse.y = currentInput[self.KEYS.MY];

    var minX = playBox.x;
    var minY = playBox.y;
    var maxX = minX + playBox.width;
    var maxY = minY + playBox.height;

    if (currentInput[self.KEYS.UP] && hero.y - hero.size > minY){
      hero.y -= hero.step;
    }
    if (currentInput[self.KEYS.DOWN] && hero.y + hero.size < maxY){
      hero.y += hero.step;
    }
    if (currentInput[self.KEYS.LEFT] && hero.x - hero.size > minX){
      hero.x -= hero.step;
    }
    if (currentInput[self.KEYS.RIGHT] && hero.x + hero.size < maxX){
      hero.x += hero.step;
    }

    if (currentInput[self.KEYS.UP2] && hero2.y - hero2.size > minY){
      hero2.y -= hero2.step;
    }
    if (currentInput[self.KEYS.DOWN2] && hero2.y + hero2.size < maxY){
      hero2.y += hero2.step;
    }
    if (currentInput[self.KEYS.LEFT2] && hero2.x - hero2.size > minX){
      hero2.x -= hero2.step;
    }
    if (currentInput[self.KEYS.RIGHT2] && hero2.x + hero2.size < maxX){
      hero2.x += hero2.step;
    }

    // debug
    if (currentInput[self.KEYS.UP3] && mouse.y - mouse.size > minY){
      currentInput[self.KEYS.MY] -= mouse.step;
    }
    if (currentInput[self.KEYS.DOWN3] && mouse.y + mouse.size < maxY){
      currentInput[self.KEYS.MY] += mouse.step;
    }
    if (currentInput[self.KEYS.LEFT3] && mouse.x - mouse.size > minX){
      currentInput[self.KEYS.MX] -= mouse.step;
    }
    if (currentInput[self.KEYS.RIGHT3] && mouse.x + mouse.size < maxX){
      currentInput[self.KEYS.MX] += mouse.step;
    }
  }

  function fixPuckSpeed(speed){
    var secondsElapsed = timer.current / self.fps;
    var minSpeed = 0.1 + (0.05 * secondsElapsed);
    var maxSpeed = (puck.step * 0.5) + (0.05 * secondsElapsed);
    var sign = speed / Math.abs(speed);
    var positiveSpeed = Math.abs(speed);

    if (positiveSpeed < minSpeed){
      speed = sign * minSpeed;
    } else if (positiveSpeed > maxSpeed){
      speed = sign * maxSpeed;
    }

    return speed;
  }

  function movePuck(){
    puck.tx += puck.dx;
    puck.ty += puck.dy;
    puck.x = Math.floor(puck.tx);
    puck.y = Math.floor(puck.ty);

    var minX = boundX;
    var minY = boundY;
    var maxX = minX + boundWidth;
    var maxY = minY + boundHeight;
    var changed = false;

    if (puck.x < minX || puck.x > maxX){
      puck.dx *= -1;
      changed = true;
    }
    if (puck.y < minY || puck.y > maxY){
      puck.dy *= -1;
      changed = true;
    }
    if (!changed){
      if (Math.random() * 30 <= 1){
        var change = Math.random() * 2;
        if (Math.random() * 2 <= 1){
          change *= -1;
        }
        if (Math.random() * 2 <= 1){
          puck.dx += change;
        } else {
          puck.dy += change;
        }
      }
    }
    puck.dx = fixPuckSpeed(puck.dx);
    puck.dy = fixPuckSpeed(puck.dy);
  }

  var gameView = GameView({
    fps: self.fps,
    ctx: ctx,
    playBox: playBox,
    discs: [hero, hero2, mouse],
    puck: puck,
    timer: timer,
  });

  self.step = function(){
    var puckColor = gameView.drawSpace();
    var puckInBounds = puckColor > puck.fill;
    handleInput();
    if (puckInBounds){
      puck.color = undefined;
      movePuck();
      timer.tick();
    } else {
      puck.color = "gold";
      timer.reset();
    }
    timer.ping(); //debug
    gameView.drawStats(puckInBounds, loopDelay);
  }

  // init
  movePuck();

  return self;
}
