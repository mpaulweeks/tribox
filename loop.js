

function GameLoop(gameWrapper){
  var self = {};

  var timeoutTarget = Math.floor(1000/gameWrapper.fps);

  self.run = function(){
    var start = new Date();

    gameWrapper.step();

    var end = new Date();
    var msElapsed = end - start;
    var delay = timeoutTarget - msElapsed - 1;
    gameWrapper.setDelay(delay);
    if (delay < 1){
      delay = 1;
    }
    window.setTimeout(self.run, delay);
  }

  return self;
}
