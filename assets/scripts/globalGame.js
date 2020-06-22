window.global={
	persons:[],
	nowTurn:0,//当前回合数
	isOver:false,
	cardnode : null,
	bgm:{
		audio:null,
		loop:null,
		volume:null,
	}
};
cc.Class({
    extends: cc.Component,

    properties: {
		mapObj:null,//地图对象
		persons:null,//玩家们
		index:0,
		nowStep:0,
		nowPlayer:null,
		nowProperty:null,
		isWait:false,
		msgBoxConent:null,
		time:0,
    },
	
	end_card_btn_func:function() {
		cc.game.emit('update-state', '1');
		cc.find("Canvas/end_card_btn").active = false;
	},
	
    updateUI:function(){
		//更新人物血量
	},

    onLoad () {
		//加载地图
		this.nowStep=0;
		this.msgContent=cc.find('Canvas/msgBox/view/content/item');
		//console.log(msgContent.getComponent(cc.Label));
		cc.game.on('send-Msg',function(event,poster){
			var timeStr='';
			if (parseInt(this.time/60)<10)
				timeStr+="0"
			timeStr+=parseInt(this.time/60)+":";
			if (this.time-parseInt(this.time/60)*60<10)
				timeStr+="0"
			timeStr+=(this.time-parseInt(this.time/60)*60);
			
			var name='<color=#43CD80>('+timeStr+')'+poster+'</color>';;
			if (poster=='系统'){
				name='<color=#ff0000>('+timeStr+')'+poster+'</color>';
			}
			this.msgContent.getComponent(cc.RichText).string+=name+": "+event+'<br/>';
			//可能需要动态改变content大小
			
			cc.find('Canvas/msgBox/view/content').height=this.msgContent.height+10;
			cc.find('Canvas/msgBox').getComponent(cc.ScrollView).scrollToBottom(0.1);
			//console.log('Label',this.msgContent.height);
			 
		},this);
			
		cc.game.on('update-state', function (msg) {
			this.nowStep=(this.nowStep+1)%5;
			this.isWait=false;
			
		},this);
		cc.game.on('stepOnCell-done', function ( event ) {//触发结束
			cc.game.emit('update-state', '1');//更新状态
			console.log(event);
			cc.game.emit('send-Msg',event,this.nowProperty.nickname);
		},this);
		cc.game.on('route-chosen', function(route) {//监听玩家选择了哪条路径
					//console.log('点击了',route);
			this.nowProperty.moveByRoute(route);
					//this.node.emit('update-state', '1');//玩家移动完成，进入下一步操作
					//玩家头像按照路径移动
		},this);
		cc.game.on('roll-dice-done',function(step){
			cc.game.emit('send-Msg',"获得骰子点数"+step,this.nowProperty.nickname);
			console.log(this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY],step));
		},this);
		this.InitialCard();
		this.initBgm();
		cc.find('Canvas/time').getComponent(cc.Label).schedule(function() {
			
			cc.find('Canvas').getComponent('globalGame').time+=1;
			var time=cc.find('Canvas').getComponent('globalGame').time;
			//console.log(time);
			this.string="Time: "
			if (parseInt(time/60)<10)
				this.string+="0"
			this.string+=parseInt(time/60)+":";
			if (time-parseInt(time/60)*60<10)
				this.string+="0"
			this.string+=(time-parseInt(time/60)*60);
			//cc.find('Canvas').getComponent('globalGame').timeStr=this.string;
		 }, 1);
		 cc.game.emit('send-Msg','好戏开场了!','系统');
	},
	
    start () {
		//初始化人物
		this.initPersons();
		//获得地图对象
		this.mapObj=cc.find('Canvas/map').getComponent('GetMap');
	
		this.nowPlayer=window.global.persons[this.index];
		
		
		
    },

    update (dt) {
		//判断当前回合是否结束
		
		console.log("是否等待操作",this.isWait);
		switch (this.nowStep){
			case 0:{//初始化变量
				if (this.isWait){//正在操作或等待操作
					break;
				}
				//this.node.emit('send-Msg','进入回合'+window.global.nowTurn,'系统');
				//console.log(this.nowPlayer.name);
				this.nowProperty=this.nowPlayer.getComponent('Person');//获得玩家属性集合
				cc.game.emit('send-Msg','轮到角色'+this.nowProperty.nickname,'系统');
				cc.game.emit('update-state', '1');
				
				break;
			}
			case 1:{//玩家移动
				if (this.isWait){//正在操作或等待操作
					break;
				}
				
				
				if (this.nowProperty.goEnabled){//判断玩家是否可以行走
					var tip=cc.find('Canvas/tipWin');
					tip.getComponent('tipWindow').startRollDice();
					this.isWait=true;
				}
				else{
					this.nowProperty.goEnabled=1;
					cc.game.emit('update-state', '1');
				}
				 break;
			}
			case 2:{
				//完成了事件触发或者卡牌触发
				if (this.isWait){//正在操作或等待操作
					break;
				}
				console.log("当前步骤：",this.nowStep);
				console.log("玩家出牌");
				cc.game.emit('update-state', '1');
				break;
			}
			case 3: {
				//等待玩家出牌并结束
				if (this.nowProperty.useCardEnabled == 1) {
					//可以出牌
					var btn = cc.find('Canvas/end_card_btn');
					btn.active = true;
					
				}
				else {
					cc.game.emit('update-state', '1');
				}
				break;
			}
			case 4:{ //这里原本是case:3
				//console.log("当前步骤：",this.nowStep);
				//当前玩家的回合数-1
				this.nowProperty.turn-=1;
				if (this.nowProperty.turn==0)//当前玩家回合数为0，应该切换玩家
				{
					console.log("切换角色");
					this.nowProperty.turn+=1;
					this.index=(this.index+1)%4;
					this.nowPlayer=window.global.persons[this.index];
				}
				
				cc.game.emit('update-state', '1');
				break;
			}
		}
		
	},
	initPersons:function(){
		window.global.persons[0].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar1'));
		window.global.persons[1].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar2'));
		window.global.persons[2].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar3'));
		window.global.persons[3].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar4'));
		window.global.persons[0].getComponent('Person').nickname='老叟';
		window.global.persons[1].getComponent('Person').nickname='少妇';
		window.global.persons[2].getComponent('Person').nickname='富商';
		window.global.persons[3].getComponent('Person').nickname='小女';
		//初始化四个玩家位置
		//console.log(this.mapObj.map[0][0].getPosition());
		window.global.persons[0].getComponent('Person').move2Pos(0,0);
		window.global.persons[1].getComponent('Person').move2Pos(10,10);
		window.global.persons[2].getComponent('Person').move2Pos(0,10);
		window.global.persons[3].getComponent('Person').move2Pos(10,0);
		for (var i=0;i<window.global.persons.length;i++){
			var nowPerson=window.global.persons[i];
			var ctx=cc.find("bloodBar/bar", nowPerson).getComponent(cc.Graphics);
			ctx.clear();
			ctx.strokeColor = cc.Color.RED;
			ctx.moveTo(-40, -150);
			ctx.lineWidth=10;
			ctx.lineTo(60, -150);
			ctx.stroke();   
			var text=cc.find("bloodBar/text", nowPerson);
			text.getComponent(cc.Label).fontSize=25;
			//console.log(text.getComponent(cc.Label));
			text.setPosition(-100,-150);
			
			//设置行动值
			ctx=cc.find("mobilityBar/bar", nowPerson).getComponent(cc.Graphics);
			ctx.clear();
			ctx.strokeColor = cc.Color.GREEN;
			ctx.moveTo(-40, -180);
			ctx.lineTo(60, -180);
			ctx.lineWidth=10;
			ctx.stroke();  
			text=cc.find("mobilityBar/text", nowPerson);
			text.getComponent(cc.Label).fontSize=25;
			//console.log(text.getComponent(cc.Label));
			text.setPosition(-100,-200);			
		}
	},
	initBgm:function(){
		cc.loader.loadRes('bgm/天空之城钢琴曲', cc.AudioClip, function (err, clip) {
			var audioID = cc.audioEngine.play(clip, true, 0.1);
		});
	},
	InitialCard: function() {
		var cardName = ['炸弹','精准导弹','地雷','庇护','天使的庇护','战神的祝福','虚弱','团队的力量',
							'治愈','圣光普照','望远镜','眼睛','猛男的祝福','盗取','束缚','迷惑','拯救'];
		var totCardNum = 17;
		window.global.cardnode = new Array();
		for (var i = 0; i < totCardNum; i++) {
			
			var node = new cc.Node(cardName[i]);
			node.addComponent(cc.Sprite);
			node.cardName = cardName[i];
			cc.loader.loadRes('卡牌图片/'+node.cardName,cc.SpriteFrame,function(err,spriteFrame) {
	            this.getComponent(cc.Sprite).spriteFrame = spriteFrame;
		    }.bind(node));
			window.global.cardnode.push(node);	
		}
		//隐藏结束按钮
		cc.find('Canvas/end_card_btn').active = false;
		//隐藏选牌确定按钮
		cc.find('Canvas/choose_card_confirm').active=false;
		//隐藏选牌取消按钮
		cc.find('Canvas/choose_card_cancel').active=false;
		//初始化BGM
		this.initBgm();
	},
});


//生成从minNum到maxNum的随机数
