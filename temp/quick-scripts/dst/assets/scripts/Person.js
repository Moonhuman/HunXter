
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
    sight: 2,
    //视野大小，默认值为2
    eyes: null,
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

    for (var i = 0; i < route.length - 1; i++) {
      p.to(0.2, {
        position: cc.v2(route[i].x, route[i].y)
      });
      var tmp = new Array();
      tmp.push(route[i].getComponent('Cell').mapx);
      tmp.push(route[i].getComponent('Cell').mapy);
      tmp.push(cc.find('Canvas').getComponent('globalGame').nowProperty);
      p.call(function () {
        this[2].posX = this[0];
        this[2].posY = this[1];
      }, tmp); //Positionchecked(route[i].x,route[i].y,this.node);
      //console.log(route[i].getComponent('Cell').mapx+','+route[i].getComponent('Cell').mapy);
    }

    p.to(0.2, {
      position: cc.v2(route[route.length - 1].x, route[route.length - 1].y)
    });
    var tmp = new Array();
    tmp.push(route[route.length - 1].getComponent('Cell').mapx);
    tmp.push(route[route.length - 1].getComponent('Cell').mapy);
    tmp.push(cc.find('Canvas').getComponent('globalGame').nowProperty);
    tmp.push(route[route.length - 1]);
    p.call(function () {
      this[2].posX = this[0];
      this[2].posY = this[1];
      this[3].getComponent('Cell').stepOnCell(this[2].node);
    }, tmp);
    p.start(); //this.avatar.setPosition(route[route.length-1].getPosition());
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
    this.eyes = new Array();
    window.global.persons.push(this.node);
    console.log(this.name + "onLoad");
  },
  start: function start() {//初始化任务
  },
  update: function update(dt) {}
});

