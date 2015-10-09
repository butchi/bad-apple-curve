window.licker = window.licker || {};
(function(ns) {
  "use strict";
  ns.movieData = {};
  var $canvas = $('.svg-canvas .svg-canvas__main');
  ns.$canvas = $canvas;

  /*
   *  配列の値の総和
   */
  function total(arr) {
    var i;
    var len = arr.length;
    var ret = 0;
    for(i=0; i<len; i++) {
      ret += arr[i];
    }
    return ret;
  }

  $.getJSON('assets/data/fourier_arr.json', function(data) {
    ns.movieData = data;
    ns.currentFrame = 0;
    $(function() {
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
