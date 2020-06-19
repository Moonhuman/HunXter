
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/startUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e9de4KsUm5PGpvP6NWEjcA6', 'startUI');
// scripts/startUI.js

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
    startGameBtn: null,
    exitGameBtn: null
  },
  onLoad: function onLoad() {
    this.startGameBtn = cc.find('Canvas/startGame');
    this.exitGameBtn = cc.find('Canvas/exitBtn');
    console.log(this.startGameBtn);
  },
  start: function start() {},
  startGame: function startGame() {
    console.log('开始游戏');
    cc.director.loadScene("game");
  },
  exitGame: function exitGame() {
    console.log('退出游戏');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhcnRVSS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0R2FtZUJ0biIsImV4aXRHYW1lQnRuIiwib25Mb2FkIiwiZmluZCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsInN0YXJ0R2FtZSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZXhpdEdhbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNUQyxJQUFBQSxZQUFZLEVBQUMsSUFESjtBQUVaQyxJQUFBQSxXQUFXLEVBQUM7QUFGQSxHQUhQO0FBT1JDLEVBQUFBLE1BUFEsb0JBT0E7QUFDUCxTQUFLRixZQUFMLEdBQWtCSixFQUFFLENBQUNPLElBQUgsQ0FBUSxrQkFBUixDQUFsQjtBQUNBLFNBQUtGLFdBQUwsR0FBaUJMLEVBQUUsQ0FBQ08sSUFBSCxDQUFRLGdCQUFSLENBQWpCO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtMLFlBQWpCO0FBQ0EsR0FYTztBQVlMTSxFQUFBQSxLQVpLLG1CQVlJLENBRVIsQ0FkSTtBQWVSQyxFQUFBQSxTQUFTLEVBQUMscUJBQVU7QUFDbkJILElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQVQsSUFBQUEsRUFBRSxDQUFDWSxRQUFILENBQVlDLFNBQVosQ0FBc0IsTUFBdEI7QUFDQSxHQWxCTztBQW1CUkMsRUFBQUEsUUFBUSxFQUFDLG9CQUFVO0FBQ2xCTixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsR0FyQk8sQ0FzQkw7O0FBdEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgc3RhcnRHYW1lQnRuOm51bGwsXG5cdCAgIGV4aXRHYW1lQnRuOm51bGwsXG4gICAgfSxcblx0b25Mb2FkKCl7XG5cdFx0dGhpcy5zdGFydEdhbWVCdG49Y2MuZmluZCgnQ2FudmFzL3N0YXJ0R2FtZScpO1xuXHRcdHRoaXMuZXhpdEdhbWVCdG49Y2MuZmluZCgnQ2FudmFzL2V4aXRCdG4nKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnN0YXJ0R2FtZUJ0bik7XG5cdH0sXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblx0c3RhcnRHYW1lOmZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ+W8gOWni+a4uOaIjycpO1xuXHRcdGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImdhbWVcIik7XG5cdH0sXG5cdGV4aXRHYW1lOmZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ+mAgOWHuua4uOaIjycpO1xuXHR9LFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=