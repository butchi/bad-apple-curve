window.licker = window.licker || {};
(function(ns) {
  function AnimationPlayer() {
  }

  AnimationPlayer.prototype.play = function() {
    this.drawNextFrame();
  }

  AnimationPlayer.prototype.drawFrame = function(frame) {
    var curveArr = ns.movieData[frame];
    var c;
    ns.$canvas.children().remove();
    for(c=0; c<curveArr.length; c++) {
      var curve = new ns.Curve(curveArr[c]);
      curve.draw();
    }
  };

  AnimationPlayer.prototype.drawNextFrame = function() {
    this.drawFrame(ns.currentFrame);
    if(ns.currentFrame < ns.movieData.length - 1) {
      ns.currentFrame++;
      var _self = this;
      window.setTimeout(function() {
        _self.drawNextFrame();
      }, 1000/30);
    }
  };

  ns.AnimationPlayer = AnimationPlayer;
}(window.licker));
