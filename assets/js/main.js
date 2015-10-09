window.licker = window.licker || {};
(function(ns) {
  "use strict";
  ns.movieData = {};
  var moviePlayer;
  var animationPlayer;
  var audioPlayer;

  $.getJSON('assets/data/fourier_arr.json', function(data) {
    ns.movieData = data;
    ns.currentFrame = 0;

    $(function() {
      var $canvas = $('.svg-canvas .svg-canvas__main');
      ns.$canvas = $canvas; // TODO: do not use global variable
      var $audio = $('.audio--bad-apple');

      audioPlayer = new ns.AudioPlayer($audio);
      animationPlayer = new ns.AnimationPlayer();
      moviePlayer = new ns.MoviePlayer(animationPlayer, audioPlayer);

      moviePlayer.play();
    });

  });

}(window.licker));
