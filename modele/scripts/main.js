const borne = document.createElement('div')

const width =  400, height = 600
const top_player = '82%', bot_player = '0%', right_player = '40%', left_player = '40%'

//106 194


class Player{
  constructor(w,h,x,y,life,s){
    this.x = x,
    this.y = y,
    this.h = w,
    this.w = h,
    this.s = s,
    this.life = life
  }
  display() {
    let captain_img = document.createElement('img')
    captain_img.setAttribute("src", "images/marvelart.png")
    captain_img.classList.add('player_style')
    borne.appendChild(captain_img)
  }
  update() {
    let player_style = document.querySelector('.player_style')
    player_style.style.top = this.x
    player_style.style.bot = this.y
    player_style.style.right = this.w
    player_style.style.left = this.h
  }
}



const player = new Player(right_player, left_player, top_player, bot_player, 6);
config()
function init() {
  display()
  update()
}
function config() {
  borne.classList.add("borne")
  document.body.appendChild(borne)
  init()
}
function display() {
    player.display()
}
function update() {
    player.update()
}
