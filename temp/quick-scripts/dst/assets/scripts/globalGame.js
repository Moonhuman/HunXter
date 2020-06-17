
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/globalGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1c04cewIodMKZmQhbD7lezO', 'globalGame');
// scripts/globalGame.js

"use strict";

window.global = {
  persons: [],
  nowTurn: 0,
  //当前回合数
  isOver: false
};
cc.Class({
  "extends": cc.Component,
  properties: {
    mapObj: null,
    //地图对象
    persons: null,
    //玩家们
    index: 0,
    nowStep: 0,
    nowPlayer: null,
    nowProperty: null,
    isWait: false
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //加载地图
    this.nowStep = 0;
    this.node.on('update-state', function (msg) {
      this.nowStep = (this.nowStep + 1) % 4;
      this.isWait = false;
    }, this);
    cc.game.on('stepOnCell-done', function (event) {
      //触发结束
      this.node.emit('update-state', '1'); //更新状态

      console.log("触发了特殊格子！");
    }, this);
    cc.game.on('route-chosen', function (route) {
      //监听玩家选择了哪条路径
      console.log('点击了', route);
      this.nowProperty.moveByRoute(route); //this.node.emit('update-state', '1');//玩家移动完成，进入下一步操作
      //玩家头像按照路径移动
    }, this);
  },
  start: function start() {
    window.global.persons[0].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar1'));
    window.global.persons[1].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar2'));
    window.global.persons[2].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar3'));
    window.global.persons[3].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar4'));
    this.mapObj = cc.find('Canvas/map').getComponent('GetMap'); //console.log(this.mapObj.posEnable(this.mapObj.map[0][0],3));

    this.nowPlayer = window.global.persons[this.index]; //console.log(this.mapObj.map);
    //初始化四个玩家位置
    //console.log(this.mapObj.map[0][0].getPosition());

    window.global.persons[0].getComponent('Person').move2Pos(0, 0);
    window.global.persons[1].getComponent('Person').move2Pos(10, 10);
    window.global.persons[2].getComponent('Person').move2Pos(0, 10);
    window.global.persons[3].getComponent('Person').move2Pos(10, 0);
  },
  update: function update(dt) {
    //判断当前回合是否结束
    console.log("是否等待操作", this.isWait);

    switch (this.nowStep) {
      case 0:
        {
          //初始化变量
          if (this.isWait) {
            //正在操作或等待操作
            break;
          }

          console.log(this.nowPlayer.name);
          console.log("当前步骤：", this.nowStep);
          this.nowProperty = this.nowPlayer.getComponent('Person'); //获得玩家属性集合

          this.node.emit('update-state', '1');
          break;
        }

      case 1:
        {
          //玩家移动
          if (this.isWait) {
            //正在操作或等待操作
            break;
          }

          console.log("当前步骤：", this.nowStep);

          if (this.nowProperty.goEnabled) {
            //判断玩家是否可以行走
            var step = randomNum(1, 6); //掷骰子，玩家步数

            console.log("掷骰子:" + step);
            console.log("当前起点:" + this.nowProperty.posX + "," + this.nowProperty.posY);
            this.isWait = true;
            console.log(this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY], step));
          } else {
            this.nowProperty.goEnabled = 1;
            this.node.emit('update-state', '1');
          }

          break;
        }

      case 2:
        {
          //完成了事件触发或者卡牌触发
          if (this.isWait) {
            //正在操作或等待操作
            break;
          }

          console.log("当前步骤：", this.nowStep);
          console.log("玩家出牌");
          this.node.emit('update-state', '1');
          break;
        }

      case 3:
        {
          console.log("当前步骤：", this.nowStep);
          console.log("切换角色");
          this.index = (this.index + 1) % 4;
          this.nowPlayer = window.global.persons[this.index];
          this.node.emit('update-state', '1');
          break;
        }
    } //console.log(nowProperty.goEnabled);

  }
});

function Person(name, num, pos, parter, node) {
  this.name = name; //玩家昵称

  this.ID = num; //玩家编号

  this.position = pos; //玩家当前位置

  this.attack = 1; //玩家攻击力，初始为1点

  this.blood = 10; //玩家血量,初始为2点，每回合恢复2点

  this.mobility = 2; //玩家行动值

  this.cards = new Array(); //玩家持有卡牌组

  this.myStatus = 1; //0为死亡，1为正常

  this.turn = 1; //玩家回合数

  this.useCardEnabled = 1; //是否使用卡牌，1为可使用卡牌

  this.goEnabled = 1; //是否可以行走,1为可以行走

  this.parter = parter; //设置玩家队友id

  this.node = node; //人物节点

  return this;
} //生成从minNum到maxNum的随机数


