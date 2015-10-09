window.licker = window.licker || {};
(function(ns) {
  function MoviePlayer(animationPlayer, audioPlayer) {
    this.animationPlayer = animationPlayer;
    this.audioPlayer = audioPlayer;

    this.frameRate = 30;
  }

  MoviePlayer.prototype.play = function() {
    this.audioPlayer.play();

    var _self = this;
    requestAnimationFrame(loop);

    function loop() {
      var frame = Math.floor(_self.audioPlayer.audioElm.currentTime * _self.frameRate);
      _self.animationPlayer.drawFrame(frame);

      requestAnimationFrame(loop);
    }
  };

  ns.MoviePlayer = MoviePlayer;
}(window.licker));
