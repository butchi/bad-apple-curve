window.licker = window.licker || {};
(function(ns) {
  function MoviePlayer(animationPlayer, audioPlayer) {
    this.animationPlayer = animationPlayer;
    this.audioPlayer = audioPlayer;

    this.frameRate = 30;

    this.isPause = true;

    var _self = this;

    audioPlayer.$elm.on('play', function() {
      console.log('play');
      _self.play();
    });

    audioPlayer.$elm.on('pause', function() {
      console.log('pause');
      _self.pause();

      // console.log(ns.movieData[_self.getFrame()]);
    });

    audioPlayer.$elm.on('seeking', function() {
      console.log('seeking');

      _self.animationPlayer.drawFrame(_self.getFrame());
    });
  }

  MoviePlayer.prototype.getFrame = function() {
    return Math.floor(this.audioPlayer.audioElm.currentTime * this.frameRate);
  };

  MoviePlayer.prototype.play = function() {
    this.audioPlayer.play();
    this.isPause = false;

    var _self = this;
    requestAnimationFrame(loop);

    function loop() {
      var frame;
      if(!_self.isPause) {
        _self.animationPlayer.drawFrame(_self.getFrame());

        requestAnimationFrame(loop);
      }
    }
  };

  MoviePlayer.prototype.pause = function() {
    this.isPause = true;
  };

  ns.MoviePlayer = MoviePlayer;
}(window.licker));
