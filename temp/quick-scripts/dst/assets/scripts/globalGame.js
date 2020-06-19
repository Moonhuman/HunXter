
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
  cardnode: null,
  bgm: {
    audio: null,
    loop: null,
    volume: null
  }
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
    msgBoxConent: null,
    time: 0
  },
  end_card_btn_func: function end_card_btn_func() {
    cc.game.emit('update-state', '1');
    cc.find("Canvas/end_card_btn").active = false;
  },
  updateUI: function updateUI() {//更新人物血量
  },
  onLoad: function onLoad() {
    //加载地图
    this.nowStep = 0;
    this.msgContent = cc.find('Canvas/msgBox/view/content/item'); //console.log(msgContent.getComponent(cc.Label));

    this.node.on('send-Msg', function (event, poster) {
      var timeStr = '';
      if (parseInt(this.time / 60) < 10) timeStr += "0";
      timeStr += parseInt(this.time / 60) + ":";
      if (this.time - parseInt(this.time / 60) * 60 < 10) timeStr += "0";
      timeStr += this.time - parseInt(this.time / 60) * 60;
      var name = '<color=#43CD80>(' + timeStr + ')' + poster + '</color>';

      if (poster == '系统') {
        name = '<color=#ff0000>(' + timeStr + ')' + poster + '</color>';
      }

      this.msgContent.getComponent(cc.RichText).string += name + ": " + event + '<br/>'; //可能需要动态改变content大小

      cc.find('Canvas/msgBox/view/content').height = this.msgContent.height + 10;
      cc.find('Canvas/msgBox').getComponent(cc.ScrollView).scrollToBottom(0.1); //console.log('Label',this.msgContent.height);
    }, this);
    cc.game.on('update-state', function (msg) {
      this.nowStep = (this.nowStep + 1) % 5;
      this.isWait = false;
    }, this);
    cc.game.on('stepOnCell-done', function (event) {
      //触发结束
      cc.game.emit('update-state', '1'); //更新状态
      //console.log("触发了特殊格子！");
    }, this);
    cc.game.on('route-chosen', function (route) {
      //监听玩家选择了哪条路径
      //console.log('点击了',route);
      this.nowProperty.moveByRoute(route); //this.node.emit('update-state', '1');//玩家移动完成，进入下一步操作
      //玩家头像按照路径移动
    }, this);
    cc.game.on('roll-dice-done', function (step) {
      this.node.emit('send-Msg', "获得骰子点数" + step, this.nowProperty.nickname);
      console.log(this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY], step));
    }, this);
    this.InitialCard();
    this.initBgm();
    cc.find('Canvas/time').getComponent(cc.Label).schedule(function () {
      cc.find('Canvas').getComponent('globalGame').time += 1;
      var time = cc.find('Canvas').getComponent('globalGame').time; //console.log(time);

      this.string = "Time: ";
      if (parseInt(time / 60) < 10) this.string += "0";
      this.string += parseInt(time / 60) + ":";
      if (time - parseInt(time / 60) * 60 < 10) this.string += "0";
      this.string += time - parseInt(time / 60) * 60; //cc.find('Canvas').getComponent('globalGame').timeStr=this.string;
    }, 1);
    this.node.emit('send-Msg', '好戏开场了!', '系统');
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
          cc.game.emit('update-state', '1');
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
            var tip = cc.find('Canvas/tipWin');
            tip.getComponent('tipWindow').startRollDice();
            this.isWait = true;
          } else {
            this.nowProperty.goEnabled = 1;
            cc.game.emit('update-state', '1');
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
          cc.game.emit('update-state', '1');
          break;
        }

      case 3:
        {
          //等待玩家出牌并结束
          if (this.nowProperty.useCardEnabled == 1) {
            //可以出牌
            var btn = cc.find('Canvas/end_card_btn');
            btn.active = true;
          } else {
            cc.game.emit('update-state', '1');
          }

          break;
        }

      case 4:
        {
          //这里原本是case:3
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

          cc.game.emit('update-state', '1');
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
      text.getComponent(cc.Label).fontSize = 25; //console.log(text.getComponent(cc.Label));

      text.setPosition(-100, -150); //设置行动值

      ctx = cc.find("mobilityBar/bar", nowPerson).getComponent(cc.Graphics);
      ctx.clear();
      ctx.strokeColor = cc.Color.GREEN;
      ctx.moveTo(-40, -180);
      ctx.lineTo(60, -180);
      ctx.lineWidth = 10;
      ctx.stroke();
      text = cc.find("mobilityBar/text", nowPerson);
      text.getComponent(cc.Label).fontSize = 25; //console.log(text.getComponent(cc.Label));

      text.setPosition(-100, -200);
    }
  },
  initBgm: function initBgm() {
    cc.loader.loadRes('bgm/天空之城钢琴曲', cc.AudioClip, function (err, clip) {
      var audioID = cc.audioEngine.play(clip, true, 0.5);
    });
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
    } //隐藏结束按钮


    cc.find('Canvas/end_card_btn').active = false; //隐藏选牌确定按钮

    cc.find('Canvas/choose_card_confirm').active = false; //隐藏选牌取消按钮

    cc.find('Canvas/choose_card_cancel').active = false; //初始化BGM

    this.initBgm();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsR2FtZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibm93VHVybiIsImlzT3ZlciIsImNhcmRub2RlIiwiYmdtIiwiYXVkaW8iLCJsb29wIiwidm9sdW1lIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtYXBPYmoiLCJpbmRleCIsIm5vd1N0ZXAiLCJub3dQbGF5ZXIiLCJub3dQcm9wZXJ0eSIsImlzV2FpdCIsIm1zZ0JveENvbmVudCIsInRpbWUiLCJlbmRfY2FyZF9idG5fZnVuYyIsImdhbWUiLCJlbWl0IiwiZmluZCIsImFjdGl2ZSIsInVwZGF0ZVVJIiwib25Mb2FkIiwibXNnQ29udGVudCIsIm5vZGUiLCJvbiIsImV2ZW50IiwicG9zdGVyIiwidGltZVN0ciIsInBhcnNlSW50IiwibmFtZSIsImdldENvbXBvbmVudCIsIlJpY2hUZXh0Iiwic3RyaW5nIiwiaGVpZ2h0IiwiU2Nyb2xsVmlldyIsInNjcm9sbFRvQm90dG9tIiwibXNnIiwicm91dGUiLCJtb3ZlQnlSb3V0ZSIsInN0ZXAiLCJuaWNrbmFtZSIsImNvbnNvbGUiLCJsb2ciLCJwb3NFbmFibGUiLCJtYXAiLCJwb3NYIiwicG9zWSIsIkluaXRpYWxDYXJkIiwiaW5pdEJnbSIsIkxhYmVsIiwic2NoZWR1bGUiLCJzdGFydCIsImluaXRQZXJzb25zIiwidXBkYXRlIiwiZHQiLCJnb0VuYWJsZWQiLCJ0aXAiLCJzdGFydFJvbGxEaWNlIiwidXNlQ2FyZEVuYWJsZWQiLCJidG4iLCJ0dXJuIiwiYmluZEF2YXRhciIsIm1vdmUyUG9zIiwiaSIsImxlbmd0aCIsIm5vd1BlcnNvbiIsImN0eCIsIkdyYXBoaWNzIiwiY2xlYXIiLCJzdHJva2VDb2xvciIsIkNvbG9yIiwiUkVEIiwibW92ZVRvIiwibGluZVdpZHRoIiwibGluZVRvIiwic3Ryb2tlIiwidGV4dCIsImZvbnRTaXplIiwic2V0UG9zaXRpb24iLCJHUkVFTiIsImxvYWRlciIsImxvYWRSZXMiLCJBdWRpb0NsaXAiLCJlcnIiLCJjbGlwIiwiYXVkaW9JRCIsImF1ZGlvRW5naW5lIiwicGxheSIsImNhcmROYW1lIiwidG90Q2FyZE51bSIsIkFycmF5IiwiTm9kZSIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJ1cmwiLCJyYXciLCJwdXNoIiwicmFuZG9tTnVtIiwibWluTnVtIiwibWF4TnVtIiwiYXJndW1lbnRzIiwiTWF0aCIsInJhbmRvbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWM7QUFDYkMsRUFBQUEsT0FBTyxFQUFDLEVBREs7QUFFYkMsRUFBQUEsT0FBTyxFQUFDLENBRks7QUFFSDtBQUNWQyxFQUFBQSxNQUFNLEVBQUMsS0FITTtBQUliQyxFQUFBQSxRQUFRLEVBQUcsSUFKRTtBQUtiQyxFQUFBQSxHQUFHLEVBQUM7QUFDSEMsSUFBQUEsS0FBSyxFQUFDLElBREg7QUFFSEMsSUFBQUEsSUFBSSxFQUFDLElBRkY7QUFHSEMsSUFBQUEsTUFBTSxFQUFDO0FBSEo7QUFMUyxDQUFkO0FBV0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNkQyxJQUFBQSxNQUFNLEVBQUMsSUFETztBQUNGO0FBQ1paLElBQUFBLE9BQU8sRUFBQyxJQUZNO0FBRUQ7QUFDYmEsSUFBQUEsS0FBSyxFQUFDLENBSFE7QUFJZEMsSUFBQUEsT0FBTyxFQUFDLENBSk07QUFLZEMsSUFBQUEsU0FBUyxFQUFDLElBTEk7QUFNZEMsSUFBQUEsV0FBVyxFQUFDLElBTkU7QUFPZEMsSUFBQUEsTUFBTSxFQUFDLEtBUE87QUFRZEMsSUFBQUEsWUFBWSxFQUFDLElBUkM7QUFTZEMsSUFBQUEsSUFBSSxFQUFDO0FBVFMsR0FIUDtBQWVSQyxFQUFBQSxpQkFBaUIsRUFBQyw2QkFBVztB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QkFBUixFQUErQkMsTUFBL0IsR0FBd0MsS0FBeEMsQ0FadUIsQ0FhdkI7O0FBQ0FoQixJQUFBQSxFQUFFLENBQUNlLElBQUgsQ0FBUSw0QkFBUixFQUFzQ0MsTUFBdEMsR0FBNkMsS0FBN0MsQ0FkdUIsQ0FldkI7O0FBQ0FoQixJQUFBQSxFQUFFLENBQUNlLElBQUgsQ0FBUSwyQkFBUixFQUFxQ0MsTUFBckMsR0FBNEMsS0FBNUMsQ0FoQnVCLENBaUJ2Qjs7QUFDQSxTQUFLNkIsT0FBTDtBQUNBO0FBblBPLENBQVQsR0F1UEE7O0FBQ0EsU0FBU21ELFNBQVQsQ0FBbUJDLE1BQW5CLEVBQTBCQyxNQUExQixFQUFpQztBQUM3QixVQUFPQyxTQUFTLENBQUN0QyxNQUFqQjtBQUNJLFNBQUssQ0FBTDtBQUNJLGFBQU9wQyxRQUFRLENBQUMyRSxJQUFJLENBQUNDLE1BQUwsS0FBY0osTUFBZCxHQUFxQixDQUF0QixFQUF3QixFQUF4QixDQUFmO0FBQ0o7O0FBQ0EsU0FBSyxDQUFMO0FBQ0ksYUFBT3hFLFFBQVEsQ0FBQzJFLElBQUksQ0FBQ0MsTUFBTCxNQUFlSCxNQUFNLEdBQUNELE1BQVAsR0FBYyxDQUE3QixJQUFnQ0EsTUFBakMsRUFBd0MsRUFBeEMsQ0FBZjtBQUNKOztBQUNJO0FBQ0ksYUFBTyxDQUFQO0FBQ0o7QUFUUjtBQVdIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuZ2xvYmFsPXtcblx0cGVyc29uczpbXSxcblx0bm93VHVybjowLC8v5b2T5YmN5Zue5ZCI5pWwXG5cdGlzT3ZlcjpmYWxzZSxcblx0Y2FyZG5vZGUgOiBudWxsLFxuXHRiZ206e1xuXHRcdGF1ZGlvOm51bGwsXG5cdFx0bG9vcDpudWxsLFxuXHRcdHZvbHVtZTpudWxsLFxuXHR9XG59O1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblx0XHRtYXBPYmo6bnVsbCwvL+WcsOWbvuWvueixoVxuXHRcdHBlcnNvbnM6bnVsbCwvL+eOqeWutuS7rFxuXHRcdGluZGV4OjAsXG5cdFx0bm93U3RlcDowLFxuXHRcdG5vd1BsYXllcjpudWxsLFxuXHRcdG5vd1Byb3BlcnR5Om51bGwsXG5cdFx0aXNXYWl0OmZhbHNlLFxuXHRcdG1zZ0JveENvbmVudDpudWxsLFxuXHRcdHRpbWU6MCxcbiAgICB9LFxuXHRcblx0ZW5kX2NhcmRfYnRuX2Z1bmM6ZnVuY3Rpb24oKSB7XG5cdFx0Y2MuZ2FtZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xuXHRcdGNjLmZpbmQoXCJDYW52YXMvZW5kX2NhcmRfYnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xuXHR9LFxuXHRcbiAgICB1cGRhdGVVSTpmdW5jdGlvbigpe1xuXHRcdC8v5pu05paw5Lq654mp6KGA6YePXG5cdH0sXG5cbiAgICBvbkxvYWQgKCkge1xuXHRcdC8v5Yqg6L295Zyw5Zu+XG5cdFx0dGhpcy5ub3dTdGVwPTA7XG5cdFx0dGhpcy5tc2dDb250ZW50PWNjLmZpbmQoJ0NhbnZhcy9tc2dCb3gvdmlldy9jb250ZW50L2l0ZW0nKTtcblx0XHQvL2NvbnNvbGUubG9nKG1zZ0NvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSk7XG5cdFx0dGhpcy5ub2RlLm9uKCdzZW5kLU1zZycsZnVuY3Rpb24oZXZlbnQscG9zdGVyKXtcblx0XHRcdHZhciB0aW1lU3RyPScnO1xuXHRcdFx0aWYgKHBhcnNlSW50KHRoaXMudGltZS82MCk8MTApXG5cdFx0XHRcdHRpbWVTdHIrPVwiMFwiXG5cdFx0XHR0aW1lU3RyKz1wYXJzZUludCh0aGlzLnRpbWUvNjApK1wiOlwiO1xuXHRcdFx0aWYgKHRoaXMudGltZS1wYXJzZUludCh0aGlzLnRpbWUvNjApKjYwPDEwKVxuXHRcdFx0XHR0aW1lU3RyKz1cIjBcIlxuXHRcdFx0dGltZVN0cis9KHRoaXMudGltZS1wYXJzZUludCh0aGlzLnRpbWUvNjApKjYwKTtcblx0XHRcdFxuXHRcdFx0dmFyIG5hbWU9Jzxjb2xvcj0jNDNDRDgwPignK3RpbWVTdHIrJyknK3Bvc3RlcisnPC9jb2xvcj4nO1xuXHRcdFx0aWYgKHBvc3Rlcj09J+ezu+e7nycpe1xuXHRcdFx0XHRuYW1lPSc8Y29sb3I9I2ZmMDAwMD4oJyt0aW1lU3RyKycpJytwb3N0ZXIrJzwvY29sb3I+Jztcblx0XHRcdH1cblx0XHRcdHRoaXMubXNnQ29udGVudC5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZys9bmFtZStcIjogXCIrZXZlbnQrJzxici8+Jztcblx0XHRcdC8v5Y+v6IO96ZyA6KaB5Yqo5oCB5pS55Y+YY29udGVudOWkp+Wwj1xuXHRcdFx0XG5cdFx0XHRjYy5maW5kKCdDYW52YXMvbXNnQm94L3ZpZXcvY29udGVudCcpLmhlaWdodD10aGlzLm1zZ0NvbnRlbnQuaGVpZ2h0KzEwO1xuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL21zZ0JveCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgwLjEpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnTGFiZWwnLHRoaXMubXNnQ29udGVudC5oZWlnaHQpO1xuXHRcdFx0IFxuXHRcdH0sdGhpcyk7XG5cdFx0XHRcblx0XHRjYy5nYW1lLm9uKCd1cGRhdGUtc3RhdGUnLCBmdW5jdGlvbiAobXNnKSB7XG5cdFx0XHR0aGlzLm5vd1N0ZXA9KHRoaXMubm93U3RlcCsxKSU1O1xuXHRcdFx0dGhpcy5pc1dhaXQ9ZmFsc2U7XG5cdFx0XHRcblx0XHR9LHRoaXMpO1xuXHRcdGNjLmdhbWUub24oJ3N0ZXBPbkNlbGwtZG9uZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7Ly/op6blj5Hnu5PmnZ9cblx0XHRcdGNjLmdhbWUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTsvL+abtOaWsOeKtuaAgVxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcIuinpuWPkeS6hueJueauiuagvOWtkO+8gVwiKTtcblx0XHR9LHRoaXMpO1xuXHRcdGNjLmdhbWUub24oJ3JvdXRlLWNob3NlbicsIGZ1bmN0aW9uKHJvdXRlKSB7Ly/nm5HlkKznjqnlrrbpgInmi6nkuoblk6rmnaHot6/lvoRcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCfngrnlh7vkuoYnLHJvdXRlKTtcblx0XHRcdHRoaXMubm93UHJvcGVydHkubW92ZUJ5Um91dGUocm91dGUpO1xuXHRcdFx0XHRcdC8vdGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7Ly/njqnlrrbnp7vliqjlrozmiJDvvIzov5vlhaXkuIvkuIDmraXmk43kvZxcblx0XHRcdFx0XHQvL+eOqeWutuWktOWDj+aMieeFp+i3r+W+hOenu+WKqFxuXHRcdH0sdGhpcyk7XG5cdFx0Y2MuZ2FtZS5vbigncm9sbC1kaWNlLWRvbmUnLGZ1bmN0aW9uKHN0ZXApe1xuXHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3NlbmQtTXNnJyxcIuiOt+W+l+mqsOWtkOeCueaVsFwiK3N0ZXAsdGhpcy5ub3dQcm9wZXJ0eS5uaWNrbmFtZSk7XG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLm1hcE9iai5wb3NFbmFibGUodGhpcy5tYXBPYmoubWFwW3RoaXMubm93UHJvcGVydHkucG9zWF1bdGhpcy5ub3dQcm9wZXJ0eS5wb3NZXSxzdGVwKSk7XG5cdFx0fSx0aGlzKTtcblx0XHR0aGlzLkluaXRpYWxDYXJkKCk7XG5cdFx0dGhpcy5pbml0QmdtKCk7XG5cdFx0Y2MuZmluZCgnQ2FudmFzL3RpbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnNjaGVkdWxlKGZ1bmN0aW9uKCkge1xuXHRcdFx0XG5cdFx0XHRjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS50aW1lKz0xO1xuXHRcdFx0dmFyIHRpbWU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykudGltZTtcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XG5cdFx0XHR0aGlzLnN0cmluZz1cIlRpbWU6IFwiXG5cdFx0XHRpZiAocGFyc2VJbnQodGltZS82MCk8MTApXG5cdFx0XHRcdHRoaXMuc3RyaW5nKz1cIjBcIlxuXHRcdFx0dGhpcy5zdHJpbmcrPXBhcnNlSW50KHRpbWUvNjApK1wiOlwiO1xuXHRcdFx0aWYgKHRpbWUtcGFyc2VJbnQodGltZS82MCkqNjA8MTApXG5cdFx0XHRcdHRoaXMuc3RyaW5nKz1cIjBcIlxuXHRcdFx0dGhpcy5zdHJpbmcrPSh0aW1lLXBhcnNlSW50KHRpbWUvNjApKjYwKTtcblx0XHRcdC8vY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykudGltZVN0cj10aGlzLnN0cmluZztcblx0XHQgfSwgMSk7XG5cdFx0IHRoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsJ+WlveaIj+W8gOWcuuS6hiEnLCfns7vnu58nKTtcblx0fSxcblx0XG4gICAgc3RhcnQgKCkge1xuXHRcdC8v5Yid5aeL5YyW5Lq654mpXG5cdFx0dGhpcy5pbml0UGVyc29ucygpO1xuXHRcdC8v6I635b6X5Zyw5Zu+5a+56LGhXG5cdFx0dGhpcy5tYXBPYmo9Y2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XG5cdFxuXHRcdHRoaXMubm93UGxheWVyPXdpbmRvdy5nbG9iYWwucGVyc29uc1t0aGlzLmluZGV4XTtcblx0XHRcblx0XHRcblx0XHRcbiAgICB9LFxuXG4gICAgdXBkYXRlIChkdCkge1xuXHRcdC8v5Yik5pat5b2T5YmN5Zue5ZCI5piv5ZCm57uT5p2fXG5cdFx0XG5cdFx0Y29uc29sZS5sb2coXCLmmK/lkKbnrYnlvoXmk43kvZxcIix0aGlzLmlzV2FpdCk7XG5cdFx0c3dpdGNoICh0aGlzLm5vd1N0ZXApe1xuXHRcdFx0Y2FzZSAwOnsvL+WIneWni+WMluWPmOmHj1xuXHRcdFx0XHRpZiAodGhpcy5pc1dhaXQpey8v5q2j5Zyo5pON5L2c5oiW562J5b6F5pON5L2cXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly90aGlzLm5vZGUuZW1pdCgnc2VuZC1Nc2cnLCfov5vlhaXlm57lkIgnK3dpbmRvdy5nbG9iYWwubm93VHVybiwn57O757ufJyk7XG5cdFx0XHRcdC8vY29uc29sZS5sb2codGhpcy5ub3dQbGF5ZXIubmFtZSk7XG5cdFx0XHRcdHRoaXMubm93UHJvcGVydHk9dGhpcy5ub3dQbGF5ZXIuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTsvL+iOt+W+l+eOqeWutuWxnuaAp+mbhuWQiFxuXHRcdFx0XHR0aGlzLm5vZGUuZW1pdCgnc2VuZC1Nc2cnLCfova7liLDop5LoibInK3RoaXMubm93UHJvcGVydHkubmlja25hbWUsJ+ezu+e7nycpO1xuXHRcdFx0XHRjYy5nYW1lLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XG5cdFx0XHRcdFxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgMTp7Ly/njqnlrrbnp7vliqhcblx0XHRcdFx0aWYgKHRoaXMuaXNXYWl0KXsvL+ato+WcqOaTjeS9nOaIluetieW+heaTjeS9nFxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0aWYgKHRoaXMubm93UHJvcGVydHkuZ29FbmFibGVkKXsvL+WIpOaWreeOqeWutuaYr+WQpuWPr+S7peihjOi1sFxuXHRcdFx0XHRcdHZhciB0aXA9Y2MuZmluZCgnQ2FudmFzL3RpcFdpbicpO1xuXHRcdFx0XHRcdHRpcC5nZXRDb21wb25lbnQoJ3RpcFdpbmRvdycpLnN0YXJ0Um9sbERpY2UoKTtcblx0XHRcdFx0XHR0aGlzLmlzV2FpdD10cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS5nb0VuYWJsZWQ9MTtcblx0XHRcdFx0XHRjYy5nYW1lLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0IGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSAyOntcblx0XHRcdFx0Ly/lrozmiJDkuobkuovku7bop6blj5HmiJbogIXljaHniYzop6blj5Fcblx0XHRcdFx0aWYgKHRoaXMuaXNXYWl0KXsvL+ato+WcqOaTjeS9nOaIluetieW+heaTjeS9nFxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwi5b2T5YmN5q2l6aqk77yaXCIsdGhpcy5ub3dTdGVwKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCLnjqnlrrblh7rniYxcIik7XG5cdFx0XHRcdGNjLmdhbWUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIDM6IHtcblx0XHRcdFx0Ly/nrYnlvoXnjqnlrrblh7rniYzlubbnu5PmnZ9cblx0XHRcdFx0aWYgKHRoaXMubm93UHJvcGVydHkudXNlQ2FyZEVuYWJsZWQgPT0gMSkge1xuXHRcdFx0XHRcdC8v5Y+v5Lul5Ye654mMXG5cdFx0XHRcdFx0dmFyIGJ0biA9IGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKTtcblx0XHRcdFx0XHRidG4uYWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjYy5nYW1lLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIDQ6eyAvL+i/memHjOWOn+acrOaYr2Nhc2U6M1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwi5b2T5YmN5q2l6aqk77yaXCIsdGhpcy5ub3dTdGVwKTtcblx0XHRcdFx0Ly/lvZPliY3njqnlrrbnmoTlm57lkIjmlbAtMVxuXHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LnR1cm4tPTE7XG5cdFx0XHRcdGlmICh0aGlzLm5vd1Byb3BlcnR5LnR1cm49PTApLy/lvZPliY3njqnlrrblm57lkIjmlbDkuLow77yM5bqU6K+l5YiH5o2i546p5a62XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuWIh+aNouinkuiJslwiKTtcblx0XHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LnR1cm4rPTE7XG5cdFx0XHRcdFx0dGhpcy5pbmRleD0odGhpcy5pbmRleCsxKSU0O1xuXHRcdFx0XHRcdHRoaXMubm93UGxheWVyPXdpbmRvdy5nbG9iYWwucGVyc29uc1t0aGlzLmluZGV4XTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdH0sXG5cdGluaXRQZXJzb25zOmZ1bmN0aW9uKCl7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzBdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjEnKSk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjInKSk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzJdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjMnKSk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzNdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjQnKSk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzBdLmdldENvbXBvbmVudCgnUGVyc29uJykubmlja25hbWU9J+iAgeWPnyc7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykubmlja25hbWU9J+WwkeWmhyc7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzJdLmdldENvbXBvbmVudCgnUGVyc29uJykubmlja25hbWU9J+WvjOWVhic7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzNdLmdldENvbXBvbmVudCgnUGVyc29uJykubmlja25hbWU9J+Wwj+Wlsyc7XG5cdFx0Ly/liJ3lp4vljJblm5vkuKrnjqnlrrbkvY3nva5cblx0XHQvL2NvbnNvbGUubG9nKHRoaXMubWFwT2JqLm1hcFswXVswXS5nZXRQb3NpdGlvbigpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygwLDApO1xuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1sxXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDEwLDEwKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygwLDEwKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygxMCwwKTtcblx0XHRmb3IgKHZhciBpPTA7aTx3aW5kb3cuZ2xvYmFsLnBlcnNvbnMubGVuZ3RoO2krKyl7XG5cdFx0XHR2YXIgbm93UGVyc29uPXdpbmRvdy5nbG9iYWwucGVyc29uc1tpXTtcblx0XHRcdHZhciBjdHg9Y2MuZmluZChcImJsb29kQmFyL2JhclwiLCBub3dQZXJzb24pLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XG5cdFx0XHRjdHguY2xlYXIoKTtcblx0XHRcdGN0eC5zdHJva2VDb2xvciA9IGNjLkNvbG9yLlJFRDtcblx0XHRcdGN0eC5tb3ZlVG8oLTQwLCAtMTUwKTtcblx0XHRcdGN0eC5saW5lV2lkdGg9MTA7XG5cdFx0XHRjdHgubGluZVRvKDYwLCAtMTUwKTtcblx0XHRcdGN0eC5zdHJva2UoKTsgICBcblx0XHRcdHZhciB0ZXh0PWNjLmZpbmQoXCJibG9vZEJhci90ZXh0XCIsIG5vd1BlcnNvbik7XG5cdFx0XHR0ZXh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuZm9udFNpemU9MjU7XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSk7XG5cdFx0XHR0ZXh0LnNldFBvc2l0aW9uKC0xMDAsLTE1MCk7XG5cdFx0XHRcblx0XHRcdC8v6K6+572u6KGM5Yqo5YC8XG5cdFx0XHRjdHg9Y2MuZmluZChcIm1vYmlsaXR5QmFyL2JhclwiLCBub3dQZXJzb24pLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XG5cdFx0XHRjdHguY2xlYXIoKTtcblx0XHRcdGN0eC5zdHJva2VDb2xvciA9IGNjLkNvbG9yLkdSRUVOO1xuXHRcdFx0Y3R4Lm1vdmVUbygtNDAsIC0xODApO1xuXHRcdFx0Y3R4LmxpbmVUbyg2MCwgLTE4MCk7XG5cdFx0XHRjdHgubGluZVdpZHRoPTEwO1xuXHRcdFx0Y3R4LnN0cm9rZSgpOyAgXG5cdFx0XHR0ZXh0PWNjLmZpbmQoXCJtb2JpbGl0eUJhci90ZXh0XCIsIG5vd1BlcnNvbik7XG5cdFx0XHR0ZXh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuZm9udFNpemU9MjU7XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSk7XG5cdFx0XHR0ZXh0LnNldFBvc2l0aW9uKC0xMDAsLTIwMCk7XHRcdFx0XG5cdFx0fVxuXHR9LFxuXHRpbml0QmdtOmZ1bmN0aW9uKCl7XG5cdFx0Y2MubG9hZGVyLmxvYWRSZXMoJ2JnbS/lpKnnqbrkuYvln47pkqLnkLTmm7InLCBjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcblx0XHRcdHZhciBhdWRpb0lEID0gY2MuYXVkaW9FbmdpbmUucGxheShjbGlwLCB0cnVlLCAwLjUpO1xuXHRcdH0pO1xuXHR9LFxuXHRJbml0aWFsQ2FyZDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNhcmROYW1lID0gWyfngrjlvLknLCfnsr7lh4blr7zlvLknLCflnLDpm7cnLCfluofmiqQnLCflpKnkvb/nmoTluofmiqQnLCfmiJjnpZ7nmoTnpZ3npo8nLCfomZrlvLEnLCflm6LpmJ/nmoTlipvph48nLFxuXHRcdFx0XHRcdFx0XHQn5rK75oSIJywn5Zyj5YWJ5pmu54WnJywn5pyb6L+c6ZWcJywn55y8552bJywn54yb55S355qE56Wd56aPJywn55uX5Y+WJywn5p2f57yaJywn6L+35oORJywn5ouv5pWRJ107XG5cdFx0dmFyIHRvdENhcmROdW0gPSAxNztcblx0XHR3aW5kb3cuZ2xvYmFsLmNhcmRub2RlID0gbmV3IEFycmF5KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b3RDYXJkTnVtOyBpKyspIHtcblx0XHRcdHZhciBub2RlID0gbmV3IGNjLk5vZGUoY2FyZE5hbWVbaV0pO1xuXHRcdFx0bm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcblx0XHRcdG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoY2MudXJsLnJhdygncmVzb3VyY2VzL+WNoeeJjOWbvueJhy8nK2NhcmROYW1lW2ldKycuanBnJykpO1xuXHRcdFx0d2luZG93Lmdsb2JhbC5jYXJkbm9kZS5wdXNoKG5vZGUpO1xuXHRcdH1cblx0XHQvL+makOiXj+e7k+adn+aMiemSrlxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSBmYWxzZTtcblx0XHQvL+makOiXj+mAieeJjOehruWumuaMiemSrlxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jb25maXJtJykuYWN0aXZlPWZhbHNlO1xuXHRcdC8v6ZqQ6JeP6YCJ54mM5Y+W5raI5oyJ6ZKuXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2Nob29zZV9jYXJkX2NhbmNlbCcpLmFjdGl2ZT1mYWxzZTtcblx0XHQvL+WIneWni+WMlkJHTVxuXHRcdHRoaXMuaW5pdEJnbSgpO1xuXHR9LFxufSk7XG5cblxuLy/nlJ/miJDku45taW5OdW3liLBtYXhOdW3nmoTpmo/mnLrmlbBcbmZ1bmN0aW9uIHJhbmRvbU51bShtaW5OdW0sbWF4TnVtKXsgXG4gICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpeyBcbiAgICAgICAgY2FzZSAxOiBcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChNYXRoLnJhbmRvbSgpKm1pbk51bSsxLDEwKTsgXG4gICAgICAgIGJyZWFrOyBcbiAgICAgICAgY2FzZSAyOiBcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChNYXRoLnJhbmRvbSgpKihtYXhOdW0tbWluTnVtKzEpK21pbk51bSwxMCk7IFxuICAgICAgICBicmVhazsgXG4gICAgICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICAgICAgICByZXR1cm4gMDsgXG4gICAgICAgICAgICBicmVhazsgXG4gICAgfSBcbn0gIl19