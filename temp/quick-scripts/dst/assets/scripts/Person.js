
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
    //var p=cc.tween(this.avatar);
    for (var i = 0; i < route.length; i++) {//p.to(0.01,position:route[i].getPosition()});
      //console.log(route[i].getComponent('Cell').mapx+','+route[i].getComponent('Cell').mapy);
    }

    this.avatar.setPosition(route[route.length - 1].getPosition());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsInBhcnRlciIsImF2YXRhciIsInBvc1giLCJwb3NZIiwibW92ZUJ5Um91dGUiLCJyb3V0ZSIsImkiLCJsZW5ndGgiLCJzZXRQb3NpdGlvbiIsImdldFBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwibWFweCIsIm1hcHkiLCJzdGVwT25DZWxsIiwibm9kZSIsIm1vdmUyUG9zIiwieCIsInkiLCJtYXBPYmoiLCJmaW5kIiwicG9zIiwibWFwIiwiYmluZEF2YXRhciIsIm9uTG9hZCIsIkFycmF5Iiwid2luZG93IiwicGVyc29ucyIsInB1c2giLCJjb25zb2xlIiwibG9nIiwibmFtZSIsInN0YXJ0IiwidXBkYXRlIiwiZHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsTUFBTSxHQUFDQyxPQUFPLENBQUMsWUFBRCxDQUFsQjs7QUFDQSxJQUFJQyxNQUFNLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2hCLGFBQVNELEVBQUUsQ0FBQ0UsU0FESTtBQUdoQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ2RDLElBQUFBLFFBQVEsRUFBRTtBQUNULGlCQUFRLElBREM7QUFFVEMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDaEIsZUFBTyxLQUFLRCxRQUFaO0FBQ0E7QUFKUSxLQURJO0FBT2RFLElBQUFBLEVBQUUsRUFBQyxJQVBXO0FBUWRDLElBQUFBLFFBQVEsRUFBQyxJ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IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG52YXIgZ2xvYmFsPXJlcXVpcmUoJ2dsb2JhbEdhbWUnKTtcclxudmFyIHBlcnNvbj1jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cdFx0bmlja25hbWU6IHtcclxuXHRcdFx0ZGVmYXVsdDpudWxsLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5uaWNrbmFtZTtcclxuXHRcdFx0fSxcclxuXHRcdH1cdCxcclxuXHRcdElEOm51bGwsXHJcblx0XHRwb3NpdGlvbjpudWxsLFxyXG5cdFx0YXR0YWNrOjEsXHJcblx0XHRibG9vZDoxMCwvL+eOqeWutuihgOmHjyzliJ3lp4vkuLoy54K577yM5q+P5Zue5ZCI5oGi5aSNMueCuVxyXG5cdFx0bW9iaWxpdHk6MiwvL+eOqeWutuihjOWKqOWAvFxyXG5cdFx0Y2FyZHM6bnVsbCxcclxuXHRcdG15U3RhdHVzOjEsLy8w5Li65q275Lqh77yMMeS4uuato+W4uFxyXG5cdFx0dHVybjoxLC8v546p5a625Zue5ZCI5pWwXHJcblx0XHR1c2VDYXJkRW5hYmxlZDoxLC8v5piv5ZCm5L2/55So5Y2h54mM77yMMeS4uuWPr+S9v+eUqOWNoeeJjFxyXG5cdFx0Z29FbmFibGVkOntcclxuXHRcdFx0ZGVmYXVsdDoxLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZ29FbmFibGVkO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSwvL+aYr+WQpuWPr+S7peihjOi1sCwx5Li65Y+v5Lul6KGM6LWwXHJcblx0XHRwYXJ0ZXI6bnVsbCxcclxuXHRcdGF2YXRhcjpudWxsLFxyXG5cdFx0cG9zWDpudWxsLFxyXG5cdFx0cG9zWTpudWxsLFxyXG4gICAgfSxcclxuXHRtb3ZlQnlSb3V0ZTpmdW5jdGlvbihyb3V0ZSl7XHJcblx0XHQvL+WjsOaYjuS4gOS4quWKqOS9nOW6j+WIl1xyXG5cdFx0Ly92YXIgcj1bY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCldO1xyXG5cdFx0Ly92YXIgYWN0QXJyPW5ldyBBcnJheSgpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhyb3V0ZSk7XHJcblx0XHQvL3ZhciBwPWNjLnR3ZWVuKHRoaXMuYXZhdGFyKTtcclxuXHRcdGZvciAodmFyIGk9MDtpPHJvdXRlLmxlbmd0aDtpKyspe1xyXG5cdFx0XHQvL3AudG8oMC4wMSxwb3NpdGlvbjpyb3V0ZVtpXS5nZXRQb3NpdGlvbigpfSk7XHJcblx0XHRcdC8vY29uc29sZS5sb2cocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweCsnLCcrcm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmF2YXRhci5zZXRQb3NpdGlvbihyb3V0ZVtyb3V0ZS5sZW5ndGgtMV0uZ2V0UG9zaXRpb24oKSk7XHJcblx0XHR0aGlzLnBvc1g9cm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHg7XHJcblx0XHR0aGlzLnBvc1k9cm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHk7XHJcblx0XHRcclxuXHRcdHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5zdGVwT25DZWxsKHRoaXMubm9kZSk7XHJcblx0XHJcblx0fSxcclxuXHRtb3ZlMlBvczpmdW5jdGlvbih4LHkpe1xyXG5cdFx0dGhpcy5wb3NYPXg7XHJcblx0XHR0aGlzLnBvc1k9eTtcclxuXHRcdC8vdGhpcy5ub3dQb3MueT15O1xyXG5cdFx0dmFyIG1hcE9iaj1jYy5maW5kKCdDYW52YXMvbWFwJykuZ2V0Q29tcG9uZW50KCdHZXRNYXAnKTtcclxuXHRcdHZhciBwb3M9bWFwT2JqLm1hcFt4XVt5XS5nZXRQb3NpdGlvbigpO1xyXG5cdFx0dGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocG9zKTtcclxuXHRcdC8vY29uc29sZS5sb2cocG9zKTtcclxuXHRcdC8vY29uc29sZS5sb2codGhpcy5ub3dQb3MpO1xyXG5cdH0sXHJcblx0YmluZEF2YXRhcjpmdW5jdGlvbihub2RlKXtcclxuXHRcdC8vY29uc29sZS5sb2cobm9kZSk7XHJcblx0XHR0aGlzLmF2YXRhcj1ub2RlO1xyXG5cdH0sXHJcblx0b25Mb2FkKCl7XHRcclxuXHRcdHRoaXMuY2FyZHM9bmV3IEFycmF5KCk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnMucHVzaCh0aGlzLm5vZGUpO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5uYW1lK1wib25Mb2FkXCIpO1xyXG5cdH0sXHJcbiAgICBzdGFydCAoKSB7XHJcblx0XHQvL+WIneWni+WMluS7u+WKoVxyXG5cdFx0XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cdFx0XHJcblx0XHRcclxuXHR9LFxyXG59KTsiXX0=