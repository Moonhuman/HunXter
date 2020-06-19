// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       startGameBtn:null,
	   exitGameBtn:null,
    },
	onLoad(){
		this.startGameBtn=cc.find('Canvas/startGame');
		this.exitGameBtn=cc.find('Canvas/exitBtn');
		console.log(this.startGameBtn);
	},
    start () {

    },
	startGame:function(){
		console.log('开始游戏');
		cc.director.loadScene("game");
	},
	exitGame:function(){
		console.log('退出游戏');
	},
    // update (dt) {},
});
