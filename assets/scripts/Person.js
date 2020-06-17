// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var global=require('globalGame');
var person=cc.Class({
    extends: cc.Component,

    properties: {
		nickname: {
			default:null,
			get: function () {
				return this.nickname;
			},
		}	,
		ID:null,
		position:null,
		attack:1,
		blood:10,//玩家血量,初始为2点，每回合恢复2点
		mobility:2,//玩家行动值
		cards:null,
		myStatus:1,//0为死亡，1为正常
		turn:1,//玩家回合数
		useCardEnabled:1,//是否使用卡牌，1为可使用卡牌
		goEnabled:{
			default:1,
			get: function () {
				return this._goEnabled;
			},
		},//是否可以行走,1为可以行走
		parter:null,
		avatar:null,
		posX:null,
		posY:null,
    },
	moveByRoute:function(route){
		//声明一个动作序列
		//var r=[cc.v2(100,100),cc.v2(100,100),cc.v2(100,100),cc.v2(100,100)];
		//var actArr=new Array();
		//console.log(route);
		//var p=cc.tween(this.avatar);
		for (var i=0;i<route.length;i++){
			//p.to(0.01,position:route[i].getPosition()});
			//console.log(route[i].getComponent('Cell').mapx+','+route[i].getComponent('Cell').mapy);
		}
		this.avatar.setPosition(route[route.length-1].getPosition());
		this.posX=route[route.length-1].getComponent('Cell').mapx;
		this.posY=route[route.length-1].getComponent('Cell').mapy;
		
		route[route.length-1].getComponent('Cell').stepOnCell(this.node);
	
	},
	move2Pos:function(x,y){
		this.posX=x;
		this.posY=y;
		//this.nowPos.y=y;
		var mapObj=cc.find('Canvas/map').getComponent('GetMap');
		var pos=mapObj.map[x][y].getPosition();
		this.avatar.setPosition(pos);
		//console.log(pos);
		//console.log(this.nowPos);
	},
	bindAvatar:function(node){
		//console.log(node);
		this.avatar=node;
	},
	onLoad(){	
		this.cards=new Array();
		window.global.persons.push(this.node);
		console.log(this.name+"onLoad");
	},
    start () {
		//初始化任务
		
    },
    update (dt) {
		
		
	},
});