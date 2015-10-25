window.licker = window.licker || {};
(function(ns) {
  function Curve(components, maxFreqOpt) {
    this.components = components;

    // components: 級数展開の係数の配列
    this.func = function(axis) {
      // axis:  x: 0, y: 1
      return function(t) {
        var ret = components[axis][0]; // 定数（周波数0）
        var i;
        var maxFreqOrg = components[axis].length - 1; // 級数
        var maxFreq = Math.min(maxFreqOpt || maxFreqOrg, maxFreqOrg); // 何次まで拾うか
        for(i = 1; i <= maxFreq; i++) {
          var cmp = components[axis][i];
          // cmp[0]: 係数, cmp[1]: 位相
          ret += cmp[0] * Math.sin(i * t + cmp[1]);
        }
        return ret;
      };
    };
    this.funcX = this.func(0);
    this.funcY = this.func(1);

    this.vertexArr = [];
    var t;
    for(t = 0; t < 2 * Math.PI; t += Math.PI/256) {
      this.vertexArr.push([this.funcX(t), this.funcY(t)]);
    }
  }

  Curve.prototype.draw = function() {
    var curve = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    curve.setAttribute('points', this.vertexArr);
    ns.$canvas.append(curve);
  };

  Curve.prototype.toExpression = function() {
    var strPair = [];
    this.components.forEach(function(component, axisIndex) {
      var len = component.length;

      var str = component[0];
      var i;
      for(i = 1; i < len; i++) {
        var a = component[i][0];
        var aSgn = Math.sign(a);
        var aAbs = Math.abs(a);

        var q = component[i][1];
        var qSgn = Math.sign(q);
        var qAbs = Math.abs(q);

        var isExist = (aSgn !== 0);

        if(isExist) {
          str += ' ' + (aSgn === 1 ? '+' : '-') + ' ' + (a === 1 ? '' : a) + 'sin(' + (i === 1 ? '' : i) + 't' + ((qAbs === 0) ? '' : ' ' + (qSgn === 1 ? '+' : '-') + ' ' + qAbs + ')');
        }
      }

      strPair[axisIndex] = str;
    });

    return {
      x: strPair[0],
      y: strPair[1]
    };
  }

  ns.Curve = Curve;
}(window.licker));
