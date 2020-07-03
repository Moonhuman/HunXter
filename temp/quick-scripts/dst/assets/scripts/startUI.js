
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
    cc.game.end();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhcnRVSS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0R2FtZUJ0biIsImV4aXRHYW1lQnRuIiwib25Mb2FkIiwiZmluZCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsInN0YXJ0R2FtZSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZXhpdEdhbWUiLCJnYW1lIiwiZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDVEMsSUFBQUEsWUFBWSxFQUFDLElBREo7QUFFWkMsSUFBQUEsV0FBVyxFQUFDO0FBRkEsR0FIUDtBQU9SQyxFQUFBQSxNQVBRLG9CQU9BO0FBQ1AsU0FBS0YsWUFBTCxHQUFrQkosRUFBRSxDQUFDTyxJQUFILENBQVEsa0JBQVIsQ0FBbEI7QUFDQSxTQUFLRixXQUFMLEdBQWlCTCxFQUFFLENBQUNPLElBQUgsQ0FBUSxnQkFBUixDQUFqQjtBQUNBQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLTCxZQUFqQjtBQUNBLEdBWE87QUFZTE0sRUFBQUEsS0FaSyxtQkFZSSxDQUVSLENBZEk7QUFlUkMsRUFBQUEsU0FBUyxFQUFDLHFCQUFVO0FBQ25CSCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FULElBQUFBLEVBQUUsQ0FBQ1ksUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0EsR0FsQk87QUFtQlJDLEVBQUFBLFFBQVEsRUFBQyxvQkFBVTtBQUNsQmQsSUFBQUEsRUFBRSxDQUFDZSxJQUFILENBQVFDLEdBQVI7QUFDQVIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBLEdBdEJPLENBdUJMOztBQXZCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgIHN0YXJ0R2FtZUJ0bjpudWxsLFxuXHQgICBleGl0R2FtZUJ0bjpudWxsLFxuICAgIH0sXG5cdG9uTG9hZCgpe1xuXHRcdHRoaXMuc3RhcnRHYW1lQnRuPWNjLmZpbmQoJ0NhbnZhcy9zdGFydEdhbWUnKTtcblx0XHR0aGlzLmV4aXRHYW1lQnRuPWNjLmZpbmQoJ0NhbnZhcy9leGl0QnRuJyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5zdGFydEdhbWVCdG4pO1xuXHR9LFxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cdHN0YXJ0R2FtZTpmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCflvIDlp4vmuLjmiI8nKTtcblx0XHRjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xuXHR9LFxuXHRleGl0R2FtZTpmdW5jdGlvbigpe1xuXHRcdGNjLmdhbWUuZW5kKCk7XG5cdFx0Y29uc29sZS5sb2coJ+mAgOWHuua4uOaIjycpO1xuXHR9LFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=