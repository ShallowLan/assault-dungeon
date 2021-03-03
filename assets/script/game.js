// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    tiledMap: cc.TiledMap,
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

  onLoad() {
    let p = cc.director.getPhysicsManager()
    p.enabled = true
    // p.debugDrawFlags = true
    p.gravity = cc.v2(0, 0)
  },

  start() {
    let tiledSize = this.tiledMap.getTileSize()
    let layer = this.tiledMap.getLayer('wall')
    let layerSize = layer.getLayerSize()
    for (let i = 0; i < layerSize.width; i++) {
      for (let j = 0; j < layerSize.height; j++) {
        let tiled = layer.getTiledTileAt(i, j, true)
        if(tiled.gid !==0) {
          tiled.node.group = 'wall'
          let body = tiled.node.addComponent(cc.RigidBody)
          body.type = cc.RigidBodyType.Static
          let collider = tiled.node.addComponent(cc.PhysicsBoxCollider)
          collider.offset = cc.v2(tiledSize.width/2,tiledSize.height/2)
          collider.size = tiledSize
          collider.apply()
        }
      }
    }
  },

  // update (dt) {},
})
