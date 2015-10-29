window.licker = window.licker || {};
(function(ns) {
  "use strict";
  ns.movieData = {};
  var moviePlayer;
  var animationPlayer;
  var audioPlayer;

  $.getJSON('assets/data/fourier_arr_lq.json', function(data) {
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

      $maxFreqSlidebar.trigger('change');

      $('[class^="controller-quality__button--"]').on('click', function() {
        var $this = $(this);
        var targetClassLi = {
          lq: 'controller-quality__button--lq',
          mq: 'controller-quality__button--mq',
          hq: 'controller-quality__button--hq',
        }

        ns.quality = 'lq';

        _.each(targetClassLi, function(elm, key) {
          if($this.hasClass(targetClassLi[key])) {
            ns.quality = key;
          }
        });

        if(false) {
        } else if(ns.quality === 'mq') {
          $('.' + targetClassLi.mq).attr('disabled', true);

          $maxFreqController.attr('data-value', 50).trigger('updatevalue');
        } else if(ns.quality === 'hq') {
          $('.' + targetClassLi.mq).attr('disabled', true);
          $('.' + targetClassLi.hq).attr('disabled', true);

          $maxFreqController.attr('data-value', 100).trigger('updatevalue');
        }

        $.getJSON('assets/data/fourier_arr_' + ns.quality + '.json', function(data) {
          ns.movieData = data;
        });
      });

      moviePlayer.play();
    });
  });

}(window.licker));
