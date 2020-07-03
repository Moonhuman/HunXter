
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
    btnOk: null,
    //确认按钮
    framesIndex: null,
    count: 0,
    callback: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.title = this.node.getChildByName('title');
    this.content = this.node.getChildByName('content');
    this.btnOk = this.node.getChildByName('okBtn');
    this.node.active = false;
    this.framesIndex = this.node.getChildByName('dice').getComponent('SpriteIndex');
  },
  start: function start() {},
  hiddenMyself: function hiddenMyself() {
    this.node.active = false;
    cc.game.emit('roll-dice-done', this.framesIndex.index + 1);
  },
  startRollDice: function startRollDice() {
    this.node.active = true;
    this.framesIndex.schedule(function () {
      this.next();
    }, 0.05, 20, 0);
  } //update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGlwV2luZG93LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGl0bGUiLCJjb250ZW50IiwiYnRuT2siLCJmcmFtZXNJbmRleCIsImNvdW50IiwiY2FsbGJhY2siLCJvbkxvYWQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJnZXRDb21wb25lbnQiLCJzdGFydCIsImhpZGRlbk15c2VsZiIsImdhbWUiLCJlbWl0IiwiaW5kZXgiLCJzdGFydFJvbGxEaWNlIiwic2NoZWR1bGUiLCJuZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDLElBREU7QUFFZEMsSUFBQUEsT0FBTyxFQUFDLElBRk07QUFFRDtBQUNiQyxJQUFBQSxLQUFLLEVBQUMsSUFIUTtBQUdIO0FBQ1hDLElBQUFBLFdBQVcsRUFBQyxJQUpFO0FBS2RDLElBQUFBLEtBQUssRUFBQyxDQUxRO0FBTWRDLElBQUFBLFFBQVEsRUFBQztBQU5LLEdBSFA7QUFZTDtBQUVBQyxFQUFBQSxNQWRLLG9CQWNLO0FBQ1osU0FBS04sS0FBTCxHQUFXLEtBQUtPLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS1AsT0FBTCxHQUFhLEtBQUtNLElBQUwsQ0FBVUMsY0FBVixDQUF5QixTQUF6QixDQUFiO0FBQ0EsU0FBS04sS0FBTCxHQUFXLEtBQUtLLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS0QsSUFBTCxDQUFVRSxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS04sV0FBTCxHQUFpQixLQUFLSSxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsTUFBekIsRUFBaUNFLFlBQWpDLENBQThDLGFBQTlDLENBQWpCO0FBRUEsR0FyQk87QUF1QkxDLEVBQUFBLEtBdkJLLG1CQXVCSSxDQUdSLENBMUJJO0FBMkJSQyxFQUFBQSxZQUFZLEVBQUMsd0JBQVU7QUFFdEIsU0FBS0wsSUFBTCxDQUFVRSxNQUFWLEdBQWlCLEtBQWpCO0FBQ0FiLElBQUFBLEVBQUUsQ0FBQ2lCLElBQUgsQ0FBUUMsSUFBUixDQUFhLGdCQUFiLEVBQThCLEtBQUtYLFdBQUwsQ0FBaUJZLEtBQWpCLEdBQXVCLENBQXJEO0FBQ0EsR0EvQk87QUFnQ1JDLEVBQUFBLGFBQWEsRUFBRSx5QkFBVTtBQUN2QixTQUFLVCxJQUFMLENBQVVFLE1BQVYsR0FBa0IsSUFBbEI7QUFDQSxTQUFLTixXQUFMLENBQWlCYyxRQUFqQixDQUEwQixZQUFVO0FBQ2xDLFdBQUtDLElBQUw7QUFDRCxLQUZELEVBRUUsSUFGRixFQUVPLEVBRlAsRUFFVSxDQUZWO0FBR0QsR0FyQ08sQ0FzQ0w7O0FBdENLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRpdGxlOm51bGwsXG5cdFx0Y29udGVudDpudWxsLC8v5YaF5a65XG5cdFx0YnRuT2s6bnVsbCwvL+ehruiupOaMiemSrlxuXHRcdGZyYW1lc0luZGV4Om51bGwsXG5cdFx0Y291bnQ6MCxcblx0XHRjYWxsYmFjazpudWxsLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG5cdFx0dGhpcy50aXRsZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlJyk7XG5cdFx0dGhpcy5jb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuXHRcdHRoaXMuYnRuT2s9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdva0J0bicpO1xuXHRcdHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcblx0XHR0aGlzLmZyYW1lc0luZGV4PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGljZScpLmdldENvbXBvbmVudCgnU3ByaXRlSW5kZXgnKTtcblx0XHRcblx0fSxcblxuICAgIHN0YXJ0ICgpIHtcblx0XHRcblx0XHRcbiAgICB9LFxuXHRoaWRkZW5NeXNlbGY6ZnVuY3Rpb24oKXtcblx0XHRcblx0XHR0aGlzLm5vZGUuYWN0aXZlPWZhbHNlO1xuXHRcdGNjLmdhbWUuZW1pdCgncm9sbC1kaWNlLWRvbmUnLHRoaXMuZnJhbWVzSW5kZXguaW5kZXgrMSk7XG5cdH0sXG5cdHN0YXJ0Um9sbERpY2U6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLm5vZGUuYWN0aXZlID10cnVlO1xuXHRcdFx0dGhpcy5mcmFtZXNJbmRleC5zY2hlZHVsZShmdW5jdGlvbigpe1xuXHRcdFx0XHQgdGhpcy5uZXh0KCk7XG5cdFx0XHR9LDAuMDUsMjAsMCk7XG5cdH0sXG4gICAgLy91cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19