function Positionchecked(x, y, nowPerson) {
  //一次遍历人物列表上位置，检查是否有其他人，有则计算伤害。
  var persons = window.global.persons;

  for (var i = 0; i < persons.length; i++) {
    if (nowPerson != persons[i] && x == persons[i].posX && y == persons[i].posY) {
      //计算伤害
      if (persons[i].isDead == 1) //当前位置玩家已死亡,不需要计算伤害
        {
          break;
        }

      var attack = persons[i].attack;

      if (nowPerson.shield == 1) {
        attack = 0;
      } else if (nowPerson.halfShield > 0) {
        nowPerson.halfShield -= 1;
        attack = Math.round(attack / 2); //四舍五入
      }

      nowPerson.blood -= attack;
    }
  }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsImlzRGVhZCIsInNoaWVsZCIsImhhbGZTaGllbGQiLCJzaWdodCIsImV5ZXMiLCJwYXJ0ZXIiLCJhdmF0YXIiLCJwb3NYIiwicG9zWSIsIm1vdmVCeVJvdXRlIiwicm91dGUiLCJwIiwidHdlZW4iLCJpIiwibGVuZ3RoIiwidG8iLCJ2MiIsIngiLCJ5IiwidG1wIiwiQXJyYXkiLCJwdXNoIiwiZ2V0Q29tcG9uZW50IiwibWFweCIsIm1hcHkiLCJmaW5kIiwibm93UHJvcGVydHkiLCJjYWxsIiwic3RlcE9uQ2VsbCIsIm5vZGUiLCJzdGFydCIsIm1vdmUyUG9zIiwibWFwT2JqIiwicG9zIiwibWFwIiwiZ2V0UG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsImJpbmRBdmF0YXIiLCJvbkxvYWQiLCJ3aW5kb3ciLCJwZXJzb25zIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJ1cGRhdGUiLCJkdCIsIlBvc2l0aW9uY2hlY2tlZCIsIm5vd1BlcnNvbiIsIk1hdGgiLCJyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxNQUFNLEdBQUNDLE9BQU8sQ0FBQyxZQUFELENBQWxCOztBQUNBLElBQUlDLE1BQU0sR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaEIsYUFBU0QsRUFBRSxDQUFDRSxTQURJO0FBR2hCQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEs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QUFDakMsUUFBSWtDLFNBQVMsSUFBRVAsT0FBTyxDQUFDM0IsQ0FBRCxDQUFsQixJQUF5QkksQ0FBQyxJQUFFdUIsT0FBTyxDQUFDM0IsQ0FBRCxDQUFQLENBQVdOLElBQXZDLElBQWdEVyxDQUFDLElBQUVzQixPQUFPLENBQUMzQixDQUFELENBQVAsQ0FBV0wsSUFBbEUsRUFBdUU7QUFDdEU7QUFDQSxVQUFJZ0MsT0FBTyxDQUFDM0IsQ0FBRCxDQUFQLENBQVdiLE1BQVgsSUFBbUIsQ0FBdkIsRUFBeUI7QUFDekI7QUFDQztBQUNBOztBQUNELFVBQUlULE1BQU0sR0FBQ2lELE9BQU8sQ0FBQzNCLENBQUQsQ0FBUCxDQUFXdEIsTUFBdEI7O0FBQ0EsVUFBSXdELFNBQVMsQ0FBQzlDLE1BQVYsSUFBa0IsQ0FBdEIsRUFBd0I7QUFDdkJWLFFBQUFBLE1BQU0sR0FBRSxDQUFSO0FBQ0EsT0FGRCxNQUdLLElBQUl3RCxTQUFTLENBQUM3QyxVQUFWLEdBQXFCLENBQXpCLEVBQTJCO0FBQy9CNkMsUUFBQUEsU0FBUyxDQUFDN0MsVUFBVixJQUFzQixDQUF0QjtBQUNBWCxRQUFBQSxNQUFNLEdBQUV5RCxJQUFJLENBQUNDLEtBQUwsQ0FBVzFELE1BQU0sR0FBQyxDQUFsQixDQUFSLENBRitCLENBRUY7QUFDN0I7O0FBQ0R3RCxNQUFBQSxTQUFTLENBQUN2RCxLQUFWLElBQWlCRCxNQUFqQjtBQUNBO0FBQ0Q7QUFDRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbnZhciBnbG9iYWw9cmVxdWlyZSgnZ2xvYmFsR2FtZScpO1xudmFyIHBlcnNvbj1jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXHRcdG5pY2tuYW1lOiB7XG5cdFx0XHRkZWZhdWx0Om51bGwsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMubmlja25hbWU7XG5cdFx0XHR9LFxuXHRcdH1cdCxcblx0XHRJRDpudWxsLFxuXHRcdHBvc2l0aW9uOm51bGwsXG5cdFx0YXR0YWNrOjEsXG5cdFx0Ymxvb2Q6MTAsLy/njqnlrrbooYDph48s5Yid5aeL5Li6MueCue+8jOavj+WbnuWQiOaBouWkjTLngrlcblx0XHRtb2JpbGl0eToyLC8v546p5a626KGM5Yqo5YC8XG5cdFx0Y2FyZHM6bnVsbCxcblx0XHRteVN0YXR1czoxLC8vMOS4uuatu+S6oe+8jDHkuLrmraPluLhcblx0XHR0dXJuOjEsLy/njqnlrrblm57lkIjmlbBcblx0XHR1c2VDYXJkRW5hYmxlZDoxLC8v5piv5ZCm5L2/55So5Y2h54mM77yMMeS4uuWPr+S9v+eUqOWNoeeJjFxuXHRcdGdvRW5hYmxlZDp7XG5cdFx0XHRkZWZhdWx0OjEsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2dvRW5hYmxlZDtcblx0XHRcdH0sXG5cdFx0fSwvL+aYr+WQpuWPr+S7peihjOi1sCwx5Li65Y+v5Lul6KGM6LWwXG5cdFx0aXNEZWFkOjAsLy/mmK/lkKblt7LpmLXkuqHvvIww77ya5rS7552A77yMMe+8muatu+S6hlxuXHRcdHNoaWVsZDowLC8v5Y+v5YWN55ar5LiA5qyh5Lyk5a6z55qE5oqk55u+77yMMDog5pegLCAxOiDmnIlcblx0XHRoYWxmU2hpZWxkOjAsLy/lj6/lh4/ljYrkuIDmrKHkvKTlrrPnmoTmiqTnm77vvIzlj6/ntK/np6/mrKHmlbBcblx0XHRzaWdodDoyLC8v6KeG6YeO5aSn5bCP77yM6buY6K6k5YC85Li6MlxuXHRcdGV5ZXM6bnVsbCxcblx0XHRwYXJ0ZXI6bnVsbCxcblx0XHRhdmF0YXI6bnVsbCxcblx0XHRwb3NYOm51bGwsXG5cdFx0cG9zWTpudWxsLFxuICAgIH0sXG5cdG1vdmVCeVJvdXRlOmZ1bmN0aW9uKHJvdXRlKXtcblx0XHQvL+WjsOaYjuS4gOS4quWKqOS9nOW6j+WIl1xuXHRcdC8vdmFyIHI9W2NjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApXTtcblx0XHQvL3ZhciBhY3RBcnI9bmV3IEFycmF5KCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhyb3V0ZSk7XG5cdFx0dmFyIHA9Y2MudHdlZW4odGhpcy5hdmF0YXIpO1xuXHRcdGZvciAodmFyIGk9MDtpPHJvdXRlLmxlbmd0aC0xO2krKyl7XG5cdFx0XHRwLnRvKDAuMix7cG9zaXRpb246Y2MudjIocm91dGVbaV0ueCxyb3V0ZVtpXS55KX0pO1xuXHRcdFx0dmFyIHRtcCA9IG5ldyBBcnJheSgpO1xuXHRcdFx0dG1wLnB1c2gocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweCk7XG5cdFx0XHR0bXAucHVzaChyb3V0ZVtpXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB5KTtcblx0XHRcdHRtcC5wdXNoKGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5KTtcblx0XHRcdHAuY2FsbCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXNbMl0ucG9zWD10aGlzWzBdO1xuXHRcdFx0XHR0aGlzWzJdLnBvc1k9dGhpc1sxXTtcblx0XHRcdH0sIHRtcCk7XG5cdFx0XHQvL1Bvc2l0aW9uY2hlY2tlZChyb3V0ZVtpXS54LHJvdXRlW2ldLnksdGhpcy5ub2RlKTtcblx0XHRcdC8vY29uc29sZS5sb2cocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweCsnLCcrcm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XG5cdFx0fVxuXHRcdHAudG8oMC4yLHtwb3NpdGlvbjpjYy52Mihyb3V0ZVtyb3V0ZS5sZW5ndGgtMV0ueCxyb3V0ZVtyb3V0ZS5sZW5ndGgtMV0ueSl9KTtcblx0XHR2YXIgdG1wID0gbmV3IEFycmF5KCk7XG5cdFx0dG1wLnB1c2gocm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHgpO1xuXHRcdHRtcC5wdXNoKHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB5KTtcblx0XHR0bXAucHVzaChjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSk7XG5cdFx0dG1wLnB1c2gocm91dGVbcm91dGUubGVuZ3RoLTFdKTtcblx0XHRwLmNhbGwoZnVuY3Rpb24oKXtcblx0XHRcdHRoaXNbMl0ucG9zWD10aGlzWzBdO1xuXHRcdFx0dGhpc1syXS5wb3NZPXRoaXNbMV07XG5cdFx0XHR0aGlzWzNdLmdldENvbXBvbmVudCgnQ2VsbCcpLnN0ZXBPbkNlbGwodGhpc1syXS5ub2RlKTtcblx0XHR9LHRtcCk7XG5cdFx0cC5zdGFydCgpO1xuXHRcdC8vdGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocm91dGVbcm91dGUubGVuZ3RoLTFdLmdldFBvc2l0aW9uKCkpO1xuXHRcdFxuXHRcdFxuXHRcdFxuXHRcblx0fSxcblx0bW92ZTJQb3M6ZnVuY3Rpb24oeCx5KXtcblx0XHR0aGlzLnBvc1g9eDtcblx0XHR0aGlzLnBvc1k9eTtcblx0XHQvL3RoaXMubm93UG9zLnk9eTtcblx0XHR2YXIgbWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xuXHRcdHZhciBwb3M9bWFwT2JqLm1hcFt4XVt5XS5nZXRQb3NpdGlvbigpO1xuXHRcdHRoaXMuYXZhdGFyLnNldFBvc2l0aW9uKHBvcyk7XG5cdFx0Ly9jb25zb2xlLmxvZyhwb3MpO1xuXHRcdC8vY29uc29sZS5sb2codGhpcy5ub3dQb3MpO1xuXHR9LFxuXHRiaW5kQXZhdGFyOmZ1bmN0aW9uKG5vZGUpe1xuXHRcdC8vY29uc29sZS5sb2cobm9kZSk7XG5cdFx0dGhpcy5hdmF0YXI9bm9kZTtcblx0fSxcblx0b25Mb2FkKCl7XHRcblx0XHR0aGlzLmNhcmRzPW5ldyBBcnJheSgpO1xuXHRcdHRoaXMuZXllcz1uZXcgQXJyYXkoKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnMucHVzaCh0aGlzLm5vZGUpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMubmFtZStcIm9uTG9hZFwiKTtcblx0fSxcbiAgICBzdGFydCAoKSB7XG5cdFx0Ly/liJ3lp4vljJbku7vliqFcblx0XHRcbiAgICB9LFxuICAgIHVwZGF0ZSAoZHQpIHtcblx0XHRcblx0XHRcblx0fSxcbn0pO1xuXG5mdW5jdGlvbiBQb3NpdGlvbmNoZWNrZWQoeCx5LG5vd1BlcnNvbil7XG5cdC8v5LiA5qyh6YGN5Y6G5Lq654mp5YiX6KGo5LiK5L2N572u77yM5qOA5p+l5piv5ZCm5pyJ5YW25LuW5Lq677yM5pyJ5YiZ6K6h566X5Lyk5a6z44CCXG5cdHZhciBwZXJzb25zPXdpbmRvdy5nbG9iYWwucGVyc29ucztcblx0Zm9yICh2YXIgaT0wO2k8cGVyc29ucy5sZW5ndGg7aSsrKXtcblx0XHRpZiAobm93UGVyc29uIT1wZXJzb25zW2ldICYmIHg9PXBlcnNvbnNbaV0ucG9zWCAmJiAgeT09cGVyc29uc1tpXS5wb3NZKXtcblx0XHRcdC8v6K6h566X5Lyk5a6zXG5cdFx0XHRpZiAocGVyc29uc1tpXS5pc0RlYWQ9PTEpLy/lvZPliY3kvY3nva7njqnlrrblt7LmrbvkuqEs5LiN6ZyA6KaB6K6h566X5Lyk5a6zXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGF0dGFjaz1wZXJzb25zW2ldLmF0dGFjaztcblx0XHRcdGlmIChub3dQZXJzb24uc2hpZWxkPT0xKXtcblx0XHRcdFx0YXR0YWNrPSAwO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAobm93UGVyc29uLmhhbGZTaGllbGQ+MCl7XG5cdFx0XHRcdG5vd1BlcnNvbi5oYWxmU2hpZWxkLT0xO1xuXHRcdFx0XHRhdHRhY2s9IE1hdGgucm91bmQoYXR0YWNrLzIpOy8v5Zub6IiN5LqU5YWlXG5cdFx0XHR9XG5cdFx0XHRub3dQZXJzb24uYmxvb2QtPWF0dGFjaztcblx0XHR9XG5cdH1cbn0iXX0=