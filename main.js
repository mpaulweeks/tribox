
function main() {

function init(){
  var gameWrapper = GameWrapper();
  InputListener(gameWrapper);
  GameLoop(gameWrapper).run();
}

init();

}
