window.licker = window.licker || {};
(function(ns) {
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
    ns.$canvas.append(curve);
  };

  ns.Curve = Curve;
}(window.licker));
