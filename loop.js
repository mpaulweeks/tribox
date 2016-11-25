

function GameLoop(gameWrapper){
  var self = {};
  self.gameWrapper = gameWrapper;

  var TIMEOUT_TARGET = 16; // 1000ms/30fps

  self.run = function(){
    var start = new Date();

    self.gameWrapper.step();

    var end = new Date();
    var msElapsed = end - start;
    var delay = TIMEOUT_TARGET - msElapsed;
    gameWrapper.drawDelay(delay);
    if (delay < 1){
      delay = 1;
    }
    window.setTimeout(self.run, delay);
  }

  return self;
}
