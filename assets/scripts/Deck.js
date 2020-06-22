// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        deck:[cc.Integer],
        role: null,
    },
    
    showTips:function(news){
        var tips=new cc.Node();
        tips.addComponent(cc.Label);
        label=tips.getComponent(cc.Label);
        label.string=news;
        label.fontSize=50;
        label.enableBold=true;
        tips.color=cc.color(255,0,0,255);
        tips.addComponent('Tips');
        tips.parent=cc.find('Canvas');        
    },
    choose_confirm:function(){
        var cardID=window.global.now_choosing_card;
        var role=cc.find('Canvas').getComponent('globalGame').nowProperty;
        var card=cc.find('Canvas/Card').getComponent('Card');
        if (role.mobility<card.cardCost[cardID]){
            cc.find('Canvas/Deck').getComponent('Deck').showTips("行动值不足！");
        }
        else{
            card.cardFunction[16](card);
            cc.find('Canvas/Deck').getComponent('Deck').closeCards();
        }
        //关闭按钮
		cc.find('Canvas/choose_card_confirm').active=false;
        cc.find('Canvas/choose_card_cancel').active=false;            
    },
	choose_cancel:function(){
        //关闭按钮
		cc.find('Canvas/choose_card_confirm').active=false;
        cc.find('Canvas/choose_card_cancel').active=false;        
    },
    cardDetail:function(){
        var node=cc.instantiate(this);
        node.name="card_detail";
        node.scaleX=0.8,node.scaleY=0.8;
        node.setPosition(0,50);
        node.parent=cc.find("Canvas");
        
    },
    closeDetail:function(){
        var node=cc.find("Canvas/card_detail");
        if (node!=null)
            node.destroy();
    },
    removeCard:function(cardID){
        var role=cc.find('Canvas').getComponent('globalGame').nowProperty;
        for (var i=0;i<role.cards.length;++i)
            if (role.cards[i]==cardID){
                role.cards.splice(i,1);
                break;
            }
    },
    chooseCard:function(event){
        var deck=cc.find("Canvas/Deck").getComponent("Deck");
        deck.closeDetail();
        //显示确定/取消按钮
		cc.find('Canvas/choose_card_confirm').active=true;
        cc.find('Canvas/choose_card_cancel').active=true;
        //重置当前选择的手牌
        window.global.now_choosing_card=this.cardID;
        event.stopPropagation();
    },	
    showCards:function(){
        var isPlayCard=(cc.find("Canvas").getComponent("globalGame").nowStep==3);
        for (var i=0;i<this.deck.length;++i){
            var cardID=this.deck[i];
            var node=cc.instantiate(window.global.cardnode[cardID]);
            node.scaleX=0.4,node.scaleY=0.4;
            node.setPosition(200+i*200,0);
            node.cardID=cardID;
            node.parent=this.node;
            node.on("mouseenter",this.cardDetail,node);
            node.on("mouseleave",this.closeDetail,node);
			if (isPlayCard==true){
			    node.on("mousedown",this.chooseCard,node);
			}
        }
    },
	closeCards:function(){
		var children=cc.find("Canvas/Deck").children;
		for (var i=0;i<children.length;++i)
            children[i].destroy();
        deck=cc.find('Canvas/Deck').getComponent('Deck');
		deck.node.off("mousedown",this.closeCards,deck);
		deck.node.on("mousedown",this.initDeck,deck);
    },
    initDeck:function(){
		this.role=cc.find("Canvas").getComponent("globalGame").nowPlayer;
		this.deck=this.role.getComponent("Person").cards;
        this.showCards();
        this.node.off("mousedown",this.initDeck,this);
        this.node.on("mousedown",this.closeCards,this);
    },
    onLoad () {
        
    },

    start () {
        this.node.on("mousedown",this.initDeck,this);

    },

    // update (dt) {},
});
