
function InputListener(gameWrapper){
  var self = {};
  self.gameWrapper = gameWrapper;

  function sendInput(code, value){
    var k = gameWrapper.KEYS;

    var pressed = null;
    if (code == 38){ // up
      pressed = k.UP2;
    } else if (code == 40){ // down
      pressed = k.DOWN2;
    } else if (code == 37){ // left
      pressed = k.LEFT2;
    } else if (code == 39){ // right
      pressed = k.RIGHT2;
    } else if (code == 87){ // W
      pressed = k.UP;
    } else if (code == 83){ // S
      pressed = k.DOWN;
    } else if (code == 65){ // A
      pressed = k.LEFT;
    } else if (code == 68){ // D
      pressed = k.RIGHT;
    } else if (code == 73){ // I
      gameWrapper.sendInput(k.UP, value);
      gameWrapper.sendInput(k.UP2, value);
      gameWrapper.sendInput(k.UP3, value);
    } else if (code == 75){ // K
      gameWrapper.sendInput(k.DOWN, value);
      gameWrapper.sendInput(k.DOWN2, value);
      gameWrapper.sendInput(k.DOWN3, value);
    } else if (code == 74){ // J
      gameWrapper.sendInput(k.LEFT, value);
      gameWrapper.sendInput(k.LEFT2, value);
      gameWrapper.sendInput(k.LEFT3, value);
    } else if (code == 76){ // L
      gameWrapper.sendInput(k.RIGHT, value);
      gameWrapper.sendInput(k.RIGHT2, value);
      gameWrapper.sendInput(k.RIGHT3, value);
    } else if (code == 67){ // C

    } else if (code == 82){ // R

    } else if (code == 49){ // 1

    } else if (code == 50){ // 2

    }

    if(pressed){
      gameWrapper.sendInput(pressed, value);
    }

  }

  window.onkeydown = function(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    // console.log(code);
    sendInput(code, true);
  }

  window.onkeyup = function(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    sendInput(code, false);
  }

  window.onmousemove = function (e) {
    var event = e || /* IE */ window.event;
    var k = gameWrapper.KEYS;
    var x = event.clientX;
    var y = event.clientY;
    gameWrapper.sendInput(k.MX, x);
    gameWrapper.sendInput(k.MY, y);
  }

  return self;  
}
