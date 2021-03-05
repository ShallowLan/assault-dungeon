roleMap = {
  1: {
    name: '勇者',
    url: 'role/hero',
  },
  2: {
    name: '骷髅王',
    url: 'role/npc',
  },
}
cc.Class({
  extends: cc.Component,
  properties: {
    picSprite: cc.Sprite,
    nameLabel: cc.Label,
    textLabel: cc.Label
  },
  onLoad() {
    this.init([
      { role: 1, coentent: '我是勇士' },
      { role: 2, coentent: '我是胡旭东' },
      { role: 1, coentent: '我三天姿内撒了你'},
      { role: 2, coentent: '我不信'},
    ])
    cc.systemEvent.on('keydown', this.onKeydown, this)
    cc.systemEvent.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
      console.log('Mouse down');
    }, this);
  },
  onDestroy() {
    cc.systemEvent.off('keydown', this.onKeydown, this)
  },
  onMousedown() {
    console.log('___________________((')
  },
  onKeydown(e) {
    switch(e.keyCode) {
      case cc.macro.KEY.space: {
        this.nextTextData()
        break
      }
    }
  },
  init(testDataArr) {
    this.textIndex = -1
    this.testDataArr = testDataArr
    this.node.active = true
    this.nextTextData()
  },
  nextTextData() {
    if (++this.textIndex < this.testDataArr.length) {
      this.setTextData(this.testDataArr[this.textIndex])
    } else {
      this.closeDialog()
    }
  },
  setTextData(textData) {
    this.nameLabel.string = roleMap[textData.role].name
    this.textLabel.string = textData.coentent

    cc.loader.loadRes(
      roleMap[textData.role].url,
      cc.SpriteFrame,
      (err, texture) => {
        this.picSprite.spriteFrame = texture
      }
    )
  },
  closeDialog() {
    this.node.active = false
  },
  start() {},
  // update (dt) {},
})
