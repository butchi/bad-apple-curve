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
        if((moviePlayer.getFrame() !== 0) && moviePlayer.isPause) {
          moviePlayer.showInfo();
        }
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

      $('.controller-compare').on('change', function() {
        var $movie = $('.original-movie');
        if($(this).is(':checked')) {
          $movie.show();
          if(moviePlayer.ytPlayer) {
            moviePlayer.ytPlayer.seekTo(moviePlayer.getCurrentTime(), true);
          }
        } else {
          $movie.hide();
        }
      });

      var $canvas = $('.svg-canvas .svg-canvas__main');
      ns.$canvas = $canvas; // TODO: do not use global variable
      var $audio = $('.audio--bad-apple');

      audioPlayer = new ns.AudioPlayer($audio);
      animationPlayer = new ns.AnimationPlayer();
      moviePlayer = new ns.MoviePlayer(animationPlayer, audioPlayer);

      ns.moviePlayer = moviePlayer;
      ns.animationPlayer = animationPlayer;
      ns.audioPlayer = audioPlayer;

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

    window.onYouTubeIframeAPIReady = function() {
      var ytPlayer = new YT.Player('original_movie', {
        width   : '480',
        height  : '360',
        videoId : 'G3C-VevI36s',
        events  : {
          // プレイヤーの準備ができたときに実行されるコールバック関数
          onReady : onPlayerReady,
          onStateChange: onStateChange
        },
        playerVars: {
          rel      : 0, // 関連動画
          showinfo : 0, // 動画情報
          controls : 0, // コントローラー
          wmode    : 'transparent' // z-indexを有効にする
        }
      });

      function onPlayerReady() {
        ytPlayer.mute();
        if(!moviePlayer.isPause) {
          ytPlayer.playVideo();
        }
      }

      function onStateChange(state) {
          switch (state.data) {
          case window.YT.PlayerState.PAUSED:
          case window.YT.PlayerState.ENDED:
            break;

          case window.YT.PlayerState.PLAYING:
            break;
          }
      }

      ns.moviePlayer.ytPlayer = ytPlayer;
    };
  });

}(window.licker));
