const canvas = document.createElement("canvas")
const width =  500, height = 500
const ctx = canvas.getContext("2d")

config()
function init() {
  var player = new Player((width-32)/2, height - 2*32, 32, 32, 6);
}
function config() {
    canvas.width= width
    canvas.height =height
    document.body.appendChild(canvas)
    init()
}
function draw() {

}
function update() {
    player.update();
}
class Player{
  constructor(x,y,h,w,life,s){
    this.x = x,
    this.y = y,
    this.h = h,
    this.w = w,
    this.life = life,
    this.s = s
  }
  update() {
    if(input.isDown(KEYS.RIGHT)) this.x += this.speed;
    if(input.isDown(KEYS.LEFT)) this.x -= this.speed;
  }
}
