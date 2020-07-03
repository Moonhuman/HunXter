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
		routes: null, //暂存计算出来的多条路径
		cell: {
			default: null,
			type: cc.Prefab,
		},
		map: null, //二维地图
		adj: null, //存边，adj[i][j]是一个数组，数组中每个是与map[i][j]相连的map坐标
		signal: null,
    },
    // LIFE-CYCLE CALLBACKS:
	GetCell: function() {
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
		this.map = new Array();
		for (var i = 0; i < 11; i++) {
			this.map[i] = new Array();
			for (var j = 0; j < 11; j++) {
				this.map[i][j] = null;
				if (map_matrix[i][j] == 1) {
					var newcell = cc.instantiate(this.cell);
					newcell.parent = this.node; //将cell节点加到map节点之下
					newcell.setPosition(this.basex+this.stepx*i, this.basey+this.stepy*j);
					this.map[i][j] = newcell;
					var cell_js = this.map[i][j].getComponent("Cell");
					cell_js.mapx = i;
					cell_js.mapy = j;
					//以概率方式随机生成格子类型
					if ((i==0&&j==0) || (i==0&&j==10) || (i==10&&j==0) || (i==10&&j==10)) {
						cell_js.kind = 0;
						continue;
					}
					var p = Math.random();
					if (p < 0.4)
						cell_js.kind = 0; //空白格
					else if (p < 0.7)
						cell_js.kind = 1; //卡牌格
					else
						cell_js.kind = 2; //事件格
				}
			}
		}
	},
	
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
			[0,0,0,1],[0,1,0,2],[0,2,0,3],[0,3,0,4],[0,4,0,5],
			[0,5,0,6],[0,6,0,7],[0,7,0,8],[0,8,0,9],[0,9,0,10],
			[0,0,1,0],[0,0,1,1],[0,5,1,5],[0,10,1,9],[0,10,1,10],
			[1,0,2,0],[1,1,2,2],[1,5,2,5],[1,9,2,8],[1,10,2,10],
			[2,0,3,0],[2,2,3,3],[2,5,3,4],[2,5,3,6],[2,8,3,7],[2,10,3,10],
			[3,3,3,4],[3,6,3,7],
			[3,0,4,0],[3,3,4,3],[3,7,4,7],[3,10,4,10],
			[4,0,5,0],[4,3,5,2],[4,7,5,8],[4,10,5,10],
			[5,0,5,1],[5,1,5,2],[5,2,5,3],[5,3,5,4],[5,4,5,5],
			[5,5,5,6],[5,6,5,7],[5,7,5,8],[5,8,5,9],[5,9,5,10],
			[5,0,6,0],[5,2,6,3],[5,8,6,7],[5,10,6,10],
			[6,0,7,0],[6,3,7,3],[6,7,7,7],[6,10,7,10],
			[7,3,7,4],[7,6,7,7],
			[7,0,8,0],[7,3,8,2],[7,4,8,5],[7,6,8,5],[7,7,8,8],[7,10,8,10],
			[8,0,9,0],[8,2,9,1],[8,5,9,5],[8,8,9,9],[8,10,9,10],
			[9,0,10,0],[9,1,10,0],[9,5,10,5],[9,9,10,10],[9,10,10,10],
			[10,0,10,1],[10,1,10,2],[10,2,10,3],[10,3,10,4],[10,4,10,5],
			[10,5,10,6],[10,6,10,7],[10,7,10,8],[10,8,10,9],[10,9,10,10]
		];
		for (var i = 0; i < edge.length; i++) {
			this.adj[edge[i][0]][edge[i][1]].push([edge[i][2], edge[i][3]]);
			this.adj[edge[i][2]][edge[i][3]].push([edge[i][0], edge[i][1]]);
		}
	},
	
	BfsDis: function(sx, sy) {
		var dis = new Array();
		for (var i = 0; i < 11; i++) {
			dis[i] = new Array();
			for (var j = 0; j < 11; j++)
				dis[i][j] = -1;
		}
		q = [];
		q.push([sx, sy]);
		dis[sx][sy] = 0;
		while (q.length != 0) {
			var f = q[0];
			q.shift();
			var x = f[0], y = f[1];
			for (var i = 0; i < this.adj[x][y].length; i++) {
				var nx = this.adj[x][y][i][0], ny = this.adj[x][y][i][1];
				if (dis[nx][ny] != -1)
					continue;
				dis[nx][ny] = dis[x][y]+1;
				q.push([nx, ny]);
			}
		}
		return dis;
	},
	
	DfsForRoute: function(nowpos, num, vis, routes, route) {
		/*
			nowpos为当前搜索到的cell，num为剩余步数
			routes:路径集合，route:当前所在的一条路径
		*/
		var cell_js = nowpos.getComponent("Cell"); //获得cell节点的js组件，以便获得组件中的属性
		var x = cell_js.mapx, y = cell_js.mapy;
		if (vis[x][y] == 1)
			return;
		vis[x][y] = 1;
		route.push(nowpos);
		if (num == 0) {
			var newroute = [];
			for (var i = 0; i < route.length; i++)
				newroute.push(route[i]);
			routes.push(newroute);
			route.pop();
			vis[x][y] = 0;
			return;
		}
		for (var i = 0; i < this.adj[x][y].length; i++) {
			this.DfsForRoute(this.map[this.adj[x][y][i][0]][this.adj[x][y][i][1]], num-1, vis, routes, route);
		}
		route.pop();
		vis[x][y] = 0;
	},
	
	chooseRoute: function() {
		//此函数下的this是cell.js
		var par = this.node.parent.getComponent("GetMap");
		var route = par.routes[this.routeId];
		
		/*
		for (var i = 0; i < route.length; i++) {
			var cell_js = route[i].getComponent("Cell");
			console.log(cell_js.mapx, cell_js.mapy);
		}
		*/
		
		var mist = cc.find('Canvas/mist').getComponent('Mist');
		//关闭所有节点的监听
		for (var i = 0; i < 11; i++) {
			for (var j = 0; j < 11; j++) {
				if (par.map[i][j] == null)
					continue;
				var cell_js = par.map[i][j].getComponent("Cell");
				if (cell_js.inMonitor == 1) {
					cell_js.inMonitor = 0;
					cell_js.resetColor();
					cell_js.routeId = null;
					par.map[i][j].off("mousedown", this.chooseRoute, cell_js);
					mist.mistArr[i][j].color = cc.color(255, 255, 255, 255);
				}
			}
		}
		
		/*
		发送事件
		*/
		cc.game.emit('route-chosen', route);
	},
	FX: function() {
		//这里面的this是cell
		console.log(this.getComponent('Cell').mapx, this.getComponent('Cell').mapy);
		var map = cc.find('Canvas/map').getComponent('GetMap');
		cc.game.emit(this.parent.getComponent('GetMap').signal, this.getComponent('Cell').mapx, this.getComponent('Cell').mapy);
		for (var i = 0; i < 11; i++) {
			for (var j = 0; j < 11; j++) {
				if (map.map[i][j] == null)
					continue;
				map.map[i][j].off('mousedown', map.FX, map.map[i][j]);
			}
		}
	},
	
	openAllMonitor: function(sig) {
		this.signal=sig;
		for (var i = 0; i < 11; i++) {
			for (var j = 0; j < 11; j++) {
				if (this.map[i][j] == null)
					continue;
				this.map[i][j].on('mousedown', this.FX, this.map[i][j]);
			}
		}
	},
	
	openMonitor: function(routes) {
		//对每条路径的终点开启监听
		var mist = cc.find('Canvas/mist').getComponent('Mist');
		for (var i = 0; i < routes.length; i++) {
			var cell = routes[i][routes[i].length-1];
			var cell_js = cell.getComponent("Cell");
			cell_js.inMonitor = 1;
			cell_js.setColor();
			cell_js.routeId = i;
			cell.on("mousedown", this.chooseRoute, cell_js);
			mist.mistArr[cell_js.mapx][cell_js.mapy].color = cc.color(102,255,102,255);
		}
	},
	
	
	
	posEnable: function(nowpos, num) {
		//nowpos为cell类型的node, num为可移动步数
		//返回二维数组，第二维度的数组是由若干cell类型的node组成
		var vis = []; //标记是否经过
		for (var i = 0; i < 11; i++) {
			vis[i] = [];
			for (var j = 0; j < 11; j++) {
				vis[i][j] = 0;
			}
		}
		var routes = [];
		this.DfsForRoute(nowpos, num, vis, routes, []); //搜索路径
		this.routes = routes; //将得到的多条路径保存
		if (cc.find('Canvas').getComponent('globalGame').nowPlayer.name == 'Person1')
			this.openMonitor(routes); //对每条路径的终点开启监听
		else
			cc.find('Canvas').getComponent('AI').aiMove(routes);
		return routes;
	},
	
    onLoad () {
		this.GetCell(); //构建cell矩阵即map
		this.GetEdge(); //建边
		console.log(this.name+"onLoad");
	},

    start () {
		
		//this.posEnable(this.map[0][0], 5);
		
		
    },

    // update (dt) {},
});
















