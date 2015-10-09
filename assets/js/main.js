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
      $maxFreqController.on('change', function() {
        var val = $(this).attr('data-val');
        animationPlayer.maxFreq = val;
        $maxFreqSlidebar.val(val);
        $maxFreqNumber.val(val);
      });

      var $maxFreqSlidebar = $('.controller-max-freq__slidebar input');
      var $maxFreqNumber = $('.controller-max-freq__number input');
      $maxFreqSlidebar.on('change', function() {
        $maxFreqController.attr('data-val', $(this).val());
        $maxFreqController.trigger('change');
      });
      $maxFreqNumber.on('change', function() {
        console.log('hoge');
        $maxFreqController.attr('data-val', $(this).val());
        $maxFreqController.trigger('change');
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
