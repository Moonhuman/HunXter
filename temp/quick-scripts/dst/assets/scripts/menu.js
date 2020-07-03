
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/menu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3ac81N74zlKwIKuvuctajnt', 'menu');
// scripts/menu.js

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
    music: cc.AudioSource,
    slider: cc.Slider
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.active = false; //获取这个Slider的Progress,且调用方法传入参数
    //其实就是初始加载声音大小

    this.slider.progress = 0.5;

    this._updateMusicVolume(this.slider.progress);
  },
  _updateMusicVolume: function _updateMusicVolume(progress) {
    this.music.volume = progress;
  },
  //在Slider组件里回调这个函数
  onSliderHEvent: function onSliderHEvent(sender, eventType) {
    console.log(sender.progress);

    this._updateMusicVolume(sender.progress);
  },
  start: function start() {},
  exitGame: function exitGame() {
    cc.game.end();
  },
  backMainView: function backMainView() {
    //cc.game.end();
    cc.director.loadScene("开始界面");
  },
  music: function music() {},
  game: function game() {
    this.node.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWVudS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm11c2ljIiwiQXVkaW9Tb3VyY2UiLCJzbGlkZXIiLCJTbGlkZXIiLCJvbkxvYWQiLCJub2RlIiwiYWN0aXZlIiwicHJvZ3Jlc3MiLCJfdXBkYXRlTXVzaWNWb2x1bWUiLCJ2b2x1bWUiLCJvblNsaWRlckhFdmVudCIsInNlbmRlciIsImV2ZW50VHlwZSIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsImV4aXRHYW1lIiwiZ2FtZSIsImVuZCIsImJhY2tNYWluVmlldyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDVEMsSUFBQUEsS0FBSyxFQUFDSixFQUFFLENBQUNLLFdBREE7QUFFWkMsSUFBQUEsTUFBTSxFQUFDTixFQUFFLENBQUNPO0FBRkUsR0FIUDtBQVFMO0FBRUFDLEVBQUFBLE1BVkssb0JBVUs7QUFDWixTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBaUIsS0FBakIsQ0FEWSxDQUVYO0FBQ0Q7O0FBQ00sU0FBS0osTUFBTCxDQUFZSyxRQUFaLEdBQXVCLEdBQXZCOztBQUNBLFNBQUtDLGtCQUFMLENBQXdCLEtBQUtOLE1BQUwsQ0FBWUssUUFBcEM7QUFDTixHQWhCTztBQWlCUkMsRUFBQUEsa0JBakJRLDhCQWlCWUQsUUFqQlosRUFpQnNCO0FBQ3ZCLFNBQUtQLEtBQUwsQ0FBV1MsTUFBWCxHQUFvQkYsUUFBcEI7QUFDSCxHQW5CSTtBQW9CUjtBQUNHRyxFQUFBQSxjQXJCSywwQkFxQldDLE1BckJYLEVBcUJtQkMsU0FyQm5CLEVBcUI4QjtBQUNyQ0MsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILE1BQU0sQ0FBQ0osUUFBbkI7O0FBQ00sU0FBS0Msa0JBQUwsQ0FBd0JHLE1BQU0sQ0FBQ0osUUFBL0I7QUFDSCxHQXhCSTtBQTBCTFEsRUFBQUEsS0ExQkssbUJBMEJJLENBRVIsQ0E1Qkk7QUE2QlJDLEVBQUFBLFFBQVEsRUFBQyxvQkFBVTtBQUNsQnBCLElBQUFBLEVBQUUsQ0FBQ3FCLElBQUgsQ0FBUUMsR0FBUjtBQUNBLEdBL0JPO0FBZ0NSQyxFQUFBQSxZQUFZLEVBQUMsd0JBQVU7QUFDdEI7QUFDQXZCLElBQUFBLEVBQUUsQ0FBQ3dCLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixNQUF0QjtBQUVBLEdBcENPO0FBcUNSckIsRUFBQUEsS0FBSyxFQUFDLGlCQUFVLENBRWYsQ0F2Q087QUF3Q1JpQixFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDZCxTQUFLWixJQUFMLENBQVVDLE1BQVYsR0FBaUIsS0FBakI7QUFDQSxHQTFDTyxDQTJDTDs7QUEzQ0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgbXVzaWM6Y2MuQXVkaW9Tb3VyY2UsXHJcblx0ICAgc2xpZGVyOmNjLlNsaWRlcixcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuXHRcdHRoaXMubm9kZS5hY3RpdmU9ZmFsc2U7XHJcblx0XHQgLy/ojrflj5bov5nkuKpTbGlkZXLnmoRQcm9ncmVzcyzkuJTosIPnlKjmlrnms5XkvKDlhaXlj4LmlbBcclxuXHRcdC8v5YW25a6e5bCx5piv5Yid5aeL5Yqg6L295aOw6Z+z5aSn5bCPXHJcbiAgICAgICAgdGhpcy5zbGlkZXIucHJvZ3Jlc3MgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTXVzaWNWb2x1bWUodGhpcy5zbGlkZXIucHJvZ3Jlc3MpO1xyXG5cdH0sXHJcblx0X3VwZGF0ZU11c2ljVm9sdW1lIChwcm9ncmVzcykge1xyXG4gICAgICAgIHRoaXMubXVzaWMudm9sdW1lID0gcHJvZ3Jlc3M7XHJcbiAgICB9LFxyXG5cdC8v5ZyoU2xpZGVy57uE5Lu26YeM5Zue6LCD6L+Z5Liq5Ye95pWwXHJcbiAgICBvblNsaWRlckhFdmVudCAoc2VuZGVyLCBldmVudFR5cGUpIHtcclxuXHRcdGNvbnNvbGUubG9nKHNlbmRlci5wcm9ncmVzcyk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTXVzaWNWb2x1bWUoc2VuZGVyLnByb2dyZXNzKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblx0ZXhpdEdhbWU6ZnVuY3Rpb24oKXtcclxuXHRcdGNjLmdhbWUuZW5kKCk7XHJcblx0fSxcclxuXHRiYWNrTWFpblZpZXc6ZnVuY3Rpb24oKXtcclxuXHRcdC8vY2MuZ2FtZS5lbmQoKTtcclxuXHRcdGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIuW8gOWni+eVjOmdolwiKTtcclxuXHRcdFxyXG5cdH0sXHJcblx0bXVzaWM6ZnVuY3Rpb24oKXtcclxuXHRcdFxyXG5cdH0sXHJcblx0Z2FtZTpmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuXHR9LFxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=