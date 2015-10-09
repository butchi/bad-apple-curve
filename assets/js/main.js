window.licker = window.licker || {};
(function(ns) {
  "use strict";
  ns.movieData = {};
  var $canvas = $('.svg-canvas .svg-canvas__main');

  function Curve(components) {
    this.func = function(axis) {
      return function(t) {
        var ret = components[axis][0];
        var i;
        var len = components[axis].length;
        for(i=1; i<len; i++) {
          var cmp = components[axis][i];
          ret += cmp[0] * Math.sin(i * t + cmp[1]);
        }
        return ret;
      };
    };
    this.funcX = this.func(0);
    this.funcY = this.func(1);

    this.vertexArr = [];
    var t;
    for(t=0; t<2*Math.PI; t+=Math.PI/128) {
      this.vertexArr.push([this.funcX(t), this.funcY(t)]);
    }
  }

  Curve.prototype.draw = function() {
    var curve = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    curve.setAttribute('points', this.vertexArr);
    $canvas.append(curve);
  };

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
    drawNextFrame();
  });

  function drawFrame(frame) {
    var curveArr = ns.movieData[frame];
    var c;
    $canvas.children().remove();
    for(c=0; c<curveArr.length; c++) {
      var curve = new Curve(curveArr[c]);
      curve.draw();
    }
  }

  function drawNextFrame() {
        drawFrame(ns.currentFrame);
        if(ns.currentFrame < ns.movieData.length - 1) {
          ns.currentFrame++;
          window.setTimeout(drawNextFrame, 1000/30);
        }
      }
}(window.licker));
