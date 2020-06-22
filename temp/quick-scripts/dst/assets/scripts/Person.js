
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
    isDead: 0,
    //是否已阵亡，0：活着，1：死了
    shield: 0,
    //可免疫一次伤害的护盾，0: 无, 1: 有
    halfShield: 0,
    //可减半一次伤害的护盾，可累积次数
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsImlzRGVhZCIsInNoaWVsZCIsImhhbGZTaGllbGQiLCJwYXJ0ZXIiLCJhdmF0YXIiLCJwb3NYIiwicG9zWSIsIm1vdmVCeVJvdXRlIiwicm91dGUiLCJwIiwidHdlZW4iLCJpIiwibGVuZ3RoIiwidG8iLCJ2MiIsIngiLCJ5Iiwic3RhcnQiLCJnZXRDb21wb25lbnQiLCJtYXB4IiwibWFweSIsInN0ZXBPbkNlbGwiLCJub2RlIiwibW92ZTJQb3MiLCJtYXBPYmoiLCJmaW5kIiwicG9zIiwibWFwIiwiZ2V0UG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsImJpbmRBdmF0YXIiLCJvbkxvYWQiLCJBcnJheSIsIndpbmRvdyIsInBlcnNvbnMiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJ1cGRhdGUiLCJkdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxNQUFNLEdBQUNDLE9BQU8sQ0FBQyxZQUFELENBQWxCOztBQUNBLElBQUlDLE1BQU0sR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaEIsYUFBU0QsRUFBRSxDQUFDRSxTQURJO0FBR2hCQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEsUUFBUSxFQUFFO0FBQ1QsaUJBQVEsSUFEQztBQUVUQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNoQixlQUFPLEtBQUtELFFBQVo7QUFDQTtBQUpRLEtB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QUNBLEdBaEVrQjtBQWlFbkJTLEVBQUFBLE1BakVtQixvQkFpRVg7QUFDUCxTQUFLckMsS0FBTCxHQUFXLElBQUlzQyxLQUFKLEVBQVg7QUFDQUMsSUFBQUEsTUFBTSxDQUFDckQsTUFBUCxDQUFjc0QsT0FBZCxDQUFzQkMsSUFBdEIsQ0FBMkIsS0FBS2IsSUFBaEM7QUFDQWMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS0MsSUFBTCxHQUFVLFFBQXRCO0FBQ0EsR0FyRWtCO0FBc0VoQnJCLEVBQUFBLEtBdEVnQixtQkFzRVAsQ0FDWDtBQUVHLEdBekVlO0FBMEVoQnNCLEVBQUFBLE1BMUVnQixrQkEwRVJDLEVBMUVRLEVBMEVKLENBR2Q7QUE3RWtCLENBQVQsQ0FBWCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbnZhciBnbG9iYWw9cmVxdWlyZSgnZ2xvYmFsR2FtZScpO1xudmFyIHBlcnNvbj1jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXHRcdG5pY2tuYW1lOiB7XG5cdFx0XHRkZWZhdWx0Om51bGwsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMubmlja25hbWU7XG5cdFx0XHR9LFxuXHRcdH1cdCxcblx0XHRJRDpudWxsLFxuXHRcdHBvc2l0aW9uOm51bGwsXG5cdFx0YXR0YWNrOjEsXG5cdFx0Ymxvb2Q6MTAsLy/njqnlrrbooYDph48s5Yid5aeL5Li6MueCue+8jOavj+WbnuWQiOaBouWkjTLngrlcblx0XHRtb2JpbGl0eToyLC8v546p5a626KGM5Yqo5YC8XG5cdFx0Y2FyZHM6bnVsbCxcblx0XHRteVN0YXR1czoxLC8vMOS4uuatu+S6oe+8jDHkuLrmraPluLhcblx0XHR0dXJuOjEsLy/njqnlrrblm57lkIjmlbBcblx0XHR1c2VDYXJkRW5hYmxlZDoxLC8v5piv5ZCm5L2/55So5Y2h54mM77yMMeS4uuWPr+S9v+eUqOWNoeeJjFxuXHRcdGdvRW5hYmxlZDp7XG5cdFx0XHRkZWZhdWx0OjEsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2dvRW5hYmxlZDtcblx0XHRcdH0sXG5cdFx0fSwvL+aYr+WQpuWPr+S7peihjOi1sCwx5Li65Y+v5Lul6KGM6LWwXG5cdFx0aXNEZWFkOjAsLy/mmK/lkKblt7LpmLXkuqHvvIww77ya5rS7552A77yMMe+8muatu+S6hlxuXHRcdHNoaWVsZDowLC8v5Y+v5YWN55ar5LiA5qyh5Lyk5a6z55qE5oqk55u+77yMMDog5pegLCAxOiDmnIlcblx0XHRoYWxmU2hpZWxkOjAsLy/lj6/lh4/ljYrkuIDmrKHkvKTlrrPnmoTmiqTnm77vvIzlj6/ntK/np6/mrKHmlbBcblx0XHRwYXJ0ZXI6bnVsbCxcblx0XHRhdmF0YXI6bnVsbCxcblx0XHRwb3NYOm51bGwsXG5cdFx0cG9zWTpudWxsLFxuICAgIH0sXG5cdG1vdmVCeVJvdXRlOmZ1bmN0aW9uKHJvdXRlKXtcblx0XHQvL+WjsOaYjuS4gOS4quWKqOS9nOW6j+WIl1xuXHRcdC8vdmFyIHI9W2NjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApXTtcblx0XHQvL3ZhciBhY3RBcnI9bmV3IEFycmF5KCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhyb3V0ZSk7XG5cdFx0dmFyIHA9Y2MudHdlZW4odGhpcy5hdmF0YXIpO1xuXHRcdGZvciAodmFyIGk9MDtpPHJvdXRlLmxlbmd0aDtpKyspe1xuXHRcdFx0cC50bygwLjEse3Bvc2l0aW9uOmNjLnYyKHJvdXRlW2ldLngscm91dGVbaV0ueSl9KTtcblx0XHRcdC8vY29uc29sZS5sb2cocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweCsnLCcrcm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XG5cdFx0fVxuXHRcdHAuc3RhcnQoKTtcblx0XHQvL3RoaXMuYXZhdGFyLnNldFBvc2l0aW9uKHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRQb3NpdGlvbigpKTtcblx0XHR0aGlzLnBvc1g9cm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHg7XG5cdFx0dGhpcy5wb3NZPXJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB5O1xuXHRcdFxuXHRcdHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5zdGVwT25DZWxsKHRoaXMubm9kZSk7XG5cdFxuXHR9LFxuXHRtb3ZlMlBvczpmdW5jdGlvbih4LHkpe1xuXHRcdHRoaXMucG9zWD14O1xuXHRcdHRoaXMucG9zWT15O1xuXHRcdC8vdGhpcy5ub3dQb3MueT15O1xuXHRcdHZhciBtYXBPYmo9Y2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XG5cdFx0dmFyIHBvcz1tYXBPYmoubWFwW3hdW3ldLmdldFBvc2l0aW9uKCk7XG5cdFx0dGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocG9zKTtcblx0XHQvL2NvbnNvbGUubG9nKHBvcyk7XG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLm5vd1Bvcyk7XG5cdH0sXG5cdGJpbmRBdmF0YXI6ZnVuY3Rpb24obm9kZSl7XG5cdFx0Ly9jb25zb2xlLmxvZyhub2RlKTtcblx0XHR0aGlzLmF2YXRhcj1ub2RlO1xuXHR9LFxuXHRvbkxvYWQoKXtcdFxuXHRcdHRoaXMuY2FyZHM9bmV3IEFycmF5KCk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zLnB1c2godGhpcy5ub2RlKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLm5hbWUrXCJvbkxvYWRcIik7XG5cdH0sXG4gICAgc3RhcnQgKCkge1xuXHRcdC8v5Yid5aeL5YyW5Lu75YqhXG5cdFx0XG4gICAgfSxcbiAgICB1cGRhdGUgKGR0KSB7XG5cdFx0XG5cdFx0XG5cdH0sXG59KTsiXX0=