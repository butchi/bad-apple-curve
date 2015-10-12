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
    });

    audioPlayer.$elm.on('seeking', function() {
      console.log('seeking');

      var frame = Math.floor(_self.audioPlayer.audioElm.currentTime * _self.frameRate);
      _self.animationPlayer.drawFrame(frame);
    });
  }

  MoviePlayer.prototype.play = function() {
    this.audioPlayer.play();
    this.isPause = false;

    var _self = this;
    requestAnimationFrame(loop);

    function loop() {
      var frame;
      if(!_self.isPause) {
        frame = Math.floor(_self.audioPlayer.audioElm.currentTime * _self.frameRate);
        _self.animationPlayer.drawFrame(frame);

        requestAnimationFrame(loop);
      }
    }
  };

  MoviePlayer.prototype.pause = function() {
    this.isPause = true;
  };

  ns.MoviePlayer = MoviePlayer;
}(window.licker));
