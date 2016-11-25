
function GameWrapper(){
  var self = {};

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
      step: 5,
      color: undefined,
      fill: undefined,
    };
  }

  var hero = Entity();
  hero.x = 100;
  hero.y = 100;
  hero.color = "red";
  var hero2 = Entity();
  hero2.x = 200;
  hero2.y = 200;
  hero2.color = "blue";
  var mouse = Entity();
  mouse.color = "green";
  var puck = Entity();
  puck.tx = playBox.width/2;
  puck.ty = playBox.height/2;
  puck.dx = 0.3;
  puck.dy = 0.2;
  puck.size = 15;
  // puck.color = "gold";
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
  }

  self.ctx = ctx;
  self.playBox = playBox;
  self.hero = hero;
  self.hero2 = hero2;
  self.mouse = mouse;
  self.puck = puck;
  var gameView = GameView(self);

  self.step = function(){
    var puckColor = gameView.drawSpace();
    var puckInBounds = puckColor > puck.fill;
    handleInput();
    if (puckInBounds){
      movePuck();
    }
    gameView.drawStats(puckInBounds, loopDelay);
  }

  // init
  movePuck();

  return self;
}
