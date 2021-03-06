const input = {}
cc.Class({
	extends: cc.Component,

	properties: {
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
	onLoad() {
		this._speed = 200
		this.sp = cc.v2(0, 0)
		this.state = ''
		this.heroAni = this.node.getComponent(cc.Animation)
		cc.systemEvent.on('keydown', this.onKeydown, this)
		cc.systemEvent.on('keyup', this.onKeyup, this)
	},
	setState(state) {
		if (this.state == state) return
		this.state = state
		this.heroAni.play(this.state)
	},
	onKeydown(e) {
		input[e.keyCode] = 1
	},
	onKeyup(e) {
		input[e.keyCode] = 0
	},
	start() {

	},
	update(dt) {
		if(window.dialog && window.dialog.active === true) return
		if (input[cc.macro.KEY.w] || input[cc.macro.KEY.up]) {
			this.sp.y = 1
		} else if (input[cc.macro.KEY.s] || input[cc.macro.KEY.down]) {
			this.sp.y = -1
		} else {
			this.sp.y = 0
		}
		if (input[cc.macro.KEY.a] || input[cc.macro.KEY.left]) {
			this.sp.x = -1
		} else if (input[cc.macro.KEY.d] || input[cc.macro.KEY.right]) {
			this.sp.x = 1
		} else {
			this.sp.x = 0
		}

    this.lv = this.node.getComponent(cc.RigidBody).linearVelocity
		if (this.sp.x) {
			// this.node.x += this.sp.x * this._speed * dt
      this.lv.y = 0
      this.lv.x = this.sp.x * this._speed
		} else if (this.sp.y) {
			// this.node.y += this.sp.y * this._speed * dt
      this.lv.x = 0
      this.lv.y = this.sp.y * this._speed
		} else {
      this.lv.x = 0
      this.lv.y = 0
    }
    this.node.getComponent(cc.RigidBody).linearVelocity = this.lv
		let state = ''
		if(this.sp.x == 1) {
			state = 'hero_right'
		} else if(this.sp.x == -1) {
			state = 'hero_left'
		} else if(this.sp.y == 1) {
			state = 'hero_up'
		} else if(this.sp.y == -1) {
			state = 'hero_down'
		}
		if (state) {
			this.setState(state)
		} else {
			// this.heroAni.stop()
		}
		
	},
});
