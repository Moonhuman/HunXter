
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
    // if (this.node.name == 'Person2' || this.node.name == 'Person4')
    // this.avatar.opacity = 0;
    var p = cc.tween(this.avatar);

    for (var i = 0; i < route.length - 1; i++) {
      p.to(0.2, {
        position: cc.v2(route[i].x, route[i].y)
      });
      Positionchecked(route[i].x, route[i].y, this.node);
      var tmp = new Array();
      tmp.push(route[i].getComponent('Cell').mapx);
      tmp.push(route[i].getComponent('Cell').mapy);
      tmp.push(cc.find('Canvas').getComponent('globalGame').nowProperty);
      p.call(function () {
        this[2].posX = this[0];
        this[2].posY = this[1];
      }, tmp);
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
      this[3].getComponent('Cell').stepOnCell(this[2].node); // if (this[2].node.name == 'Person2' || this[2].node.name == 'Person4')
      // this[2].avatar.opacity = 255;
    }, tmp);
    p.start(); //this.avatar.setPosition(route[route.length-1].getPosition());
  },
  move2Pos: function move2Pos(x, y) {
    this.posX = x;
    this.posY = y; //this.nowPos.y=y;

    var mapObj = cc.find('Canvas/map').getComponent('GetMap');
    var pos = mapObj.map[x][y].getPosition();
    this.avatar.setPosition(pos);
  },
  bindAvatar: function bindAvatar(node) {
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
    if (nowPerson != persons[i] && nowPerson.parter != person[i] && x == persons[i].posX && y == persons[i].posY) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsImlzRGVhZCIsInNoaWVsZCIsImhhbGZTaGllbGQiLCJzaWdodCIsImV5ZXMiLCJwYXJ0ZXIiLCJhdmF0YXIiLCJwb3NYIiwicG9zWSIsIm1vdmVCeVJvdXRlIiwicm91dGUiLCJwIiwidHdlZW4iLCJpIiwibGVuZ3RoIiwidG8iLCJ2MiIsIngiLCJ5IiwiUG9zaXRpb25jaGVja2VkIiwibm9kZSIsInRtcCIsIkFycmF5IiwicHVzaCIsImdldENvbXBvbmVudCIsIm1hcHgiLCJtYXB5IiwiZmluZCIsIm5vd1Byb3BlcnR5IiwiY2FsbCIsInN0ZXBPbkNlbGwiLCJzdGFydCIsIm1vdmUyUG9zIiwibWFwT2JqIiwicG9zIiwibWFwIiwiZ2V0UG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsImJpbmRBdmF0YXIiLCJvbkxvYWQiLCJ3aW5kb3ciLCJwZXJzb25zIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJ1cGRhdGUiLCJkdCIsIm5vd1BlcnNvbiIsIk1hdGgiLCJyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxNQUFNLEdBQUNDLE9BQU8sQ0FBQyxZQUFELENBQWxCOztBQUNBLElBQUlDLE1BQU0sR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaEIsYUFBU0QsRUFBRSxDQUFDRSxTQURJO0FBR2hCQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEs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UCxDQUFjNkQsT0FBMUI7O0FBQ0EsT0FBSyxJQUFJNUIsQ0FBQyxHQUFDLENBQVgsRUFBYUEsQ0FBQyxHQUFDNEIsT0FBTyxDQUFDM0IsTUFBdkIsRUFBOEJELENBQUMsRUFBL0IsRUFBa0M7QUFDakMsUUFBSWtDLFNBQVMsSUFBRU4sT0FBTyxDQUFDNUIsQ0FBRCxDQUFsQixJQUF5QmtDLFNBQVMsQ0FBQzFDLE1BQVYsSUFBa0J2QixNQUFNLENBQUMrQixDQUFELENBQWpELElBQXdESSxDQUFDLElBQUV3QixPQUFPLENBQUM1QixDQUFELENBQVAsQ0FBV04sSUFBdEUsSUFBK0VXLENBQUMsSUFBRXVCLE9BQU8sQ0FBQzVCLENBQUQsQ0FBUCxDQUFXTCxJQUFqRyxFQUFzRztBQUNyRztBQUNBLFVBQUlpQyxPQUFPLENBQUM1QixDQUFELENBQVAsQ0FBV2IsTUFBWCxJQUFtQixDQUF2QixFQUF5QjtBQUN6QjtBQUNDO0FBQ0E7O0FBQ0QsVUFBSVQsTUFBTSxHQUFDa0QsT0FBTyxDQUFDNUIsQ0FBRCxDQUFQLENBQVd0QixNQUF0Qjs7QUFDQSxVQUFJd0QsU0FBUyxDQUFDOUMsTUFBVixJQUFrQixDQUF0QixFQUF3QjtBQUN2QlYsUUFBQUEsTUFBTSxHQUFFLENBQVI7QUFDQSxPQUZELE1BR0ssSUFBSXdELFNBQVMsQ0FBQzdDLFVBQVYsR0FBcUIsQ0FBekIsRUFBMkI7QUFDL0I2QyxRQUFBQSxTQUFTLENBQUM3QyxVQUFWLElBQXNCLENBQXRCO0FBQ0FYLFFBQUFBLE1BQU0sR0FBRXlELElBQUksQ0FBQ0MsS0FBTCxDQUFXMUQsTUFBTSxHQUFDLENBQWxCLENBQVIsQ0FGK0IsQ0FFRjtBQUM3Qjs7QUFDRHdELE1BQUFBLFNBQVMsQ0FBQ3ZELEtBQVYsSUFBaUJELE1BQWpCO0FBQ0E7QUFDRDtBQUNEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxudmFyIGdsb2JhbD1yZXF1aXJlKCdnbG9iYWxHYW1lJyk7XG52YXIgcGVyc29uPWNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cdFx0bmlja25hbWU6IHtcblx0XHRcdGRlZmF1bHQ6bnVsbCxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5uaWNrbmFtZTtcblx0XHRcdH0sXG5cdFx0fVx0LFxuXHRcdElEOm51bGwsXG5cdFx0cG9zaXRpb246bnVsbCxcblx0XHRhdHRhY2s6MSxcblx0XHRibG9vZDoxMCwvL+eOqeWutuihgOmHjyzliJ3lp4vkuLoy54K577yM5q+P5Zue5ZCI5oGi5aSNMueCuVxuXHRcdG1vYmlsaXR5OjIsLy/njqnlrrbooYzliqjlgLxcblx0XHRjYXJkczpudWxsLFxuXHRcdG15U3RhdHVzOjEsLy8w5Li65q275Lqh77yMMeS4uuato+W4uFxuXHRcdHR1cm46MSwvL+eOqeWutuWbnuWQiOaVsFxuXHRcdHVzZUNhcmRFbmFibGVkOjEsLy/mmK/lkKbkvb/nlKjljaHniYzvvIwx5Li65Y+v5L2/55So5Y2h54mMXG5cdFx0Z29FbmFibGVkOntcblx0XHRcdGRlZmF1bHQ6MSxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZ29FbmFibGVkO1xuXHRcdFx0fSxcblx0XHR9LC8v5piv5ZCm5Y+v5Lul6KGM6LWwLDHkuLrlj6/ku6XooYzotbBcblx0XHRpc0RlYWQ6MCwvL+aYr+WQpuW3sumYteS6oe+8jDDvvJrmtLvnnYDvvIwx77ya5q275LqGXG5cdFx0c2hpZWxkOjAsLy/lj6/lhY3nlqvkuIDmrKHkvKTlrrPnmoTmiqTnm77vvIwwOiDml6AsIDE6IOaciVxuXHRcdGhhbGZTaGllbGQ6MCwvL+WPr+WHj+WNiuS4gOasoeS8pOWus+eahOaKpOebvu+8jOWPr+e0r+enr+asoeaVsFxuXHRcdHNpZ2h0OjIsLy/op4bph47lpKflsI/vvIzpu5jorqTlgLzkuLoyXG5cdFx0ZXllczpudWxsLFxuXHRcdHBhcnRlcjpudWxsLFxuXHRcdGF2YXRhcjpudWxsLFxuXHRcdHBvc1g6bnVsbCxcblx0XHRwb3NZOm51bGwsXG4gICAgfSxcblx0bW92ZUJ5Um91dGU6ZnVuY3Rpb24ocm91dGUpe1xuXHRcdC8v5aOw5piO5LiA5Liq5Yqo5L2c5bqP5YiXXG5cdFx0Ly92YXIgcj1bY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCldO1xuXHRcdC8vdmFyIGFjdEFycj1uZXcgQXJyYXkoKTtcblx0XHQvL2NvbnNvbGUubG9nKHJvdXRlKTtcblx0XHQvLyBpZiAodGhpcy5ub2RlLm5hbWUgPT0gJ1BlcnNvbjInIHx8IHRoaXMubm9kZS5uYW1lID09ICdQZXJzb240Jylcblx0XHRcdC8vIHRoaXMuYXZhdGFyLm9wYWNpdHkgPSAwO1xuXHRcdHZhciBwPWNjLnR3ZWVuKHRoaXMuYXZhdGFyKTtcblx0XHRmb3IgKHZhciBpPTA7aTxyb3V0ZS5sZW5ndGgtMTtpKyspe1xuXHRcdFx0cC50bygwLjIse3Bvc2l0aW9uOmNjLnYyKHJvdXRlW2ldLngscm91dGVbaV0ueSl9KTtcblx0XHRcdFBvc2l0aW9uY2hlY2tlZChyb3V0ZVtpXS54LHJvdXRlW2ldLnksdGhpcy5ub2RlKTtcblx0XHRcdHZhciB0bXAgPSBuZXcgQXJyYXkoKTtcblx0XHRcdHRtcC5wdXNoKHJvdXRlW2ldLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHgpO1xuXHRcdFx0dG1wLnB1c2gocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XG5cdFx0XHR0bXAucHVzaChjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSk7XG5cdFx0XHRwLmNhbGwoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzWzJdLnBvc1g9dGhpc1swXTtcblx0XHRcdFx0dGhpc1syXS5wb3NZPXRoaXNbMV07XG5cdFx0XHR9LCB0bXApO1xuXHRcdFx0XG5cdFx0fVxuXHRcdHAudG8oMC4yLHtwb3NpdGlvbjpjYy52Mihyb3V0ZVtyb3V0ZS5sZW5ndGgtMV0ueCxyb3V0ZVtyb3V0ZS5sZW5ndGgtMV0ueSl9KTtcblx0XHR2YXIgdG1wID0gbmV3IEFycmF5KCk7XG5cdFx0dG1wLnB1c2gocm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHgpO1xuXHRcdHRtcC5wdXNoKHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB5KTtcblx0XHR0bXAucHVzaChjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSk7XG5cdFx0dG1wLnB1c2gocm91dGVbcm91dGUubGVuZ3RoLTFdKTtcblx0XHRwLmNhbGwoZnVuY3Rpb24oKXtcblx0XHRcdHRoaXNbMl0ucG9zWD10aGlzWzBdO1xuXHRcdFx0dGhpc1syXS5wb3NZPXRoaXNbMV07XG5cdFx0XHR0aGlzWzNdLmdldENvbXBvbmVudCgnQ2VsbCcpLnN0ZXBPbkNlbGwodGhpc1syXS5ub2RlKTtcblx0XHRcdFxuXHRcdFx0Ly8gaWYgKHRoaXNbMl0ubm9kZS5uYW1lID09ICdQZXJzb24yJyB8fCB0aGlzWzJdLm5vZGUubmFtZSA9PSAnUGVyc29uNCcpXG5cdFx0XHRcdC8vIHRoaXNbMl0uYXZhdGFyLm9wYWNpdHkgPSAyNTU7XG5cdFx0XHRcblx0XHR9LHRtcCk7XG5cdFx0cC5zdGFydCgpO1xuXHRcdC8vdGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocm91dGVbcm91dGUubGVuZ3RoLTFdLmdldFBvc2l0aW9uKCkpO1xuXHRcdFxuXHRcdFxuXHRcdFxuXHRcblx0fSxcblx0bW92ZTJQb3M6ZnVuY3Rpb24oeCx5KXtcblx0XHR0aGlzLnBvc1g9eDtcblx0XHR0aGlzLnBvc1k9eTtcblx0XHQvL3RoaXMubm93UG9zLnk9eTtcblx0XHR2YXIgbWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xuXHRcdHZhciBwb3M9bWFwT2JqLm1hcFt4XVt5XS5nZXRQb3NpdGlvbigpO1xuXHRcdHRoaXMuYXZhdGFyLnNldFBvc2l0aW9uKHBvcyk7XG5cdH0sXG5cdGJpbmRBdmF0YXI6ZnVuY3Rpb24obm9kZSl7XG5cdFx0dGhpcy5hdmF0YXI9bm9kZTtcblx0fSxcblx0b25Mb2FkKCl7XHRcblx0XHR0aGlzLmNhcmRzPW5ldyBBcnJheSgpO1xuXHRcdHRoaXMuZXllcz1uZXcgQXJyYXkoKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnMucHVzaCh0aGlzLm5vZGUpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMubmFtZStcIm9uTG9hZFwiKTtcblx0fSxcbiAgICBzdGFydCAoKSB7XG5cdFx0Ly/liJ3lp4vljJbku7vliqFcblx0XHRcbiAgICB9LFxuICAgIHVwZGF0ZSAoZHQpIHtcblx0XHRcblx0XHRcblx0fSxcbn0pO1xuZnVuY3Rpb24gUG9zaXRpb25jaGVja2VkKHgseSxub3dQZXJzb24pe1xuXHQvL+S4gOasoemBjeWOhuS6uueJqeWIl+ihqOS4iuS9jee9ru+8jOajgOafpeaYr+WQpuacieWFtuS7luS6uu+8jOacieWImeiuoeeul+S8pOWus+OAglxuXHR2YXIgcGVyc29ucz13aW5kb3cuZ2xvYmFsLnBlcnNvbnM7XG5cdGZvciAodmFyIGk9MDtpPHBlcnNvbnMubGVuZ3RoO2krKyl7XG5cdFx0aWYgKG5vd1BlcnNvbiE9cGVyc29uc1tpXSAmJiBub3dQZXJzb24ucGFydGVyIT1wZXJzb25baV0gJiYgeD09cGVyc29uc1tpXS5wb3NYICYmICB5PT1wZXJzb25zW2ldLnBvc1kpe1xuXHRcdFx0Ly/orqHnrpfkvKTlrrNcblx0XHRcdGlmIChwZXJzb25zW2ldLmlzRGVhZD09MSkvL+W9k+WJjeS9jee9rueOqeWutuW3suatu+S6oSzkuI3pnIDopoHorqHnrpfkvKTlrrNcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXR0YWNrPXBlcnNvbnNbaV0uYXR0YWNrO1xuXHRcdFx0aWYgKG5vd1BlcnNvbi5zaGllbGQ9PTEpe1xuXHRcdFx0XHRhdHRhY2s9IDA7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChub3dQZXJzb24uaGFsZlNoaWVsZD4wKXtcblx0XHRcdFx0bm93UGVyc29uLmhhbGZTaGllbGQtPTE7XG5cdFx0XHRcdGF0dGFjaz0gTWF0aC5yb3VuZChhdHRhY2svMik7Ly/lm5voiI3kupTlhaVcblx0XHRcdH1cblx0XHRcdG5vd1BlcnNvbi5ibG9vZC09YXR0YWNrO1xuXHRcdH1cblx0fVxufSJdfQ==