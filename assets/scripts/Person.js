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
		isDead:0,//是否已阵亡，0：活着，1：死了
		shield:0,//可免疫一次伤害的护盾，0: 无, 1: 有
		halfShield:0,//可减半一次伤害的护盾，可累积次数
		sight:2,//视野大小，默认值为2
		eyes:null,
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
		// if (this.node.name == 'Person2' || this.node.name == 'Person4')
			// this.avatar.opacity = 0;
		var p=cc.tween(this.avatar);
		for (var i=0;i<route.length-1;i++){
			p.to(0.2,{position:cc.v2(route[i].x,route[i].y)});
			Positionchecked(route[i].x,route[i].y,this.node);
			var tmp = new Array();
			tmp.push(route[i].getComponent('Cell').mapx);
			tmp.push(route[i].getComponent('Cell').mapy);
			tmp.push(cc.find('Canvas').getComponent('globalGame').nowProperty);
			p.call( function() {
				this[2].posX=this[0];
				this[2].posY=this[1];
			}, tmp);
			
		}
		p.to(0.2,{position:cc.v2(route[route.length-1].x,route[route.length-1].y)});
		var tmp = new Array();
		tmp.push(route[route.length-1].getComponent('Cell').mapx);
		tmp.push(route[route.length-1].getComponent('Cell').mapy);
		tmp.push(cc.find('Canvas').getComponent('globalGame').nowProperty);
		tmp.push(route[route.length-1]);
		p.call(function(){
			this[2].posX=this[0];
			this[2].posY=this[1];
			this[3].getComponent('Cell').stepOnCell(this[2].node);
			
			// if (this[2].node.name == 'Person2' || this[2].node.name == 'Person4')
				// this[2].avatar.opacity = 255;
			
		},tmp);
		p.start();
		//this.avatar.setPosition(route[route.length-1].getPosition());
		
		
		
	
	},
	move2Pos:function(x,y){
		this.posX=x;
		this.posY=y;
		//this.nowPos.y=y;
		var mapObj=cc.find('Canvas/map').getComponent('GetMap');
		var pos=mapObj.map[x][y].getPosition();
		this.avatar.setPosition(pos);
	},
	bindAvatar:function(node){
		this.avatar=node;
	},
	onLoad(){	
		this.cards=new Array();
		this.eyes=new Array();
		window.global.persons.push(this.node);
		console.log(this.name+"onLoad");
	},
    start () {
		//初始化任务
		
    },
    update (dt) {
		
		
	},
});
function Positionchecked(x,y,nowPerson){
	//一次遍历人物列表上位置，检查是否有其他人，有则计算伤害。
	var persons=window.global.persons;
	for (var i=0;i<persons.length;i++){
		if (nowPerson!=persons[i] && nowPerson.parter!=person[i] && x==persons[i].posX &&  y==persons[i].posY){
			//计算伤害
			if (persons[i].isDead==1)//当前位置玩家已死亡,不需要计算伤害
			{
				break;
			}
			var attack=persons[i].attack;
			if (nowPerson.shield==1){
				attack= 0;
			}
			else if (nowPerson.halfShield>0){
				nowPerson.halfShield-=1;
				attack= Math.round(attack/2);//四舍五入
			}
			nowPerson.blood-=attack;
		}
	}
}