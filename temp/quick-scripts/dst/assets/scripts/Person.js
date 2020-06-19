
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Person.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c0d9cFPtlNM8a1IZvSmjEWq', 'Person');
// scripts/Person.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var global = require('globalGame');

var person = cc.Class({
  "extends": cc.Component,
  properties: {
    nickname: {
      "default": null,
      get: function get() {
        return this.nickname;
      }
    },
    ID: null,
    position: null,
    attack: 1,
    blood: 10,
    //玩家血量,初始为2点，每回合恢复2点
    mobility: 2,
    //玩家行动值
    cards: null,
    myStatus: 1,
    //0为死亡，1为正常
    turn: 1,
    //玩家回合数
    useCardEnabled: 1,
    //是否使用卡牌，1为可使用卡牌
    goEnabled: {
      "default": 1,
      get: function get() {
        return this._goEnabled;
      }
    },
    //是否可以行走,1为可以行走
    parter: null,
    avatar: null,
    posX: null,
    posY: null
  },
  moveByRoute: function moveByRoute(route) {
    //声明一个动作序列
    //var r=[cc.v2(100,100),cc.v2(100,100),cc.v2(100,100),cc.v2(100,100)];
    //var actArr=new Array();
    //console.log(route);
    var p = cc.tween(this.avatar);

    for (var i = 0; i < route.length; i++) {
      p.to(0.1, {
        position: cc.v2(route[i].x, route[i].y)
      }); //console.log(route[i].getComponent('Cell').mapx+','+route[i].getComponent('Cell').mapy);
    }

    p.start(); //this.avatar.setPosition(route[route.length-1].getPosition());

    this.posX = route[route.length - 1].getComponent('Cell').mapx;
    this.posY = route[route.length - 1].getComponent('Cell').mapy;
    route[route.length - 1].getComponent('Cell').stepOnCell(this.node);
  },
  move2Pos: function move2Pos(x, y) {
    this.posX = x;
    this.posY = y; //this.nowPos.y=y;

    var mapObj = cc.find('Canvas/map').getComponent('GetMap');
    var pos = mapObj.map[x][y].getPosition();
    this.avatar.setPosition(pos); //console.log(pos);
    //console.log(this.nowPos);
  },
  bindAvatar: function bindAvatar(node) {
    //console.log(node);
    this.avatar = node;
  },
  onLoad: function onLoad() {
    this.cards = new Array();
    window.global.persons.push(this.node);
    console.log(this.name + "onLoad");
  },
  start: function start() {//初始化任务
  },
  update: function update(dt) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsInBhcnRlciIsImF2YXRhciIsInBvc1giLCJwb3NZIiwibW92ZUJ5Um91dGUiLCJyb3V0ZSIsInAiLCJ0d2VlbiIsImkiLCJsZW5ndGgiLCJ0byIsInYyIiwieCIsInkiLCJzdGFydCIsImdldENvbXBvbmVudCIsIm1hcHgiLCJtYXB5Iiwic3RlcE9uQ2VsbCIsIm5vZGUiLCJtb3ZlMlBvcyIsIm1hcE9iaiIsImZpbmQiLCJwb3MiLCJtYXAiLCJnZXRQb3NpdGlvbiIsInNldFBvc2l0aW9uIiwiYmluZEF2YXRhciIsIm9uTG9hZCIsIkFycmF5Iiwid2luZG93IiwicGVyc29ucyIsInB1c2giLCJjb25zb2xlIiwibG9nIiwibmFtZSIsInVwZGF0ZSIsImR0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLE1BQU0sR0FBQ0MsT0FBTyxDQUFDLFlBQUQsQ0FBbEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNoQixhQUFTRCxFQUFFLENBQUNFLFNBREk7QUFHaEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNkQyxJQUFBQSxRQUFRLEVBQUU7QUFDVCxpQkFBUSxJQURDO0FBRVRDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2hCLGVBQU8sS0FBS0QsUUFBWjtBQUNBO0FBSlEsS0FESTtBQU9kRSxJQUFBQSxFQUFFLEVBQUMsSUFQVztB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QUEyQixLQUFLYixJQUFoQztBQUNBYyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLQyxJQUFMLEdBQVUsUUFBdEI7QUFDQSxHQWxFa0I7QUFtRWhCckIsRUFBQUEsS0FuRWdCLG1CQW1FUCxDQUNYO0FBRUcsR0F0RWU7QUF1RWhCc0IsRUFBQUEsTUF2RWdCLGtCQXVFUkMsRUF2RVEsRUF1RUosQ0FHZDtBQTFFa0IsQ0FBVCxDQUFYIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxudmFyIGdsb2JhbD1yZXF1aXJlKCdnbG9iYWxHYW1lJyk7XG52YXIgcGVyc29uPWNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cdFx0bmlja25hbWU6IHtcblx0XHRcdGRlZmF1bHQ6bnVsbCxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5uaWNrbmFtZTtcblx0XHRcdH0sXG5cdFx0fVx0LFxuXHRcdElEOm51bGwsXG5cdFx0cG9zaXRpb246bnVsbCxcblx0XHRhdHRhY2s6MSxcblx0XHRibG9vZDoxMCwvL+eOqeWutuihgOmHjyzliJ3lp4vkuLoy54K577yM5q+P5Zue5ZCI5oGi5aSNMueCuVxuXHRcdG1vYmlsaXR5OjIsLy/njqnlrrbooYzliqjlgLxcblx0XHRjYXJkczpudWxsLFxuXHRcdG15U3RhdHVzOjEsLy8w5Li65q275Lqh77yMMeS4uuato+W4uFxuXHRcdHR1cm46MSwvL+eOqeWutuWbnuWQiOaVsFxuXHRcdHVzZUNhcmRFbmFibGVkOjEsLy/mmK/lkKbkvb/nlKjljaHniYzvvIwx5Li65Y+v5L2/55So5Y2h54mMXG5cdFx0Z29FbmFibGVkOntcblx0XHRcdGRlZmF1bHQ6MSxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZ29FbmFibGVkO1xuXHRcdFx0fSxcblx0XHR9LC8v5piv5ZCm5Y+v5Lul6KGM6LWwLDHkuLrlj6/ku6XooYzotbBcblx0XHRwYXJ0ZXI6bnVsbCxcblx0XHRhdmF0YXI6bnVsbCxcblx0XHRwb3NYOm51bGwsXG5cdFx0cG9zWTpudWxsLFxuICAgIH0sXG5cdG1vdmVCeVJvdXRlOmZ1bmN0aW9uKHJvdXRlKXtcblx0XHQvL+WjsOaYjuS4gOS4quWKqOS9nOW6j+WIl1xuXHRcdC8vdmFyIHI9W2NjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApXTtcblx0XHQvL3ZhciBhY3RBcnI9bmV3IEFycmF5KCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhyb3V0ZSk7XG5cdFx0dmFyIHA9Y2MudHdlZW4odGhpcy5hdmF0YXIpO1xuXHRcdGZvciAodmFyIGk9MDtpPHJvdXRlLmxlbmd0aDtpKyspe1xuXHRcdFx0cC50bygwLjEse3Bvc2l0aW9uOmNjLnYyKHJvdXRlW2ldLngscm91dGVbaV0ueSl9KTtcblx0XHRcdC8vY29uc29sZS5sb2cocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweCsnLCcrcm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XG5cdFx0fVxuXHRcdHAuc3RhcnQoKTtcblx0XHQvL3RoaXMuYXZhdGFyLnNldFBvc2l0aW9uKHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRQb3NpdGlvbigpKTtcblx0XHR0aGlzLnBvc1g9cm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHg7XG5cdFx0dGhpcy5wb3NZPXJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB5O1xuXHRcdFxuXHRcdHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5zdGVwT25DZWxsKHRoaXMubm9kZSk7XG5cdFxuXHR9LFxuXHRtb3ZlMlBvczpmdW5jdGlvbih4LHkpe1xuXHRcdHRoaXMucG9zWD14O1xuXHRcdHRoaXMucG9zWT15O1xuXHRcdC8vdGhpcy5ub3dQb3MueT15O1xuXHRcdHZhciBtYXBPYmo9Y2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XG5cdFx0dmFyIHBvcz1tYXBPYmoubWFwW3hdW3ldLmdldFBvc2l0aW9uKCk7XG5cdFx0dGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocG9zKTtcblx0XHQvL2NvbnNvbGUubG9nKHBvcyk7XG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLm5vd1Bvcyk7XG5cdH0sXG5cdGJpbmRBdmF0YXI6ZnVuY3Rpb24obm9kZSl7XG5cdFx0Ly9jb25zb2xlLmxvZyhub2RlKTtcblx0XHR0aGlzLmF2YXRhcj1ub2RlO1xuXHR9LFxuXHRvbkxvYWQoKXtcdFxuXHRcdHRoaXMuY2FyZHM9bmV3IEFycmF5KCk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zLnB1c2godGhpcy5ub2RlKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLm5hbWUrXCJvbkxvYWRcIik7XG5cdH0sXG4gICAgc3RhcnQgKCkge1xuXHRcdC8v5Yid5aeL5YyW5Lu75YqhXG5cdFx0XG4gICAgfSxcbiAgICB1cGRhdGUgKGR0KSB7XG5cdFx0XG5cdFx0XG5cdH0sXG59KTsiXX0=