function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;

    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;

    default:
      return 0;
      break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsR2FtZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibm93VHVybiIsImlzT3ZlciIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibWFwT2JqIiwiaW5kZXgiLCJub3dTdGVwIiwibm93UGxheWVyIiwibm93UHJvcGVydHkiLCJpc1dhaXQiLCJvbkxvYWQiLCJub2RlIiwib24iLCJtc2ciLCJnYW1lIiwiZXZlbnQiLCJlbWl0IiwiY29uc29sZSIsImxvZyIsInJvdXRlIiwibW92ZUJ5Um91dGUiLCJzdGFydCIsImdldENvbXBvbmVudCIsImJpbmRBdmF0YXIiLCJmaW5kIiwibW92ZTJQb3MiLCJ1cGRhdGUiLCJkdCIsIm5hbWUiLCJnb0VuYWJsZWQiLCJzdGVwIiwicmFuZG9tTnVtIiwicG9zWCIsInBvc1kiLCJwb3NFbmFibGUiLCJtYXAiLCJQZXJzb24iLCJudW0iLCJwb3MiLCJwYXJ0ZXIiLCJJRCIsInBvc2l0aW9uIiwiYXR0YWNrIiwiYmxvb2QiLCJtb2JpbGl0eSIsImNhcmRzIiwiQXJyYXkiLCJteVN0YXR1cyIsInR1cm4iLCJ1c2VDYXJkRW5hYmxlZCIsIm1pbk51bSIsIm1heE51bSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInBhcnNlSW50IiwiTWF0aCIsInJhbmRvbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWM7QUFDYkMsRUFBQUEsT0FBTyxFQUFDLEVBREs7QUFFYkMsRUFBQUEsT0FBTyxFQUFDLENBRks7QUFFSDtBQUNWQyxFQUFBQSxNQUFNLEVBQUM7QUFITSxDQUFkO0FBS0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNkQyxJQUFBQSxNQUFNLEVBQUMsSUFETztBQUNGO0FBQ1pQLElBQUFBLE9B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QUFDQyxJQUFJLENBQUNDLE1BQUwsS0FBY04sTUFBZCxHQUFxQixDQUF0QixFQUF3QixFQUF4QixDQUFmO0FBQ0o7O0FBQ0EsU0FBSyxDQUFMO0FBQ0ksYUFBT0ksUUFBUSxDQUFDQyxJQUFJLENBQUNDLE1BQUwsTUFBZUwsTUFBTSxHQUFDRCxNQUFQLEdBQWMsQ0FBN0IsSUFBZ0NBLE1BQWpDLEVBQXdDLEVBQXhDLENBQWY7QUFDSjs7QUFDSTtBQUNJLGFBQU8sQ0FBUDtBQUNKO0FBVFI7QUFXSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lmdsb2JhbD17XHJcblx0cGVyc29uczpbXSxcclxuXHRub3dUdXJuOjAsLy/lvZPliY3lm57lkIjmlbBcclxuXHRpc092ZXI6ZmFsc2UsXHJcbn07XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblx0XHRtYXBPYmo6bnVsbCwvL+WcsOWbvuWvueixoVxyXG5cdFx0cGVyc29uczpudWxsLC8v546p5a625LusXHJcblx0XHRpbmRleDowLFxyXG5cdFx0bm93U3RlcDowLFxyXG5cdFx0bm93UGxheWVyOm51bGwsXHJcblx0XHRub3dQcm9wZXJ0eTpudWxsLFxyXG5cdFx0aXNXYWl0OmZhbHNlLFxyXG5cdFx0XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcblx0XHQvL+WKoOi9veWcsOWbvlxyXG5cdFx0dGhpcy5ub3dTdGVwPTA7XHJcblx0XHR0aGlzLm5vZGUub24oJ3VwZGF0ZS1zdGF0ZScsIGZ1bmN0aW9uIChtc2cpIHtcclxuXHRcdFx0dGhpcy5ub3dTdGVwPSh0aGlzLm5vd1N0ZXArMSklNDtcclxuXHRcdFx0dGhpcy5pc1dhaXQ9ZmFsc2U7XHJcblx0XHRcdFxyXG5cdFx0fSx0aGlzKTtcclxuXHRcdGNjLmdhbWUub24oJ3N0ZXBPbkNlbGwtZG9uZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7Ly/op6blj5Hnu5PmnZ9cclxuXHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7Ly/mm7TmlrDnirbmgIFcclxuXHRcdFx0Y29uc29sZS5sb2coXCLop6blj5HkuobnibnmrormoLzlrZDvvIFcIik7XHJcblx0XHR9LHRoaXMpO1xyXG5cdFx0Y2MuZ2FtZS5vbigncm91dGUtY2hvc2VuJywgZnVuY3Rpb24ocm91dGUpIHsvL+ebkeWQrOeOqeWutumAieaLqeS6huWTquadoei3r+W+hFxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ+eCueWHu+S6hicscm91dGUpO1xyXG5cdFx0XHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS5tb3ZlQnlSb3V0ZShyb3V0ZSk7XHJcblx0XHRcdFx0XHQvL3RoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpOy8v546p5a6256e75Yqo5a6M5oiQ77yM6L+b5YWl5LiL5LiA5q2l5pON5L2cXHJcblx0XHRcdFx0XHQvL+eOqeWutuWktOWDj+aMieeFp+i3r+W+hOenu+WKqFxyXG5cdFx0fSx0aGlzKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0fSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMScpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1sxXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmJpbmRBdmF0YXIoY2MuZmluZCgnQ2FudmFzL2F2YXRhci9hdmF0YXIyJykpO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzJdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjMnKSk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyNCcpKTtcclxuXHRcdHRoaXMubWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLm1hcE9iai5wb3NFbmFibGUodGhpcy5tYXBPYmoubWFwWzBdWzBdLDMpKTtcclxuXHRcdHRoaXMubm93UGxheWVyPXdpbmRvdy5nbG9iYWwucGVyc29uc1t0aGlzLmluZGV4XTtcclxuXHRcdC8vY29uc29sZS5sb2codGhpcy5tYXBPYmoubWFwKTtcclxuXHRcdC8v5Yid5aeL5YyW5Zub5Liq546p5a625L2N572uXHJcblx0XHQvL2NvbnNvbGUubG9nKHRoaXMubWFwT2JqLm1hcFswXVswXS5nZXRQb3NpdGlvbigpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1swXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDAsMCk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygxMCwxMCk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygwLDEwKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1szXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDEwLDApO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblx0XHQvL+WIpOaWreW9k+WJjeWbnuWQiOaYr+WQpue7k+adn1xyXG5cdFx0XHJcblx0XHRjb25zb2xlLmxvZyhcIuaYr+WQpuetieW+heaTjeS9nFwiLHRoaXMuaXNXYWl0KTtcclxuXHRcdHN3aXRjaCAodGhpcy5ub3dTdGVwKXtcclxuXHRcdFx0Y2FzZSAwOnsvL+WIneWni+WMluWPmOmHj1xyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLm5vd1BsYXllci5uYW1lKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIuW9k+WJjeatpemqpO+8mlwiLHRoaXMubm93U3RlcCk7XHJcblx0XHRcdFx0dGhpcy5ub3dQcm9wZXJ0eT10aGlzLm5vd1BsYXllci5nZXRDb21wb25lbnQoJ1BlcnNvbicpOy8v6I635b6X546p5a625bGe5oCn6ZuG5ZCIXHJcblx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAxOnsvL+eOqeWutuenu+WKqFxyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIuW9k+WJjeatpemqpO+8mlwiLHRoaXMubm93U3RlcCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKHRoaXMubm93UHJvcGVydHkuZ29FbmFibGVkKXsvL+WIpOaWreeOqeWutuaYr+WQpuWPr+S7peihjOi1sFxyXG5cdFx0XHRcdFx0dmFyIHN0ZXA9cmFuZG9tTnVtKDEsNik7Ly/mjrfpqrDlrZDvvIznjqnlrrbmraXmlbBcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5o636aqw5a2QOlwiK3N0ZXApO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCLlvZPliY3otbfngrk6XCIrdGhpcy5ub3dQcm9wZXJ0eS5wb3NYK1wiLFwiK3RoaXMubm93UHJvcGVydHkucG9zWSk7XHJcblx0XHRcdFx0XHR0aGlzLmlzV2FpdD10cnVlO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5tYXBPYmoucG9zRW5hYmxlKHRoaXMubWFwT2JqLm1hcFt0aGlzLm5vd1Byb3BlcnR5LnBvc1hdW3RoaXMubm93UHJvcGVydHkucG9zWV0sc3RlcCkpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LmdvRW5hYmxlZD0xO1xyXG5cdFx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCBicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXNlIDI6e1xyXG5cdFx0XHRcdC8v5a6M5oiQ5LqG5LqL5Lu26Kem5Y+R5oiW6ICF5Y2h54mM6Kem5Y+RXHJcblx0XHRcdFx0aWYgKHRoaXMuaXNXYWl0KXsvL+ato+WcqOaTjeS9nOaIluetieW+heaTjeS9nFxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwi5b2T5YmN5q2l6aqk77yaXCIsdGhpcy5ub3dTdGVwKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIueOqeWutuWHuueJjFwiKTtcclxuXHRcdFx0XHR0aGlzLm5vZGUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXNlIDM6e1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwi5b2T5YmN5q2l6aqk77yaXCIsdGhpcy5ub3dTdGVwKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIuWIh+aNouinkuiJslwiKTtcclxuXHRcdFx0XHR0aGlzLmluZGV4PSh0aGlzLmluZGV4KzEpJTQ7XHJcblx0XHRcdFx0dGhpcy5ub3dQbGF5ZXI9d2luZG93Lmdsb2JhbC5wZXJzb25zW3RoaXMuaW5kZXhdO1xyXG5cdFx0XHRcdHRoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvL2NvbnNvbGUubG9nKG5vd1Byb3BlcnR5LmdvRW5hYmxlZCk7XHJcblx0fSxcclxufSk7XHJcblxyXG5mdW5jdGlvbiBQZXJzb24obmFtZSxudW0scG9zLHBhcnRlcixub2RlKXtcclxuXHR0aGlzLm5hbWU9bmFtZTsvL+eOqeWutuaYteensFxyXG5cdHRoaXMuSUQ9bnVtOy8v546p5a6257yW5Y+3XHJcblx0dGhpcy5wb3NpdGlvbj1wb3M7Ly/njqnlrrblvZPliY3kvY3nva5cclxuXHR0aGlzLmF0dGFjaz0xOy8v546p5a625pS75Ye75Yqb77yM5Yid5aeL5Li6MeeCuVxyXG5cdHRoaXMuYmxvb2Q9MTA7Ly/njqnlrrbooYDph48s5Yid5aeL5Li6MueCue+8jOavj+WbnuWQiOaBouWkjTLngrlcclxuXHR0aGlzLm1vYmlsaXR5PTI7Ly/njqnlrrbooYzliqjlgLxcclxuXHR0aGlzLmNhcmRzPW5ldyBBcnJheSgpOy8v546p5a625oyB5pyJ5Y2h54mM57uEXHJcblx0dGhpcy5teVN0YXR1cz0xOy8vMOS4uuatu+S6oe+8jDHkuLrmraPluLhcclxuXHR0aGlzLnR1cm49MTsvL+eOqeWutuWbnuWQiOaVsFxyXG5cdHRoaXMudXNlQ2FyZEVuYWJsZWQ9MTsvL+aYr+WQpuS9v+eUqOWNoeeJjO+8jDHkuLrlj6/kvb/nlKjljaHniYxcclxuXHR0aGlzLmdvRW5hYmxlZD0xOy8v5piv5ZCm5Y+v5Lul6KGM6LWwLDHkuLrlj6/ku6XooYzotbBcclxuXHR0aGlzLnBhcnRlcj1wYXJ0ZXI7Ly/orr7nva7njqnlrrbpmJ/lj4tpZFxyXG5cdHRoaXMubm9kZT1ub2RlOy8v5Lq654mp6IqC54K5XHJcblx0cmV0dXJuIHRoaXM7XHJcbn1cclxuLy/nlJ/miJDku45taW5OdW3liLBtYXhOdW3nmoTpmo/mnLrmlbBcclxuZnVuY3Rpb24gcmFuZG9tTnVtKG1pbk51bSxtYXhOdW0peyBcclxuICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXsgXHJcbiAgICAgICAgY2FzZSAxOiBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkqbWluTnVtKzEsMTApOyBcclxuICAgICAgICBicmVhazsgXHJcbiAgICAgICAgY2FzZSAyOiBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkqKG1heE51bS1taW5OdW0rMSkrbWluTnVtLDEwKTsgXHJcbiAgICAgICAgYnJlYWs7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcclxuICAgICAgICAgICAgICAgIHJldHVybiAwOyBcclxuICAgICAgICAgICAgYnJlYWs7IFxyXG4gICAgfSBcclxufSAiXX0=