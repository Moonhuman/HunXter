// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		basex: 0,
		basey: 0,
		stepx: 0,
		stepy: 0,
		cell: {
			default: null,
			type: cc.Prefab,
		},
		map: null, //二维地图
		adj: null, //存边
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

    // LIFE-CYCLE CALLBACKS:
	
	GetEdge: function() {
		this.adj = new Array();
		for (var i = 0; i < 11; i++) {
			this.adj[i] = new Array();
			for (var j = 0; j < 11; j++) {
					this.adj[i][j] = new Array();
			}
		}
		//每一个四元数组表示：坐标(a[0],a[1])的cell和坐标(a[2],a[3])的cell之间有条边
		var edge = [
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
			[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 
		];
		for (var i = 0; i < edge.length; i++) {
			this.adj[edge[i][0]][edge[i][1]].push([edge[i][2], edge[i][3]]);
			this.adj[edge[i][1]][edge[i][2]].push([edge[i][0], edge[i][1]]);
		}
	},
	
    onLoad () {
		var map_matrix = [
			[1,1,1,1,1,1,1,1,1,1,1],
			[1,1,0,0,0,1,0,0,0,1,1],
			[1,0,1,0,0,1,0,0,1,0,1],
			[1,0,0,1,1,0,1,1,0,0,1],
			[1,0,0,1,0,0,0,1,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,1,0,0,0,1,0,0,1],
			[1,0,0,1,1,0,1,1,0,0,1],
			[1,0,1,0,0,1,0,0,1,0,1],
			[1,1,0,0,0,1,0,0,0,1,1],
			[1,1,1,1,1,1,1,1,1,1,1],
		];
		map = new Array();
		for (var i = 0; i < 11; i++) {
			map[i] = new Array();
			for (var j = 0; j < 11; j++) {
				map[i][j] = null;
				if (map_matrix[i][j] == 1) {
					var newcell = cc.instantiate(this.cell);
					newcell.parent = this.node; //将cell节点加到map节点之下
					newcell.setPosition(this.basex+this.stepx*i, this.basey+this.stepy*j);
					map[i][j] = newcell;
				}
			}
		}
		this.GetEdge(); //建边
	},

    start () {
		
    },

    // update (dt) {},
});
















