
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGlwV2luZG93LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGl0bGUiLCJjb250ZW50IiwiYnRuT2siLCJvbkxvYWQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJzdGFydCIsImhpZGRlbk15c2VsZiIsImNvbnNvbGUiLCJsb2ciLCJhY3RpY2UiLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDLElBREU7QUFFZEMsSUFBQUEsT0FBTyxFQUFDLElBRk07QUFFRDtBQUNiQyxJQUFBQSxLQUFLLEVBQUMsSUFIUSxDQUdIOztBQUhHLEdBSFA7QUFTTDtBQUVBQyxFQUFBQSxNQVhLLG9CQVdLO0FBQ1osU0FBS0gsS0FBTCxHQUFXLEtBQUtJLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS0osT0FBTCxHQUFhLEtBQUtHLElBQUwsQ0FBVUMsY0FBVixDQUF5QixTQUF6QixDQUFiO0FBQ0EsU0FBS0gsS0FBTCxHQUFXLEtBQUtFLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS0QsSUFBTCxDQUFVRSxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsR0FoQk87QUFrQkxDLEVBQUFBLEtBbEJLLG1CQWtCSSxDQUVSLENBcEJJO0FBcUJSQyxFQUFBQSxZQUFZLEVBQUMsd0JBQVU7QUFDdEJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS04sSUFBakI7QUFDQSxTQUFLQSxJQUFMLENBQVVPLE1BQVYsR0FBaUIsS0FBakI7QUFDQSxTQUFLUCxJQUFMLENBQVVRLElBQVYsQ0FBZSxnQkFBZixFQUFnQyxHQUFoQztBQUNBLEdBMUJPLENBMkJMOztBQTNCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdGl0bGU6bnVsbCxcclxuXHRcdGNvbnRlbnQ6bnVsbCwvL+WGheWuuVxyXG5cdFx0YnRuT2s6bnVsbCwvL+ehruiupOaMiemSrlxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cdFx0dGhpcy50aXRsZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlJyk7XHJcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XHJcblx0XHR0aGlzLmJ0bk9rPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnb2tCdG4nKTtcclxuXHRcdHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cdGhpZGRlbk15c2VsZjpmdW5jdGlvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coJ3h4eCcpO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5ub2RlKTtcclxuXHRcdHRoaXMubm9kZS5hY3RpY2U9ZmFsc2U7XHJcblx0XHR0aGlzLm5vZGUuZW1pdCgncm9sbC1kaWNlLWRvbmUnLCcxJyk7XHJcblx0fSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19