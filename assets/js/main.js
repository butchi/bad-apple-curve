window.licker = window.licker || {};
(function(ns) {
  "use strict";
  ns.movieData = {};

  $.getJSON('assets/data/fourier_arr.json', function(data) {
    ns.movieData = data;
    ns.currentFrame = 0;

    $(function() {
      var $canvas = $('.svg-canvas .svg-canvas__main');
      ns.$canvas = $canvas; // TODO: do not use global variable

      var animationPlayer = new ns.AnimationPlayer();
      animationPlayer.play();
    });

  });

  $(function() {
    var $audio = $('.audio--bad-apple');
    var audioPlayer = new ns.AudioPlayer($audio);
    audioPlayer.play();

    audioPlayer.$elm.on('seeking', function() {
      console.log('seeking');
    });

    audioPlayer.$elm.on('seeked', function() {
      console.log('seeked');
    });
  });

}(window.licker));
