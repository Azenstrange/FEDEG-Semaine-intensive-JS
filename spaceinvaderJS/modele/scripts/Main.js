const canvas = document.createElement("canvas")
const width =  500, height = 500
const ctx = canvas.getContext("2d")

config()
function init() {

}
function config() {
    canvas.width= width
    canvas.height =height
    document.body.appendChild(canvas)
    init()
}
function draw() {

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
  mouvleft(){
    if(x<490){
    this.x += 10
  }
  }
  mouvright(){
    if(x>10){
    this.x -= 10
  }
  }
}

function inputHandeler() {
  document.addEventListener("keydown", function() {
    mouvleft()
  })
  document.addEventListener("keyup", function() {
    mouvright()
  })
}
