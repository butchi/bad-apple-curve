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
      var $maxFreqController = $('.controller-max-freq');
      $maxFreqController.on('updatevalue', function(evt) {
        var val = $(this).attr('data-value');
        animationPlayer.maxFreq = val;
        $maxFreqSlidebar.val(val);
        $maxFreqNumber.val(val);
        animationPlayer.redraw();
      });

      var $maxFreqSlidebar = $('.controller-max-freq__slidebar input');
      var $maxFreqNumber = $('.controller-max-freq__number input');
      $maxFreqSlidebar.on('input change', function() {
        $maxFreqController.attr('data-value', $(this).val());
        $(this).trigger('updatevalue');
      });
      $maxFreqNumber.on('input change', function() {
        $maxFreqController.attr('data-value', $(this).val());
        $(this).trigger('updatevalue');
      });

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
