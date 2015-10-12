window.licker = window.licker || {};
(function(ns) {
  function Curve(components, maxFreqOpt) {
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

  ns.Curve = Curve;
}(window.licker));
