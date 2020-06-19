
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/tipWindow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '000f6jgaO5Fr6rBFlOCFLDj', 'tipWindow');
// scripts/tipWindow.js

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
    title: null,
    content: null,
    //内容
    btnOk: null //确认按钮

  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.title = this.node.getChildByName('title');
    this.content = this.node.getChildByName('content');
    this.btnOk = this.node.getChildByName('okBtn');
    this.node.active = false;
  },
  start: function start() {},
  hiddenMyself: function hiddenMyself() {
    console.log('xxx');
    console.log(this.node);
    this.node.actice = false;
    this.node.emit('roll-dice-done', '1');
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGlwV2luZG93LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGl0bGUiLCJjb250ZW50IiwiYnRuT2siLCJvbkxvYWQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJzdGFydCIsImhpZGRlbk15c2VsZiIsImNvbnNvbGUiLCJsb2ciLCJhY3RpY2UiLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDLElBREU7QUFFZEMsSUFBQUEsT0FBTyxFQUFDLElBRk07QUFFRDtBQUNiQyxJQUFBQSxLQUFLLEVBQUMsSUFIUSxDQUdIOztBQUhHLEdBSFA7QUFTTDtBQUVBQyxFQUFBQSxNQVhLLG9CQVdLO0FBQ1osU0FBS0gsS0FBTCxHQUFXLEtBQUtJLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS0osT0FBTCxHQUFhLEtBQUtHLElBQUwsQ0FBVUMsY0FBVixDQUF5QixTQUF6QixDQUFiO0FBQ0EsU0FBS0gsS0FBTCxHQUFXLEtBQUtFLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS0QsSUFBTCxDQUFVRSxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsR0FoQk87QUFrQkxDLEVBQUFBLEtBbEJLLG1CQWtCSSxDQUVSLENBcEJJO0FBcUJSQyxFQUFBQSxZQUFZLEVBQUMsd0JBQVU7QUFDdEJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS04sSUFBakI7QUFDQSxTQUFLQSxJQUFMLENBQVVPLE1BQVYsR0FBaUIsS0FBakI7QUFDQSxTQUFLUCxJQUFMLENBQVVRLElBQVYsQ0FBZSxnQkFBZixFQUFnQyxHQUFoQztBQUNBLEdBMUJPLENBMkJMOztBQTNCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0aXRsZTpudWxsLFxuXHRcdGNvbnRlbnQ6bnVsbCwvL+WGheWuuVxuXHRcdGJ0bk9rOm51bGwsLy/noa7orqTmjInpkq5cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge1xuXHRcdHRoaXMudGl0bGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZScpO1xuXHRcdHRoaXMuY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcblx0XHR0aGlzLmJ0bk9rPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnb2tCdG4nKTtcblx0XHR0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG5cdH0sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXHRoaWRkZW5NeXNlbGY6ZnVuY3Rpb24oKXtcblx0XHRjb25zb2xlLmxvZygneHh4Jyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5ub2RlKTtcblx0XHR0aGlzLm5vZGUuYWN0aWNlPWZhbHNlO1xuXHRcdHRoaXMubm9kZS5lbWl0KCdyb2xsLWRpY2UtZG9uZScsJzEnKTtcblx0fSxcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19