
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Tips.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9060egENLhOEaz4Ec2U2i28', 'Tips');
// scripts/Tips.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    clock: 90
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.width = 350;
    this.node.height = 100;
  },
  start: function start() {},
  update: function update(dt) {
    this.clock--;
    this.node.opacity -= 2;
    if (this.clock == 0) this.node.destroy();
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVGlwcy5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNsb2NrIiwib25Mb2FkIiwibm9kZSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhcnQiLCJ1cGRhdGUiLCJkdCIsIm9wYWNpdHkiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDO0FBREUsR0FIUDtBQU9MO0FBRUFDLEVBQUFBLE1BVEssb0JBU0s7QUFDTixTQUFLQyxJQUFMLENBQVVDLEtBQVYsR0FBZ0IsR0FBaEI7QUFDQSxTQUFLRCxJQUFMLENBQVVFLE1BQVYsR0FBaUIsR0FBakI7QUFDSCxHQVpJO0FBY0xDLEVBQUFBLEtBZEssbUJBY0ksQ0FFUixDQWhCSTtBQWtCTEMsRUFBQUEsTUFsQkssa0JBa0JHQyxFQWxCSCxFQWtCTztBQUNSLFNBQUtQLEtBQUw7QUFDQSxTQUFLRSxJQUFMLENBQVVNLE9BQVYsSUFBbUIsQ0FBbkI7QUFDQSxRQUFJLEtBQUtSLEtBQUwsSUFBWSxDQUFoQixFQUNLLEtBQUtFLElBQUwsQ0FBVU8sT0FBVjtBQUNSO0FBdkJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjbG9jazo5MCxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGg9MzUwO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQ9MTAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgdGhpcy5jbG9jay0tO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5LT0yO1xyXG4gICAgICAgIGlmICh0aGlzLmNsb2NrPT0wKVxyXG4gICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=