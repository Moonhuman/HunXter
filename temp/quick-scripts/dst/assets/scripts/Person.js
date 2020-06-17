
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
      //p.to(0.01,position:route[i].getPosition()});
      console.log(route[i].getComponent('Cell').mapx + ',' + route[i].getComponent('Cell').mapy);
    }

    this.avatar.setPosition(route[route.length - 1].getPosition());
    this.posX = route[route.length - 1].getComponent('Cell').mapx;
    this.posY = route[route.length - 1].getComponent('Cell').mapy; //p.start();
    //console.log(actArr);
    //var seq = cc.sequence(actArr);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsInBhcnRlciIsImF2YXRhciIsInBvc1giLCJwb3NZIiwibW92ZUJ5Um91dGUiLCJyb3V0ZSIsInAiLCJ0d2VlbiIsImkiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiZ2V0Q29tcG9uZW50IiwibWFweCIsIm1hcHkiLCJzZXRQb3NpdGlvbiIsImdldFBvc2l0aW9uIiwibW92ZTJQb3MiLCJ4IiwieSIsIm1hcE9iaiIsImZpbmQiLCJwb3MiLCJtYXAiLCJiaW5kQXZhdGFyIiwibm9kZSIsIm9uTG9hZCIsIndpbmRvdyIsInBlcnNvbnMiLCJwdXNoIiwibmFtZSIsInN0YXJ0IiwidXBkYXRlIiwiZHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsTUFBTSxHQUFDQyxPQUFPLENBQUMsWUFBRCxDQUFsQjs7QUFDQSxJQUFJQyxNQUFNLEdBQUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2hCLGFBQVNELEVBQUUsQ0FBQ0UsU0FESTtBQUdoQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ2RDLElBQUFBLFFBQVEsRUFBRTtBQUNULGlCQUFRLElBREM7QUFFVEMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDaEIsZUFBTyxLQUFLRCxRQUFaO0FBQ0E7QUFKUSxLQURJO0FBT2RFLElBQUFBLEVBQUUsRUFBQyxJQVBXO0FBUWRDLElBQUFBLFFBQVEsRUFBQyxJQVJLO0FBU2RDLElBQUFBLE1BQU0sRUFBQyxDQVRPO0FBVWRDLElBQUFBLEtBQUssRUFBQyxFQVZRO0FBVUw7QUFDVEMsSUFBQUEsUUFBUSxFQUFDLENBWEs7QUFXSDtBQUNYQyxJQUFBQSxLQUFLLEVBQUMsSUFaUTtBQWFkQyxJQUFBQSxRQUFRLEVBQUMsQ0FiSztBQWFIO0FBQ1hDLElBQUFBLElBQUksRUFBQyxDQWRTO0FBY1A7QUFDUEMsSUFBQUEsY0FBYyxFQUFDLENBZkQ7QUFlRztBQUNqQkMsSUFBQUEsU0FBUyxFQUFDO0FBQ1QsaUJBQVEsQ0FEQztBQUVUVixNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNoQixlQUFPLEtBQUtXLFVBQVo7QUFDQTtBQUpRLEtBaEJJO0FBcUJaO0FBQ0ZDLElBQUFBLE1BQU0sRUFBQyxJQXRCTztBQXVCZEMsSUFBQUEsTUFBTSxFQUFDLElBdkJPO0FBd0JkQyxJQUFBQSxJQUFJLEVBQUMsSUF4QlM7QUF5QmRDLElBQUFBLElBQUksRUFBQztBQXpCUyxHQUhJO0FBOEJuQkMsRUFBQUEsV0FBVyxFQUFDLHFCQUFTQyxLQUFULEVBQWU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFJQyxDQUFDLEdBQUN2QixFQUFFLENBQUN3QixLQUFILENBQVMsS0FBS04sTUFBZCxDQUFOOztBQUNBLFNBQUssSUFBSU8sQ0FBQyxHQUFDLENBQVgsRUFBYUEsQ0FBQyxHQUFDSCxLQUFLLENBQUNJLE1BQXJCLEVBQTRCRCxDQUFDLEVBQTdCLEVBQWdDO0FBQy9CO0FBQ0FFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTixLQUFLLENBQUNHLENBQUQsQ0FBTCxDQUFTSSxZQUFULENBQXNCLE1BQXRCLEVBQThCQyxJQUE5QixHQUFtQyxHQUFuQyxHQUF1Q1IsS0FBSyxDQUFDRyxDQUFELENBQUwsQ0FBU0ksWUFBVCxDQUFzQixNQUF0QixFQUE4QkUsSUFBakY7QUFDQTs7QUFDRCxTQUFLYixNQUFMLENBQVljLFdBQVosQ0FBd0JWLEtBQUssQ0FBQ0EsS0FBSyxDQUFDSSxNQUFOLEdBQWEsQ0FBZCxDQUFMLENBQXNCTyxXQUF0QixFQUF4QjtBQUNBLFNBQUtkLElBQUwsR0FBVUcsS0FBSyxDQUFDQSxLQUFLLENBQUNJLE1BQU4sR0FBYSxDQUFkLENBQUwsQ0FBc0JHLFlBQXRCLENBQW1DLE1BQW5DLEVBQTJDQyxJQUFyRDtBQUNBLFNBQUtWLElBQUwsR0FBVUUsS0FBSyxDQUFDQSxLQUFLLENBQUNJLE1BQU4sR0FBYSxDQUFkLENBQUwsQ0FBc0JHLFlBQXRCLENBQW1DLE1BQW5DLEVBQTJDRSxJQUFyRCxDQVowQixDQWExQjtBQUNBO0FBQ0E7QUFHQSxHQWhEa0I7QUFpRG5CRyxFQUFBQSxRQUFRLEVBQUMsa0JBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQ3JCLFNBQUtqQixJQUFMLEdBQVVnQixDQUFWO0FBQ0EsU0FBS2YsSUFBTCxHQUFVZ0IsQ0FBVixDQUZxQixDQUdyQjs7QUFDQSxRQUFJQyxNQUFNLEdBQUNyQyxFQUFFLENBQUNzQyxJQUFILENBQVEsWUFBUixFQUFzQlQsWUFBdEIsQ0FBbUMsUUFBbkMsQ0FBWDtBQUNBLFFBQUlVLEdBQUcsR0FBQ0YsTUFBTSxDQUFDRyxHQUFQLENBQVdMLENBQVgsRUFBY0MsQ0FBZCxFQUFpQkgsV0FBakIsRUFBUjtBQUNBLFNBQUtmLE1BQUwsQ0FBWWMsV0FBWixDQUF3Qk8sR0FBeEIsRUFOcUIsQ0FPckI7QUFDQTtBQUNBLEdBMURrQjtBQTJEbkJFLEVBQUFBLFVBQVUsRUFBQyxvQkFBU0MsSUFBVCxFQUFjO0FBQ3hCO0FBQ0EsU0FBS3hCLE1BQUwsR0FBWXdCLElBQVo7QUFDQSxHQTlEa0I7QUErRG5CQyxFQUFBQSxNQS9EbUIsb0JBK0RYO0FBQ1BDLElBQUFBLE1BQU0sQ0FBQy9DLE1BQVAsQ0FBY2dELE9BQWQsQ0FBc0JDLElBQXRCLENBQTJCLEtBQUtKLElBQWhDO0FBQ0FmLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUttQixJQUFMLEdBQVUsUUFBdEI7QUFDQSxHQWxFa0I7QUFtRWhCQyxFQUFBQSxLQW5FZ0IsbUJBbUVQLENBQ1g7QUFFRyxHQXRFZTtBQXVFaEJDLEVBQUFBLE1BdkVnQixrQkF1RVJDLEVBdkVRLEVBdUVKLENBR2Q7QUExRWtCLENBQVQsQ0FBWCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbnZhciBnbG9iYWw9cmVxdWlyZSgnZ2xvYmFsR2FtZScpO1xyXG52YXIgcGVyc29uPWNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblx0XHRuaWNrbmFtZToge1xyXG5cdFx0XHRkZWZhdWx0Om51bGwsXHJcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLm5pY2tuYW1lO1xyXG5cdFx0XHR9LFxyXG5cdFx0fVx0LFxyXG5cdFx0SUQ6bnVsbCxcclxuXHRcdHBvc2l0aW9uOm51bGwsXHJcblx0XHRhdHRhY2s6MSxcclxuXHRcdGJsb29kOjEwLC8v546p5a626KGA6YePLOWIneWni+S4ujLngrnvvIzmr4/lm57lkIjmgaLlpI0y54K5XHJcblx0XHRtb2JpbGl0eToyLC8v546p5a626KGM5Yqo5YC8XHJcblx0XHRjYXJkczpudWxsLFxyXG5cdFx0bXlTdGF0dXM6MSwvLzDkuLrmrbvkuqHvvIwx5Li65q2j5bi4XHJcblx0XHR0dXJuOjEsLy/njqnlrrblm57lkIjmlbBcclxuXHRcdHVzZUNhcmRFbmFibGVkOjEsLy/mmK/lkKbkvb/nlKjljaHniYzvvIwx5Li65Y+v5L2/55So5Y2h54mMXHJcblx0XHRnb0VuYWJsZWQ6e1xyXG5cdFx0XHRkZWZhdWx0OjEsXHJcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLl9nb0VuYWJsZWQ7XHJcblx0XHRcdH0sXHJcblx0XHR9LC8v5piv5ZCm5Y+v5Lul6KGM6LWwLDHkuLrlj6/ku6XooYzotbBcclxuXHRcdHBhcnRlcjpudWxsLFxyXG5cdFx0YXZhdGFyOm51bGwsXHJcblx0XHRwb3NYOm51bGwsXHJcblx0XHRwb3NZOm51bGwsXHJcbiAgICB9LFxyXG5cdG1vdmVCeVJvdXRlOmZ1bmN0aW9uKHJvdXRlKXtcclxuXHRcdC8v5aOw5piO5LiA5Liq5Yqo5L2c5bqP5YiXXHJcblx0XHQvL3ZhciByPVtjYy52MigxMDAsMTAwKSxjYy52MigxMDAsMTAwKSxjYy52MigxMDAsMTAwKSxjYy52MigxMDAsMTAwKV07XHJcblx0XHQvL3ZhciBhY3RBcnI9bmV3IEFycmF5KCk7XHJcblx0XHQvL2NvbnNvbGUubG9nKHJvdXRlKTtcclxuXHRcdHZhciBwPWNjLnR3ZWVuKHRoaXMuYXZhdGFyKTtcclxuXHRcdGZvciAodmFyIGk9MDtpPHJvdXRlLmxlbmd0aDtpKyspe1xyXG5cdFx0XHQvL3AudG8oMC4wMSxwb3NpdGlvbjpyb3V0ZVtpXS5nZXRQb3NpdGlvbigpfSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJvdXRlW2ldLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHgrJywnK3JvdXRlW2ldLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHkpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocm91dGVbcm91dGUubGVuZ3RoLTFdLmdldFBvc2l0aW9uKCkpO1xyXG5cdFx0dGhpcy5wb3NYPXJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB4O1xyXG5cdFx0dGhpcy5wb3NZPXJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB5O1xyXG5cdFx0Ly9wLnN0YXJ0KCk7XHJcblx0XHQvL2NvbnNvbGUubG9nKGFjdEFycik7XHJcblx0XHQvL3ZhciBzZXEgPSBjYy5zZXF1ZW5jZShhY3RBcnIpO1xyXG5cdFx0XHJcblx0XHJcblx0fSxcclxuXHRtb3ZlMlBvczpmdW5jdGlvbih4LHkpe1xyXG5cdFx0dGhpcy5wb3NYPXg7XHJcblx0XHR0aGlzLnBvc1k9eTtcclxuXHRcdC8vdGhpcy5ub3dQb3MueT15O1xyXG5cdFx0dmFyIG1hcE9iaj1jYy5maW5kKCdDYW52YXMvbWFwJykuZ2V0Q29tcG9uZW50KCdHZXRNYXAnKTtcclxuXHRcdHZhciBwb3M9bWFwT2JqLm1hcFt4XVt5XS5nZXRQb3NpdGlvbigpO1xyXG5cdFx0dGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocG9zKTtcclxuXHRcdC8vY29uc29sZS5sb2cocG9zKTtcclxuXHRcdC8vY29uc29sZS5sb2codGhpcy5ub3dQb3MpO1xyXG5cdH0sXHJcblx0YmluZEF2YXRhcjpmdW5jdGlvbihub2RlKXtcclxuXHRcdC8vY29uc29sZS5sb2cobm9kZSk7XHJcblx0XHR0aGlzLmF2YXRhcj1ub2RlO1xyXG5cdH0sXHJcblx0b25Mb2FkKCl7XHRcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29ucy5wdXNoKHRoaXMubm9kZSk7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLm5hbWUrXCJvbkxvYWRcIik7XHJcblx0fSxcclxuICAgIHN0YXJ0ICgpIHtcclxuXHRcdC8v5Yid5aeL5YyW5Lu75YqhXHJcblx0XHRcclxuICAgIH0sXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblx0XHRcclxuXHRcdFxyXG5cdH0sXHJcbn0pOyJdfQ==