// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        cardCost:[cc.Integer],
        cardFunction:null,
    },
    //卡牌响应函数中的this不是card.js
	
	boom_0: function(card) {
		cc.find('Canvas/Deck').active = false;//暂时不让点手牌堆
		cc.find('Canvas/end_card_btn').active = false;//暂时不让结束出牌
		cc.find('Canvas/Deck').getComponent('Deck').showTips("请选择要轰炸的地图块");
		var map = cc.find('Canvas/map').getComponent('GetMap');
		map.openAllMonitor('boom-cell-chosen');
	},
	missile_1: function(card) {
		var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
		var map = cc.find('Canvas/map').getComponent('GetMap');
		var dis = map.BfsDis(role.getComponent('Person').posX, role.getComponent('Person').posY);
		console.log(dis);
		var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
		enemy1 = cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
		enemy2 = cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
		if (dis[enemy1.posX][enemy1.posY] <= 5)
			enemy1.blood -= role.attack;
		if (dis[enemy2.posX][enemy2.posY] <= 5)
			enemy2.blood -= role.attack;
		role.getComponent('Person').mobility-=card.cardCost[1];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(1);
	},
	
	mine_2: function(card) {
		var role=cc.find('Canvas').getComponent('globalGame').nowProperty;
		var map = cc.find('Canvas/map').getComponent('GetMap');
		map.map[role.posX][role.posY].getComponent('Cell').haveMine = 1;
		map.map[role.posX][role.posY].getComponent('Cell').mineAttack = role.attack * 2;
		role.getComponent('Person').mobility-=card.cardCost[2];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(2);
	},
	
    shield_3:function(card){
        var role=cc.find('Canvas').getComponent('globalGame').nowProperty;
        role.shield=1;
        role.mobility-=card.cardCost[3];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(3);
    },
    halfShield_4:function(card){
        var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
		role = cc.find('Canvas').getComponent('globalGame').nowProperty;
        role.halfShield+=1;
        if (teammate.isDead==0)
            teammate.halfShield+=1;
        role.mobility-=card.cardCost[4];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(4);
    },
    bless_5:function(card){
        var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        role.getComponent('Person').attcak+=1;
        cc.find("Canvas/Persons/Person"+teammate).getComponent('Person').attack+=1;    
        var buff=cc.find('Canvas').getComponent('Buff');
        buff.todoList.push({
            endTurn:window.global.nowTurn+2,
            person:role,
            act:function(){
				if (this.person != cc.find('Canvas').getComponent('globalGame').nowPlayer)
					return false;
                this.person.getComponent('Person').attack=Math.max(0,this.person.getComponent('Person').attack-1);
				return true;
            }
        });
		buff.todoList.push({
            endTurn:window.global.nowTurn+2,
            person:cc.find("Canvas/Persons/Person"+teammate),
            act:function(){
				if (this.person != cc.find('Canvas').getComponent('globalGame').nowPlayer)
					return false;
                this.person.getComponent('Person').attack=Math.max(0,this.person.getComponent('Person').attack-1);
				return true;
            }
        });
        role.getComponent('Person').mobility-=card.cardCost[5];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(5);        
    },
    weak_6:function(card){
        var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
        var buff=cc.find('Canvas').getComponent('Buff');
        buff.todoList.push({
            endTurn:window.global.nowTurn+2,
            person:[enemy1,enemy1.attack!=0],
            act:function(){
				if (this.person[0] != cc.find('Canvas').getComponent('globalGame').nowProperty)
					return false;
                this.person[0].attack+=this.person[1];
				return true;
            }
        }); 
		buff.todoList.push({
            endTurn:window.global.nowTurn+2,
            person:[enemy2,enemy2.attack!=0],
            act:function(){
				if (this.person[0] != cc.find('Canvas').getComponent('globalGame').nowProperty)
					return false;
                this.person[0].attack+=this.person[1];
				return true;
            }
        });
        enemy1.attack=Math.max(0,enemy1.attack-1);
        enemy2.attack=Math.max(0,enemy2.attack-1);
        role.getComponent('Person').mobility-=card.cardCost[6];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(6);
        
    },
	
	teamForce_7: function(card) {
		var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
		if (teammate.isDead == 1)
			cc.find('Canvas/Deck').getComponent('Deck').showTips('队友已死亡，白给 QAQ');
		else if (7 in teammate.cards) {
			if (teammate.mobility < 5)
				cc.find('Canvas/Deck').getComponent('Deck').showTips('队友行动值不足，白给 QAQ');
			else {
				enemy1.blood -= 3;
				enemy2.blood -= 3;
				if (enemy1.blood <= 0)
					enemy1.isDead = 1;
				if (enemy2.blood <= 0)
					enemy2.isDead = 1;
			}
		}
		else {
			cc.find('Canvas/Deck').getComponent('Deck').showTips('队友无此牌，白给 QAQ');
		}
		role.mobility-=card.cardCost[7];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(7);
	},
	
    heal_8:function(card){
        var role=cc.find('Canvas').getComponent('globalGame').nowProperty;
        role.blood+=1;
        role.mobility-=card.cardCost[8];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(8);
    },
    holyNova_9:function(card){
        var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
        if (role.isDead==0)
            role.blood+=2;
        if (teammate.isDead==0)
            teammate.blood+=2;
        if (enemy1.isDead==0)
            enemy1.blood+=1;
        if (enemy2.isDead==0)
            enemy2.blood+=1;
        role.mobility-=card.cardCost[9];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(9);
    },
	
	telescope_10: function(card) {
		var role=cc.find('Canvas').getComponent('globalGame').nowProperty;
		role.sight++;
		var buff=cc.find('Canvas').getComponent('Buff');
        buff.todoList.push({
            endTurn:window.global.nowTurn+5,
            person:role,
            act:function(){
				if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty)
					return false;
                this.person.sight--;
				return true;
            }
        });
        role.mobility-=card.cardCost[10];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(10);        
	},
	eye_11:function(card){
		cc.find('Canvas/Deck').active = false;//暂时不让点手牌堆
		cc.find('Canvas/end_card_btn').active = false;//暂时不让结束出牌
		cc.find('Canvas/Deck').getComponent('Deck').showTips("请选择要放置眼睛的地图块");
		var map = cc.find('Canvas/map').getComponent('GetMap');
		map.openAllMonitor('eye-cell-chosen');		
	},
    tough_12:function(card){
        var role=cc.find('Canvas').getComponent('globalGame').nowProperty;
        role.attack*=2;
        var buff=cc.find('Canvas').getComponent('Buff');
        buff.todoList.push({
            endTurn:window.global.nowTurn+1,
            person:role,
            act:function(){
				if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty)
					return false;
                this.person.attack=Number(this.person.attack/2);
				return true;
            }
        });
        role.mobility-=card.cardCost[12];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(12);        
    },
	
	waitSteal: function() {
		//this 为人物的person.js
		var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
		
		if (this.cards.length == 0) {
			cc.find('Canvas/Deck').getComponent('Deck').showTips('无手牌可盗取 QAQ');
		}
		else {
			var rd = Math.floor(Math.random()*this.cards.length);
			var node = cc.instantiate(window.global.cardnode[this.cards[rd]]);
			node.setPosition(0, 0);
			node.on('mousedown', function ( event ) {
				this.destroy();
			}, node);
			node.parent = this.node.parent.parent;
			
			role.cards.push(this.cards[rd]);
			this.cards.splice(rd, 1);
		}
		
		teammate.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, teammate);
		enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, enemy1);
		enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, enemy2);
		
		cc.find('Canvas/Deck').active = true;
		cc.find('Canvas/end_card_btn').active = true;
	},
	
	steal_13:function(card) {
		cc.find('Canvas/Deck').active = false;//暂时不让点手牌堆
		cc.find('Canvas/end_card_btn').active = false;//暂时不让结束出牌
		var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
		var mist = cc.find('Canvas/mist').getComponent('Mist');
		var havePeople = 0;
		if (mist.mistArr[teammate.posX][teammate.posY].active == false) {
			teammate.avatar.on('mousedown', card.waitSteal, teammate);
			havePeople = 1;
		}
		if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
			enemy1.avatar.on('mousedown', card.waitSteal, enemy1);
			havePeople = 1;
		}
		if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
			enemy2.avatar.on('mousedown', card.waitSteal, enemy2);
			havePeople = 1;
		}
		
		if (havePeople == 0)
			cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无玩家 QAQ');
		role.mobility-=card.cardCost[13];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(13);
	},
	
	stopMove: function() {
		//this为人物的person.js
		var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
		
		this.goEnabled = 0;
		enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopMove, enemy1);
		enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopMove, enemy2);
		
		cc.find('Canvas/Deck').active = true;
		cc.find('Canvas/end_card_btn').active = true;
	},
	
	tie_14: function(card) {
		cc.find('Canvas/Deck').active = false;//暂时不让点手牌堆
		cc.find('Canvas/end_card_btn').active = false;//暂时不让结束出牌
		var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
		var mist = cc.find('Canvas/mist').getComponent('Mist');
		var havePeople = 0;
		if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
			enemy1.avatar.on('mousedown', card.stopMove, enemy1);
			havePeople = 1;
		}
		if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
			enemy2.avatar.on('mousedown', card.stopMove, enemy2);
			havePeople = 1;
		}
		if (havePeople == 0) {
			cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无敌人 QAQ');
			cc.find('Canvas/Deck').active = true;
			cc.find('Canvas/end_card_btn').active = true;
		}
		role.mobility-=card.cardCost[14];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(14);
	},
	
	stopUseCard: function() {
		//this为人物的person.js
		var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
		
		this.useCardEnabled = 0;
		enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopUseCard, enemy1);
		enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopUseCard, enemy2);
		
		cc.find('Canvas/Deck').active = true;
		cc.find('Canvas/end_card_btn').active = true;
	},
	
	confuse_15: function(card) {
		cc.find('Canvas/Deck').active = false;//暂时不让点手牌堆
		cc.find('Canvas/end_card_btn').active = false;//暂时不让结束出牌
		var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        var enemy1=index+1>4?index-3:index+1;
        var enemy2=teammate+1>4?teammate-3:teammate+1;
        role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
        enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
		var mist = cc.find('Canvas/mist').getComponent('Mist');
		var havePeople = 0;
		if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
			enemy1.avatar.on('mousedown', card.stopUseCard, enemy1);
			havePeople = 1;
		}
		if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
			enemy2.avatar.on('mousedown', card.stopUseCard, enemy2);
			havePeople = 1;
		}
		if (havePeople == 0) {
			cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无敌人 QAQ');
			cc.find('Canvas/Deck').active = true;
			cc.find('Canvas/end_card_btn').active = true;
		}
		role.mobility-=card.cardCost[15];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(15);
	},
	
    save_16:function(card){
        var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
        var index=Number(role.name[6]);
        var teammate=index+2>4?index-2:index+2;
        teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
        if (teammate.isDead==1){
            teammate.isDead=0;
            teammate.blood=5;
            teammate.mobility=3;
        }
        role.getComponent('Person').mobility-=card.cardCost[16];
        cc.find('Canvas/Deck').getComponent('Deck').removeCard(16);
    },
    onLoad () {
        this.cardCost=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//[4,3,2,3,3,4,4,5,2,3,3,3,3,3,4,4,5];
        this.cardFunction=new Array();
		this.cardFunction[0]=this.boom_0;
		this.cardFunction[1]=this.missile_1;
		this.cardFunction[2]=this.mine_2;
        this.cardFunction[3]=this.shield_3;
        this.cardFunction[4]=this.halfShield_4;
        this.cardFunction[5]=this.bless_5;
        this.cardFunction[6]=this.weak_6;
		this.cardFunction[7]=this.teamForce_7;
        this.cardFunction[8]=this.heal_8;
        this.cardFunction[9]=this.holyNova_9;
		this.cardFunction[10]=this.telescope_10;
		this.cardFunction[11]=this.eye_11;
        this.cardFunction[12]=this.tough_12;
		this.cardFunction[13]=this.steal_13;
		this.cardFunction[14]=this.tie_14;
		this.cardFunction[15]=this.confuse_15;
        this.cardFunction[16]=this.save_16;
		//响应卡牌0炸弹
		cc.game.on('boom-cell-chosen', function(x, y) {
			var boom_cell = [[x, y]];
			var map = cc.find('Canvas/map').getComponent('GetMap');
			for (var i = 0; i < map.adj[x][y].length; i++)
				boom_cell.push(map.adj[x][y][i]);
			var role=cc.find('Canvas').getComponent('globalGame').nowPlayer;
			var index=Number(role.name[6]);
			var teammate=index+2>4?index-2:index+2;
			var enemy1=index+1>4?index-3:index+1;
			var enemy2=teammate+1>4?teammate-3:teammate+1;
			role=cc.find("Canvas/Persons/Person"+index).getComponent('Person');
			teammate=cc.find("Canvas/Persons/Person"+teammate).getComponent('Person');
			enemy1=cc.find("Canvas/Persons/Person"+enemy1).getComponent('Person');
			enemy2=cc.find("Canvas/Persons/Person"+enemy2).getComponent('Person');
			for (var i = 0;i < boom_cell.length; i++) {
				if (boom_cell[i][0] == enemy1.posX && boom_cell[i][1] == enemy1.posY) {
					enemy1.blood -= role.attack*2; console.log(enemy1.nickname);}
				if (boom_cell[i][0] == enemy2.posX && boom_cell[i][1] == enemy2.posY) {
					enemy2.blood -= role.attack*2; console.log(enemy2.nickname);}
				if (enemy1.blood <= 0)
					enemy1.isDead = 1;
				if (enemy2.blood <= 0)
					enemy2.isDead = 1;
			}
			role.mobility-=this.cardCost[0];
			cc.find('Canvas/Deck').getComponent('Deck').removeCard(0);
			cc.find('Canvas/Deck').active = true; //恢复卡牌堆
			cc.find('Canvas/end_card_btn').active = true;//恢复结束出牌
		}, this);
		//响应卡牌11插眼
		cc.game.on('eye-cell-chosen', function(x, y) {
			var eye_cell = [[x, y]];
			var map = cc.find('Canvas/map').getComponent('GetMap');
			var dis = map.BfsDis(x,y);
			var role=cc.find('Canvas').getComponent('globalGame').nowProperty;
			for (var i=0;i<11;++i)
				for (var j=0;j<11;++j){
					if (dis[i][j]!=-1&&dis[i][j]<=3)
						eye_cell.push([i,j]);
				}
			role.eyes.push(eye_cell);
			var buff=cc.find('Canvas').getComponent('Buff');
			buff.todoList.push({
				endTurn:window.global.nowTurn+5,
				person:role,
				act:function(){
					if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty)
						return false;
					role.eyes.splice(0,1);
					return true;
				}
			});
			role.mobility-=this.cardCost[11];
			cc.find('Canvas/Deck').getComponent('Deck').removeCard(11);
			cc.find('Canvas/Deck').active = true; //恢复卡牌堆
			cc.find('Canvas/end_card_btn').active = true;//恢复结束出牌
		}, this);
    },

    start () {

    },

    // update (dt) {},
});
















