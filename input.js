
function InputListener(gameWrapper){
  var self = {};
  self.gameWrapper = gameWrapper;

  function sendInput(code, value){
    var k = gameWrapper.KEYS;

    var pressed = null;
    if (code == 38 || code == 87){ // up/W
      pressed = k.UP;
    } else if (code == 40 || code == 83){ // down/S
      pressed = k.DOWN;
    } else if (code == 37 || code == 65){ // left/A
      pressed = k.LEFT;
    } else if (code == 39 || code == 68){ // right/D
      pressed = k.RIGHT;
    } else if (code == 73){ // I
      pressed = k.UP2;
    } else if (code == 75){ // K
      pressed = k.DOWN2;
    } else if (code == 74){ // J
      pressed = k.LEFT2;
    } else if (code == 76){ // L
      pressed = k.RIGHT2;
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
