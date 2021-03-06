// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,
  properties: {
    mapNode: cc.Node,
    dialogNode: cc.Node
  },
  onLoad() {
    let p = cc.director.getPhysicsManager()
    p.enabled = true
    p.debugDrawFlags = true
    p.gravity = cc.v2(0, 0)
  },

  start() {
    for (let mapNode of this.mapNode.children) {
      let tiledMap = mapNode.getComponent(cc.TiledMap)
      let tiledSize = tiledMap.getTileSize()
      let layer = tiledMap.getLayer('wall')
      let layerSize = layer.getLayerSize()
      for (let i = 0; i < layerSize.width; i++) {
        for (let j = 0; j < layerSize.height; j++) {
          let tiled = layer.getTiledTileAt(i, j, true)
          if (tiled.gid !== 0) {
            tiled.node.group = 'wall'
            let body = tiled.node.addComponent(cc.RigidBody)
            body.type = cc.RigidBodyType.Static
            let collider = tiled.node.addComponent(cc.PhysicsBoxCollider)
            collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
            collider.size = tiledSize
            collider.apply()
          }
        }
      }
    }
    this.dialog = this.dialogNode.getComponent('dialog')
    // this.dialog.init([
    //   { role: 1, content: '.......' },
    //   { role: 1, content: '我这是在哪' },
    //   { role: 2, content: '我是张思远' },
    //   { role: 1, content: '我三天姿内撒了你' },
    //   { role: 2, content: '我不信' },
    //   { role: 1, content: '你不信我也要撒了你，受死吧' },
    // ])
  },

  // update (dt) {},
})
