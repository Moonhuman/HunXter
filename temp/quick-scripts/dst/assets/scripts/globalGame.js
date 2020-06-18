
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
  isOver: false,
  cardnode: null
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
    isWait: false,
    msgBoxConent: null
  },
  updateUI: function updateUI() {//更新人物血量
  },
  onLoad: function onLoad() {
    //加载地图
    this.nowStep = 0;
    this.msgContent = cc.find('Canvas/msgBox/view/content/item'); //console.log(msgContent.getComponent(cc.Label));

    this.node.on('send-Msg', function (event, poster) {
      var name = '<color=#43CD80>' + poster + '</color>';

      if (poster == '系统') {
        name = '<color=#ff0000>' + poster + '</color>';
      }

      this.msgContent.getComponent(cc.RichText).string += name + ": " + event + '<br/>'; //可能需要动态改变content大小

      cc.find('Canvas/msgBox/view/content').height = this.msgContent.height + 10;
      cc.find('Canvas/msgBox').getComponent(cc.ScrollView).scrollToBottom(0.1); //console.log('Label',this.msgContent.height);
    }, this);
    this.node.on('update-state', function (msg) {
      this.nowStep = (this.nowStep + 1) % 4;
      this.isWait = false;
    }, this);
    cc.game.on('stepOnCell-done', function (event) {
      //触发结束
      this.node.emit('update-state', '1'); //更新状态
      //console.log("触发了特殊格子！");
    }, this);
    cc.game.on('route-chosen', function (route) {
      //监听玩家选择了哪条路径
      //console.log('点击了',route);
      this.nowProperty.moveByRoute(route); //this.node.emit('update-state', '1');//玩家移动完成，进入下一步操作
      //玩家头像按照路径移动
    }, this);
    this.InitialCard();
  },
  InitialCard: function InitialCard() {
    var cardName = ['炸弹', '精准导弹', '地雷', '庇护', '天使的庇护', '战神的祝福', '虚弱', '团队的力量', '治愈', '圣光普照', '望远镜', '眼睛', '猛男的祝福', '盗取', '束缚', '迷惑', '拯救'];
    var totCardNum = 17;
    window.global.cardnode = new Array();

    for (var i = 0; i < totCardNum; i++) {
      var node = new cc.Node(cardName[i]);
      node.addComponent(cc.Sprite);
      node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/卡牌图片/' + cardName[i] + '.jpg'));
      window.global.cardnode.push(node);
    }
  },
  start: function start() {
    //初始化人物
    this.initPersons(); //获得地图对象

    this.mapObj = cc.find('Canvas/map').getComponent('GetMap');
    this.nowPlayer = window.global.persons[this.index];
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
          } //this.node.emit('send-Msg','进入回合'+window.global.nowTurn,'系统');
          //console.log(this.nowPlayer.name);


          this.nowProperty = this.nowPlayer.getComponent('Person'); //获得玩家属性集合

          this.node.emit('send-Msg', '轮到角色' + this.nowProperty.nickname, '系统');
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

          if (this.nowProperty.goEnabled) {
            //判断玩家是否可以行走
            var step = randomNum(1, 6); //掷骰子，玩家步数

            this.node.emit('send-Msg', "获得筛子点数" + step, this.nowProperty.nickname);
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
          //console.log("当前步骤：",this.nowStep);
          //当前玩家的回合数-1
          this.nowProperty.turn -= 1;

          if (this.nowProperty.turn == 0) //当前玩家回合数为0，应该切换玩家
            {
              console.log("切换角色");
              this.nowProperty.turn += 1;
              this.index = (this.index + 1) % 4;
              this.nowPlayer = window.global.persons[this.index];
            }

          this.node.emit('update-state', '1');
          break;
        }
    }
  },
  initPersons: function initPersons() {
    window.global.persons[0].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar1'));
    window.global.persons[1].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar2'));
    window.global.persons[2].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar3'));
    window.global.persons[3].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar4'));
    window.global.persons[0].getComponent('Person').nickname = '老叟';
    window.global.persons[1].getComponent('Person').nickname = '少妇';
    window.global.persons[2].getComponent('Person').nickname = '富商';
    window.global.persons[3].getComponent('Person').nickname = '小女'; //初始化四个玩家位置
    //console.log(this.mapObj.map[0][0].getPosition());

    window.global.persons[0].getComponent('Person').move2Pos(0, 0);
    window.global.persons[1].getComponent('Person').move2Pos(10, 10);
    window.global.persons[2].getComponent('Person').move2Pos(0, 10);
    window.global.persons[3].getComponent('Person').move2Pos(10, 0);

    for (var i = 0; i < window.global.persons.length; i++) {
      var nowPerson = window.global.persons[i];
      var ctx = cc.find("bloodBar/bar", nowPerson).getComponent(cc.Graphics);
      ctx.clear();
      ctx.strokeColor = cc.Color.RED;
      ctx.moveTo(-40, -150);
      ctx.lineWidth = 10;
      ctx.lineTo(60, -150);
      ctx.stroke();
      var text = cc.find("bloodBar/text", nowPerson);
      text.getComponent(cc.Label).fontSize = 25;
      console.log(text.getComponent(cc.Label));
      text.setPosition(-100, -150); //设置行动值

      ctx = cc.find("mobilityBar/bar", nowPerson).getComponent(cc.Graphics);
      ctx.clear();
      ctx.strokeColor = cc.Color.GREEN;
      ctx.moveTo(-40, -180);
      ctx.lineTo(60, -180);
      ctx.lineWidth = 10;
      ctx.stroke();
      text = cc.find("mobilityBar/text", nowPerson);
      text.getComponent(cc.Label).fontSize = 25;
      console.log(text.getComponent(cc.Label));
      text.setPosition(-100, -200);
    }
  }
}); //生成从minNum到maxNum的随机数

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsR2FtZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibm93VHVybiIsImlzT3ZlciIsImNhcmRub2RlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtYXBPYmoiLCJpbmRleCIsIm5vd1N0ZXAiLCJub3dQbGF5ZXIiLCJub3dQcm9wZXJ0eSIsImlzV2FpdCIsIm1zZ0JveENvbmVudCIsInVwZGF0ZVVJIiwib25Mb2FkIiwibXNnQ29udGVudCIsImZpbmQiLCJub2RlIiwib24iLCJldmVudCIsInBvc3RlciIsIm5hbWUiLCJnZXRDb21wb25lbnQiLCJSaWNoVGV4dCIsInN0cmluZyIsImhlaWdodCIsIlNjcm9sbFZpZXciLCJzY3JvbGxUb0JvdHRvbSIsIm1zZyIsImdhbWUiLCJlbWl0Iiwicm91dGUiLCJtb3ZlQnlSb3V0ZSIsIkluaXRpYWxDYXJkIiwiY2FyZE5hbWUiLCJ0b3RDYXJkTnVtIiwiQXJyYXkiLCJpIiwiTm9kZSIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJ1cmwiLCJyYXciLCJwdXNoIiwic3RhcnQiLCJpbml0UGVyc29ucyIsInVwZGF0ZSIsImR0IiwiY29uc29sZSIsImxvZyIsIm5pY2tuYW1lIiwiZ29FbmFibGVkIiwic3RlcCIsInJhbmRvbU51bSIsInBvc0VuYWJsZSIsIm1hcCIsInBvc1giLCJwb3NZIiwidHVybiIsImJpbmRBdmF0YXIiLCJtb3ZlMlBvcyIsImxlbmd0aCIsIm5vd1BlcnNvbiIsImN0eCIsIkdyYXBoaWNzIiwiY2xlYXIiLCJzdHJva2VDb2xvciIsIkNvbG9yIiwiUkVEIiwibW92ZVRvIiwibGluZVdpZHRoIiwibGluZVRvIiwic3Ryb2tlIiwidGV4dCIsIkxhYmVsIiwiZm9udFNpemUiLCJzZXRQb3NpdGlvbiIsIkdSRUVOIiwibWluTnVtIiwibWF4TnVtIiwiYXJn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LEdBQWMsRUFBZDtBQUNBUCxNQUFBQSxHQUFHLENBQUNTLE1BQUo7QUFDQUMsTUFBQUEsSUFBSSxHQUFDekUsRUFBRSxDQUFDYyxJQUFILENBQVEsa0JBQVIsRUFBNEJnRCxTQUE1QixDQUFMO0FBQ0FXLE1BQUFBLElBQUksQ0FBQ3JELFlBQUwsQ0FBa0JwQixFQUFFLENBQUMwRSxLQUFyQixFQUE0QkMsUUFBNUIsR0FBcUMsRUFBckM7QUFDQTNCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZd0IsSUFBSSxDQUFDckQsWUFBTCxDQUFrQnBCLEVBQUUsQ0FBQzBFLEtBQXJCLENBQVo7QUFDQUQsTUFBQUEsSUFBSSxDQUFDRyxXQUFMLENBQWlCLENBQUMsR0FBbEIsRUFBc0IsQ0FBQyxHQUF2QjtBQUNBO0FBQ0Q7QUEzTE8sQ0FBVCxHQStMQTs7QUFDQSxTQUFTdkIsU0FBVCxDQUFtQnlCLE1BQW5CLEVBQTBCQyxNQUExQixFQUFpQztBQUM3QixVQUFPQyxTQUFTLENBQUNuQixNQUFqQjtBQUNJLFNBQUssQ0FBTDtBQUNJLGFBQU9vQixRQUFRLENBQUNDLElBQUksQ0FBQ0MsTUFBTCxLQUFjTCxNQUFkLEdBQXFCLENBQXRCLEVBQXdCLEVBQXhCLENBQWY7QUFDSjs7QUFDQSxTQUFLLENBQUw7QUFDSSxhQUFPRyxRQUFRLENBQUNDLElBQUksQ0FBQ0MsTUFBTCxNQUFlSixNQUFNLEdBQUNELE1BQVAsR0FBYyxDQUE3QixJQUFnQ0EsTUFBakMsRUFBd0MsRUFBeEMsQ0FBZjtBQUNKOztBQUNJO0FBQ0ksYUFBTyxDQUFQO0FBQ0o7QUFUUjtBQVdIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuZ2xvYmFsPXtcclxuXHRwZXJzb25zOltdLFxyXG5cdG5vd1R1cm46MCwvL+W9k+WJjeWbnuWQiOaVsFxyXG5cdGlzT3ZlcjpmYWxzZSxcclxuXHRjYXJkbm9kZSA6IG51bGwsXHJcbn07XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblx0XHRtYXBPYmo6bnVsbCwvL+WcsOWbvuWvueixoVxyXG5cdFx0cGVyc29uczpudWxsLC8v546p5a625LusXHJcblx0XHRpbmRleDowLFxyXG5cdFx0bm93U3RlcDowLFxyXG5cdFx0bm93UGxheWVyOm51bGwsXHJcblx0XHRub3dQcm9wZXJ0eTpudWxsLFxyXG5cdFx0aXNXYWl0OmZhbHNlLFxyXG5cdFx0bXNnQm94Q29uZW50Om51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVVJOmZ1bmN0aW9uKCl7XHJcblx0XHQvL+abtOaWsOS6uueJqeihgOmHj1xyXG5cdH0sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuXHRcdC8v5Yqg6L295Zyw5Zu+XHJcblx0XHR0aGlzLm5vd1N0ZXA9MDtcclxuXHRcdHRoaXMubXNnQ29udGVudD1jYy5maW5kKCdDYW52YXMvbXNnQm94L3ZpZXcvY29udGVudC9pdGVtJyk7XHJcblx0XHQvL2NvbnNvbGUubG9nKG1zZ0NvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSk7XHJcblx0XHR0aGlzLm5vZGUub24oJ3NlbmQtTXNnJyxmdW5jdGlvbihldmVudCxwb3N0ZXIpe1xyXG5cdFx0XHR2YXIgbmFtZT0nPGNvbG9yPSM0M0NEODA+Jytwb3N0ZXIrJzwvY29sb3I+JztcclxuXHRcdFx0aWYgKHBvc3Rlcj09J+ezu+e7nycpe1xyXG5cdFx0XHRcdG5hbWU9Jzxjb2xvcj0jZmYwMDAwPicrcG9zdGVyKyc8L2NvbG9yPic7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5tc2dDb250ZW50LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nKz1uYW1lK1wiOiBcIitldmVudCsnPGJyLz4nO1xyXG5cdFx0XHQvL+WPr+iDvemcgOimgeWKqOaAgeaUueWPmGNvbnRlbnTlpKflsI9cclxuXHRcdFx0XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9tc2dCb3gvdmlldy9jb250ZW50JykuaGVpZ2h0PXRoaXMubXNnQ29udGVudC5oZWlnaHQrMTA7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9tc2dCb3gnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Cb3R0b20oMC4xKTtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZygnTGFiZWwnLHRoaXMubXNnQ29udGVudC5oZWlnaHQpO1xyXG5cdFx0XHQgXHJcblx0XHR9LHRoaXMpO1xyXG5cdFx0XHRcclxuXHRcdHRoaXMubm9kZS5vbigndXBkYXRlLXN0YXRlJywgZnVuY3Rpb24gKG1zZykge1xyXG5cdFx0XHR0aGlzLm5vd1N0ZXA9KHRoaXMubm93U3RlcCsxKSU0O1xyXG5cdFx0XHR0aGlzLmlzV2FpdD1mYWxzZTtcclxuXHRcdFx0XHJcblx0XHR9LHRoaXMpO1xyXG5cdFx0Y2MuZ2FtZS5vbignc3RlcE9uQ2VsbC1kb25lJywgZnVuY3Rpb24gKCBldmVudCApIHsvL+inpuWPkee7k+adn1xyXG5cdFx0XHR0aGlzLm5vZGUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTsvL+abtOaWsOeKtuaAgVxyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwi6Kem5Y+R5LqG54m55q6K5qC85a2Q77yBXCIpO1xyXG5cdFx0fSx0aGlzKTtcclxuXHRcdGNjLmdhbWUub24oJ3JvdXRlLWNob3NlbicsIGZ1bmN0aW9uKHJvdXRlKSB7Ly/nm5HlkKznjqnlrrbpgInmi6nkuoblk6rmnaHot6/lvoRcclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ+eCueWHu+S6hicscm91dGUpO1xyXG5cdFx0XHR0aGlzLm5vd1Byb3BlcnR5Lm1vdmVCeVJvdXRlKHJvdXRlKTtcclxuXHRcdFx0XHRcdC8vdGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7Ly/njqnlrrbnp7vliqjlrozmiJDvvIzov5vlhaXkuIvkuIDmraXmk43kvZxcclxuXHRcdFx0XHRcdC8v546p5a625aS05YOP5oyJ54Wn6Lev5b6E56e75YqoXHJcblx0XHR9LHRoaXMpO1xyXG5cdFx0dGhpcy5Jbml0aWFsQ2FyZCgpO1xyXG5cdFx0XHJcblx0fSxcclxuXHRJbml0aWFsQ2FyZDogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgY2FyZE5hbWUgPSBbJ+eCuOW8uScsJ+eyvuWHhuWvvOW8uScsJ+WcsOmbtycsJ+W6h+aKpCcsJ+WkqeS9v+eahOW6h+aKpCcsJ+aImOelnueahOelneemjycsJ+iZmuW8sScsJ+WboumYn+eahOWKm+mHjycsXHJcblx0XHRcdFx0XHRcdFx0J+ayu+aEiCcsJ+Wco+WFieaZrueFpycsJ+acm+i/nOmVnCcsJ+ecvOedmycsJ+eMm+eUt+eahOelneemjycsJ+ebl+WPlicsJ+adn+e8micsJ+i/t+aDkScsJ+aLr+aVkSddO1xyXG5cdFx0dmFyIHRvdENhcmROdW0gPSAxNztcclxuXHRcdHdpbmRvdy5nbG9iYWwuY2FyZG5vZGUgPSBuZXcgQXJyYXkoKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdG90Q2FyZE51bTsgaSsrKSB7XHJcblx0XHRcdHZhciBub2RlID0gbmV3IGNjLk5vZGUoY2FyZE5hbWVbaV0pO1xyXG5cdFx0XHRub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG5cdFx0XHRub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKGNjLnVybC5yYXcoJ3Jlc291cmNlcy/ljaHniYzlm77niYcvJytjYXJkTmFtZVtpXSsnLmpwZycpKTtcclxuXHRcdFx0d2luZG93Lmdsb2JhbC5jYXJkbm9kZS5wdXNoKG5vZGUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcbiAgICBzdGFydCAoKSB7XHJcblx0XHQvL+WIneWni+WMluS6uueJqVxyXG5cdFx0dGhpcy5pbml0UGVyc29ucygpO1xyXG5cdFx0Ly/ojrflvpflnLDlm77lr7nosaFcclxuXHRcdHRoaXMubWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFxyXG5cdFx0dGhpcy5ub3dQbGF5ZXI9d2luZG93Lmdsb2JhbC5wZXJzb25zW3RoaXMuaW5kZXhdO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblx0XHQvL+WIpOaWreW9k+WJjeWbnuWQiOaYr+WQpue7k+adn1xyXG5cdFx0XHJcblx0XHRjb25zb2xlLmxvZyhcIuaYr+WQpuetieW+heaTjeS9nFwiLHRoaXMuaXNXYWl0KTtcclxuXHRcdHN3aXRjaCAodGhpcy5ub3dTdGVwKXtcclxuXHRcdFx0Y2FzZSAwOnsvL+WIneWni+WMluWPmOmHj1xyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvL3RoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsJ+i/m+WFpeWbnuWQiCcrd2luZG93Lmdsb2JhbC5ub3dUdXJuLCfns7vnu58nKTtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMubm93UGxheWVyLm5hbWUpO1xyXG5cdFx0XHRcdHRoaXMubm93UHJvcGVydHk9dGhpcy5ub3dQbGF5ZXIuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTsvL+iOt+W+l+eOqeWutuWxnuaAp+mbhuWQiFxyXG5cdFx0XHRcdHRoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsJ+i9ruWIsOinkuiJsicrdGhpcy5ub3dQcm9wZXJ0eS5uaWNrbmFtZSwn57O757ufJyk7XHJcblx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAxOnsvL+eOqeWutuenu+WKqFxyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAodGhpcy5ub3dQcm9wZXJ0eS5nb0VuYWJsZWQpey8v5Yik5pat546p5a625piv5ZCm5Y+v5Lul6KGM6LWwXHJcblx0XHRcdFx0XHR2YXIgc3RlcD1yYW5kb21OdW0oMSw2KTsvL+aOt+mqsOWtkO+8jOeOqeWutuatpeaVsFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR0aGlzLm5vZGUuZW1pdCgnc2VuZC1Nc2cnLFwi6I635b6X562b5a2Q54K55pWwXCIrc3RlcCx0aGlzLm5vd1Byb3BlcnR5Lm5pY2tuYW1lKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy5pc1dhaXQ9dHJ1ZTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMubWFwT2JqLnBvc0VuYWJsZSh0aGlzLm1hcE9iai5tYXBbdGhpcy5ub3dQcm9wZXJ0eS5wb3NYXVt0aGlzLm5vd1Byb3BlcnR5LnBvc1ldLHN0ZXApKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS5nb0VuYWJsZWQ9MTtcclxuXHRcdFx0XHRcdHRoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAyOntcclxuXHRcdFx0XHQvL+WujOaIkOS6huS6i+S7tuinpuWPkeaIluiAheWNoeeJjOinpuWPkVxyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIuW9k+WJjeatpemqpO+8mlwiLHRoaXMubm93U3RlcCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCLnjqnlrrblh7rniYxcIik7XHJcblx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAzOntcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwi5b2T5YmN5q2l6aqk77yaXCIsdGhpcy5ub3dTdGVwKTtcclxuXHRcdFx0XHQvL+W9k+WJjeeOqeWutueahOWbnuWQiOaVsC0xXHJcblx0XHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS50dXJuLT0xO1xyXG5cdFx0XHRcdGlmICh0aGlzLm5vd1Byb3BlcnR5LnR1cm49PTApLy/lvZPliY3njqnlrrblm57lkIjmlbDkuLow77yM5bqU6K+l5YiH5o2i546p5a62XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCLliIfmjaLop5LoibJcIik7XHJcblx0XHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LnR1cm4rPTE7XHJcblx0XHRcdFx0XHR0aGlzLmluZGV4PSh0aGlzLmluZGV4KzEpJTQ7XHJcblx0XHRcdFx0XHR0aGlzLm5vd1BsYXllcj13aW5kb3cuZ2xvYmFsLnBlcnNvbnNbdGhpcy5pbmRleF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHR9LFxyXG5cdGluaXRQZXJzb25zOmZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMScpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1sxXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmJpbmRBdmF0YXIoY2MuZmluZCgnQ2FudmFzL2F2YXRhci9hdmF0YXIyJykpO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzJdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjMnKSk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyNCcpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1swXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm5pY2tuYW1lPSfogIHlj58nO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykubmlja25hbWU9J+WwkeWmhyc7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5a+M5ZWGJztcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1szXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm5pY2tuYW1lPSflsI/lpbMnO1xyXG5cdFx0Ly/liJ3lp4vljJblm5vkuKrnjqnlrrbkvY3nva5cclxuXHRcdC8vY29uc29sZS5sb2codGhpcy5tYXBPYmoubWFwWzBdWzBdLmdldFBvc2l0aW9uKCkpO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzBdLmdldENvbXBvbmVudCgnUGVyc29uJykubW92ZTJQb3MoMCwwKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1sxXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDEwLDEwKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1syXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDAsMTApO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzNdLmdldENvbXBvbmVudCgnUGVyc29uJykubW92ZTJQb3MoMTAsMCk7XHJcblx0XHRmb3IgKHZhciBpPTA7aTx3aW5kb3cuZ2xvYmFsLnBlcnNvbnMubGVuZ3RoO2krKyl7XHJcblx0XHRcdHZhciBub3dQZXJzb249d2luZG93Lmdsb2JhbC5wZXJzb25zW2ldO1xyXG5cdFx0XHR2YXIgY3R4PWNjLmZpbmQoXCJibG9vZEJhci9iYXJcIiwgbm93UGVyc29uKS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG5cdFx0XHRjdHguY2xlYXIoKTtcclxuXHRcdFx0Y3R4LnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG5cdFx0XHRjdHgubW92ZVRvKC00MCwgLTE1MCk7XHJcblx0XHRcdGN0eC5saW5lV2lkdGg9MTA7XHJcblx0XHRcdGN0eC5saW5lVG8oNjAsIC0xNTApO1xyXG5cdFx0XHRjdHguc3Ryb2tlKCk7ICAgXHJcblx0XHRcdHZhciB0ZXh0PWNjLmZpbmQoXCJibG9vZEJhci90ZXh0XCIsIG5vd1BlcnNvbik7XHJcblx0XHRcdHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZT0yNTtcclxuXHRcdFx0Y29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcclxuXHRcdFx0dGV4dC5zZXRQb3NpdGlvbigtMTAwLC0xNTApO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly/orr7nva7ooYzliqjlgLxcclxuXHRcdFx0Y3R4PWNjLmZpbmQoXCJtb2JpbGl0eUJhci9iYXJcIiwgbm93UGVyc29uKS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG5cdFx0XHRjdHguY2xlYXIoKTtcclxuXHRcdFx0Y3R4LnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcblx0XHRcdGN0eC5tb3ZlVG8oLTQwLCAtMTgwKTtcclxuXHRcdFx0Y3R4LmxpbmVUbyg2MCwgLTE4MCk7XHJcblx0XHRcdGN0eC5saW5lV2lkdGg9MTA7XHJcblx0XHRcdGN0eC5zdHJva2UoKTsgIFxyXG5cdFx0XHR0ZXh0PWNjLmZpbmQoXCJtb2JpbGl0eUJhci90ZXh0XCIsIG5vd1BlcnNvbik7XHJcblx0XHRcdHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZT0yNTtcclxuXHRcdFx0Y29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcclxuXHRcdFx0dGV4dC5zZXRQb3NpdGlvbigtMTAwLC0yMDApO1x0XHRcdFxyXG5cdFx0fVxyXG5cdH0sXHJcbn0pO1xyXG5cclxuXHJcbi8v55Sf5oiQ5LuObWluTnVt5YiwbWF4TnVt55qE6ZqP5py65pWwXHJcbmZ1bmN0aW9uIHJhbmRvbU51bShtaW5OdW0sbWF4TnVtKXsgXHJcbiAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7IFxyXG4gICAgICAgIGNhc2UgMTogXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChNYXRoLnJhbmRvbSgpKm1pbk51bSsxLDEwKTsgXHJcbiAgICAgICAgYnJlYWs7IFxyXG4gICAgICAgIGNhc2UgMjogXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChNYXRoLnJhbmRvbSgpKihtYXhOdW0tbWluTnVtKzEpK21pbk51bSwxMCk7IFxyXG4gICAgICAgIGJyZWFrOyBcclxuICAgICAgICAgICAgZGVmYXVsdDogXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDsgXHJcbiAgICAgICAgICAgIGJyZWFrOyBcclxuICAgIH0gXHJcbn0gIl19