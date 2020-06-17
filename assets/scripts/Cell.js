// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		mapx: 0, //在map[i][j]中的横坐标
		mapy: 0,//在map[i][j]中的纵坐标
		kind: null, //格子的类型，0:空白格，1:卡牌格，2:事件格
		inMonitor: 0, //用来判断是否处于监听中的标记
		routeID: null, //记录这个cell是map中哪条route的终点，即在routes中的下标
		
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
	
	setColor: function() {
		//设置cell的颜色为红色，表示可走
		this.node.color = cc.Color.RED;
	},
	
	resetColor: function() {
		//还原cell的颜色
		this.node.color = cc.color(255,255,255,255);
	},
	
	stepOnCell: function(Person) {
		if (this.kind == 0) //空白格
			return;
		else if (this.kind == 1) //卡牌格
			return; //还没写好卡牌，暂时先跳过
		else if (this.kind == 2) { //事件格
			//随机产生6个事件之一
			var rand_event = Math.floor(Math.random()*6);
			//创建用来提示获得触发事件的精灵节点
			var note = new cc.Node();
            note.addComponent(cc.Sprite);
			note.setPosition(0, 0);
			note.parent = this.node.parent.parent;
			var self = note, event_name;
			if (rand_event == 0) { //陷阱
				event_name = "陷阱";
			}	
			else if (rand_event == 1) { //监狱
				event_name = "监狱";
			}	
			else if (rand_event == 2) { //恶魔
				event_name = "恶魔";
			}	
			else if (rand_event == 3) { //奥利给
				event_name = "奥利给";
			}	
			else if (rand_event == 4) { //视野
				event_name = "视野";
			}	
			else if (rand_event == 5) { //天使
				event_name = "天使";
			}	
			cc.loader.loadRes(event_name, cc.SpriteFrame, function (err, spriteFrame) {
				self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			});
			//开启note节点的监听，点击后消失
			note.on('mousedown', function ( event ) {
				this.destroy();
			}, note);
			
		}
	},
	
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		
	},

    start () {
		//设置格子图片
		
		var self = this;
		if (this.kind == 0) { //空白格
			cc.loader.loadRes("cell", cc.SpriteFrame, function (err, spriteFrame) {
				self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			});
		}
		else if (this.kind == 1) { //卡牌格
			cc.loader.loadRes("抽卡格", cc.SpriteFrame, function (err, spriteFrame) {
				self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			});
		}
		else { //事件格
			cc.loader.loadRes("事件格", cc.SpriteFrame, function (err, spriteFrame) {
				self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			});
		}
    },

    // update (dt) {},
});












