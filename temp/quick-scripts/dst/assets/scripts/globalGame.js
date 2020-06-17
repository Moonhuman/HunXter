
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
      //console.log(typeof(this.nowStep));
      this.nowStep = (this.nowStep + 1) % 3;
      this.isWait = false;
    }, this);
    cc.game.on('route-chosen', function (route) {
      //监听玩家选择了哪条路径
      console.log('点击了', route);
      this.nowProperty.moveByRoute(route);
      this.node.emit('update-state', '1'); //玩家移动完成，进入下一步操作
      //玩家头像按照路径移动
    }, this); //console.log(map.posEnable(map.map[0][0],3));
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
    console.log("步骤：", this.nowStep);

    switch (this.nowStep) {
      case 0:
        {
          //初始化变量
          if (this.isWait) {
            //正在操作或等待操作
            break;
          }

          console;
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

          console.log(this.isWait);

          if (this.nowProperty.goEnabled) {
            //判断玩家是否可以行走
            var step = randomNum(1, 6); //掷骰子，玩家步数

            console.log("掷骰子:" + step);
            console.log("当前起点:" + this.nowProperty.posX + "," + this.nowProperty.posY);
            this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY], step);
            this.isWait = true;
          }

          break;
        }

      case 2:
        {
          //切换下一个玩家
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsR2FtZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibm93VHVybiIsImlzT3ZlciIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibWFwT2JqIiwiaW5kZXgiLCJub3dTdGVwIiwibm93UGxheWVyIiwibm93UHJvcGVydHkiLCJpc1dhaXQiLCJvbkxvYWQiLCJub2RlIiwib24iLCJtc2ciLCJnYW1lIiwicm91dGUiLCJjb25zb2xlIiwibG9nIiwibW92ZUJ5Um91dGUiLCJlbWl0Iiwic3RhcnQiLCJnZXRDb21wb25lbnQiLCJiaW5kQXZhdGFyIiwiZmluZCIsIm1vdmUyUG9zIiwidXBkYXRlIiwiZHQiLCJnb0VuYWJsZWQiLCJzdGVwIiwicmFuZG9tTnVtIiwicG9zWCIsInBvc1kiLCJwb3NFbmFibGUiLCJtYXAiLCJQZXJzb24iLCJuYW1lIiwibnVtIiwicG9zIiwicGFydGVyIiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIkFycmF5IiwibXlTdGF0dXMiLCJ0dXJuIiwidXNlQ2FyZEVuYWJsZWQiLCJtaW5OdW0iLCJtYXhOdW0iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwYXJzZUludCIsIk1hdGgiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFjO0FBQ2JDLEVBQUFBLE9BQU8sRUFBQyxFQURLO0FBRWJDLEVBQUFBLE9BQU8sRUFBQyxDQUZLO0FBRUg7QUFDVkMsRUFBQUEsTUFBTSxFQUFDO0FBSE0sQ0FBZDtBQUtBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEsTUFBTSxFQUFDLElBRE87QUFDRjtBQUNaUCxJQUFBQSxPQUFPLEVBQUMs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WixDQVp3QyxDQVlyQjs7QUFDbkIsT0FBSzNCLElBQUwsR0FBVUEsSUFBVixDQWJ3QyxDQWF6Qjs7QUFDZixTQUFPLElBQVA7QUFDQSxFQUNEOzs7QUFDQSxTQUFTa0IsU0FBVCxDQUFtQm9CLE1BQW5CLEVBQTBCQyxNQUExQixFQUFpQztBQUM3QixVQUFPQyxTQUFTLENBQUNDLE1BQWpCO0FBQ0ksU0FBSyxDQUFMO0FBQ0ksYUFBT0MsUUFBUSxDQUFDQyxJQUFJLENBQUNDLE1BQUwsS0FBY04sTUFBZCxHQUFxQixDQUF0QixFQUF3QixFQUF4QixDQUFmO0FBQ0o7O0FBQ0EsU0FBSyxDQUFMO0FBQ0ksYUFBT0ksUUFBUSxDQUFDQyxJQUFJLENBQUNDLE1BQUwsTUFBZUwsTUFBTSxHQUFDRCxNQUFQLEdBQWMsQ0FBN0IsSUFBZ0NBLE1BQWpDLEVBQXdDLEVBQXhDLENBQWY7QUFDSjs7QUFDSTtBQUNJLGFBQU8sQ0FBUDtBQUNKO0FBVFI7QUFXSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lmdsb2JhbD17XHJcblx0cGVyc29uczpbXSxcclxuXHRub3dUdXJuOjAsLy/lvZPliY3lm57lkIjmlbBcclxuXHRpc092ZXI6ZmFsc2UsXHJcbn07XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblx0XHRtYXBPYmo6bnVsbCwvL+WcsOWbvuWvueixoVxyXG5cdFx0cGVyc29uczpudWxsLC8v546p5a625LusXHJcblx0XHRpbmRleDowLFxyXG5cdFx0bm93U3RlcDowLFxyXG5cdFx0bm93UGxheWVyOm51bGwsXHJcblx0XHRub3dQcm9wZXJ0eTpudWxsLFxyXG5cdFx0aXNXYWl0OmZhbHNlLFxyXG5cdFx0XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcblx0XHQvL+WKoOi9veWcsOWbvlxyXG5cdFx0dGhpcy5ub3dTdGVwPTA7XHJcblx0XHR0aGlzLm5vZGUub24oJ3VwZGF0ZS1zdGF0ZScsIGZ1bmN0aW9uIChtc2cpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0eXBlb2YodGhpcy5ub3dTdGVwKSk7XHJcblx0XHRcdHRoaXMubm93U3RlcD0odGhpcy5ub3dTdGVwKzEpJTM7XHJcblx0XHRcdHRoaXMuaXNXYWl0PWZhbHNlO1xyXG5cdFx0XHRcclxuXHRcdH0sdGhpcyk7XHJcblx0XHRjYy5nYW1lLm9uKCdyb3V0ZS1jaG9zZW4nLCBmdW5jdGlvbihyb3V0ZSkgey8v55uR5ZCs546p5a626YCJ5oup5LqG5ZOq5p2h6Lev5b6EXHJcblx0XHRcdGNvbnNvbGUubG9nKCfngrnlh7vkuoYnLHJvdXRlKTtcclxuXHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS5tb3ZlQnlSb3V0ZShyb3V0ZSk7XHJcblx0XHRcdHRoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpOy8v546p5a6256e75Yqo5a6M5oiQ77yM6L+b5YWl5LiL5LiA5q2l5pON5L2cXHJcblx0XHRcdC8v546p5a625aS05YOP5oyJ54Wn6Lev5b6E56e75YqoXHJcblx0XHR9LHRoaXMpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhtYXAucG9zRW5hYmxlKG1hcC5tYXBbMF1bMF0sMykpO1xyXG5cdFx0XHJcblx0fSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMScpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1sxXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmJpbmRBdmF0YXIoY2MuZmluZCgnQ2FudmFzL2F2YXRhci9hdmF0YXIyJykpO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzJdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjMnKSk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyNCcpKTtcclxuXHRcdHRoaXMubWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLm1hcE9iai5wb3NFbmFibGUodGhpcy5tYXBPYmoubWFwWzBdWzBdLDMpKTtcclxuXHRcdHRoaXMubm93UGxheWVyPXdpbmRvdy5nbG9iYWwucGVyc29uc1t0aGlzLmluZGV4XTtcclxuXHRcdC8vY29uc29sZS5sb2codGhpcy5tYXBPYmoubWFwKTtcclxuXHRcdC8v5Yid5aeL5YyW5Zub5Liq546p5a625L2N572uXHJcblx0XHQvL2NvbnNvbGUubG9nKHRoaXMubWFwT2JqLm1hcFswXVswXS5nZXRQb3NpdGlvbigpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1swXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDAsMCk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygxMCwxMCk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygwLDEwKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1szXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDEwLDApO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblx0XHQvL+WIpOaWreW9k+WJjeWbnuWQiOaYr+WQpue7k+adn1xyXG5cdFx0Y29uc29sZS5sb2coXCLmraXpqqTvvJpcIix0aGlzLm5vd1N0ZXApO1xyXG5cdFx0c3dpdGNoICh0aGlzLm5vd1N0ZXApe1xyXG5cdFx0XHRjYXNlIDA6ey8v5Yid5aeL5YyW5Y+Y6YePXHJcblx0XHRcdFx0aWYgKHRoaXMuaXNXYWl0KXsvL+ato+WcqOaTjeS9nOaIluetieW+heaTjeS9nFxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnNvbGVcclxuXHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5PXRoaXMubm93UGxheWVyLmdldENvbXBvbmVudCgnUGVyc29uJyk7Ly/ojrflvpfnjqnlrrblsZ7mgKfpm4blkIhcclxuXHRcdFx0XHR0aGlzLm5vZGUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcclxuXHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAxOnsvL+eOqeWutuenu+WKqFxyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmlzV2FpdCk7XHJcblx0XHRcdFx0aWYgKHRoaXMubm93UHJvcGVydHkuZ29FbmFibGVkKXsvL+WIpOaWreeOqeWutuaYr+WQpuWPr+S7peihjOi1sFxyXG5cdFx0XHRcdFx0dmFyIHN0ZXA9cmFuZG9tTnVtKDEsNik7Ly/mjrfpqrDlrZDvvIznjqnlrrbmraXmlbBcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5o636aqw5a2QOlwiK3N0ZXApO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCLlvZPliY3otbfngrk6XCIrdGhpcy5ub3dQcm9wZXJ0eS5wb3NYK1wiLFwiK3RoaXMubm93UHJvcGVydHkucG9zWSk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcE9iai5wb3NFbmFibGUodGhpcy5tYXBPYmoubWFwW3RoaXMubm93UHJvcGVydHkucG9zWF1bdGhpcy5ub3dQcm9wZXJ0eS5wb3NZXSxzdGVwKTtcclxuXHRcdFx0XHRcdHRoaXMuaXNXYWl0PXRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCBicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXNlIDI6e1xyXG5cdFx0XHRcdC8v5YiH5o2i5LiL5LiA5Liq546p5a62XHJcblx0XHRcdFx0dGhpcy5pbmRleD0odGhpcy5pbmRleCsxKSU0O1xyXG5cdFx0XHRcdHRoaXMubm93UGxheWVyPXdpbmRvdy5nbG9iYWwucGVyc29uc1t0aGlzLmluZGV4XTtcclxuXHRcdFx0XHR0aGlzLm5vZGUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcclxuXHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vY29uc29sZS5sb2cobm93UHJvcGVydHkuZ29FbmFibGVkKTtcclxuXHR9LFxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIFBlcnNvbihuYW1lLG51bSxwb3MscGFydGVyLG5vZGUpe1xyXG5cdHRoaXMubmFtZT1uYW1lOy8v546p5a625pi156ewXHJcblx0dGhpcy5JRD1udW07Ly/njqnlrrbnvJblj7dcclxuXHR0aGlzLnBvc2l0aW9uPXBvczsvL+eOqeWutuW9k+WJjeS9jee9rlxyXG5cdHRoaXMuYXR0YWNrPTE7Ly/njqnlrrbmlLvlh7vlipvvvIzliJ3lp4vkuLox54K5XHJcblx0dGhpcy5ibG9vZD0xMDsvL+eOqeWutuihgOmHjyzliJ3lp4vkuLoy54K577yM5q+P5Zue5ZCI5oGi5aSNMueCuVxyXG5cdHRoaXMubW9iaWxpdHk9MjsvL+eOqeWutuihjOWKqOWAvFxyXG5cdHRoaXMuY2FyZHM9bmV3IEFycmF5KCk7Ly/njqnlrrbmjIHmnInljaHniYznu4RcclxuXHR0aGlzLm15U3RhdHVzPTE7Ly8w5Li65q275Lqh77yMMeS4uuato+W4uFxyXG5cdHRoaXMudHVybj0xOy8v546p5a625Zue5ZCI5pWwXHJcblx0dGhpcy51c2VDYXJkRW5hYmxlZD0xOy8v5piv5ZCm5L2/55So5Y2h54mM77yMMeS4uuWPr+S9v+eUqOWNoeeJjFxyXG5cdHRoaXMuZ29FbmFibGVkPTE7Ly/mmK/lkKblj6/ku6XooYzotbAsMeS4uuWPr+S7peihjOi1sFxyXG5cdHRoaXMucGFydGVyPXBhcnRlcjsvL+iuvue9rueOqeWutumYn+WPi2lkXHJcblx0dGhpcy5ub2RlPW5vZGU7Ly/kurrnianoioLngrlcclxuXHRyZXR1cm4gdGhpcztcclxufVxyXG4vL+eUn+aIkOS7jm1pbk51beWIsG1heE51beeahOmaj+acuuaVsFxyXG5mdW5jdGlvbiByYW5kb21OdW0obWluTnVtLG1heE51bSl7IFxyXG4gICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpeyBcclxuICAgICAgICBjYXNlIDE6IFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSptaW5OdW0rMSwxMCk7IFxyXG4gICAgICAgIGJyZWFrOyBcclxuICAgICAgICBjYXNlIDI6IFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSoobWF4TnVtLW1pbk51bSsxKSttaW5OdW0sMTApOyBcclxuICAgICAgICBicmVhazsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7IFxyXG4gICAgICAgICAgICBicmVhazsgXHJcbiAgICB9IFxyXG59ICJdfQ==