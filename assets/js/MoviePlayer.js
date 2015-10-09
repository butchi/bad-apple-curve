window.licker = window.licker || {};
(function(ns) {
  function MoviePlayer(animationPlayer, audioPlayer) {
    this.animationPlayer = animationPlayer;
    this.audioPlayer = audioPlayer;
  }

  MoviePlayer.prototype.play = function() {
    // this.animationPlayer.play();
    this.audioPlayer.play();

    var _self = this;
    setInterval(function() {
      var frame = ~~(_self.audioPlayer.audioElm.currentTime * 30);
      _self.animationPlayer.drawFrame(frame);
    }, 100);
  };

  ns.MoviePlayer = MoviePlayer;
}(window.licker));
