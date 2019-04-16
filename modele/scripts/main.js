/* -------- Variable --------*/
const borne = document.createElement('div')
const width =  400, height = 600
let top_player = 82 , bot_player = 0, right_player = 50, left_player =50

/* -------- Class --------*/
class Player{
  constructor(right_player,left_player,top_player,bot_player,life,speed){
    this.right_player = right_player,
    this.left_player = left_player,
    this.top_player = top_player,
    this.bot_player = bot_player,
    this.speed = speed,
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
    player_style.style.top = this.top_player + '%'
    player_style.style.bot = this.bot_player + '%'
    player_style.style.right = this.right_player + '%'
    player_style.style.left = this.left_player + '%'
  }
  left(){
    this.left_player -= 1
    this.right_player += 1
  }
  right(){
    this.left_player += 1
    this.right_player -= 1
  }
  top(){
    this.top_player -= 1
    this.bot_player += 1
  }
  bot(){
    this.bot_player -= 1
    this.top_player += 1
  }
}

/* -------- Initialisation --------*/
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


/*---------Movement---------*/

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      if((player.bot_player >= 0)){
        player.bot()
        player.update() //temporaire pour les testsx
      }
      break
    case "ArrowUp":
      if ((player.top_player >= 0)) {
        player.top()
        player.update()
      }
      break
    case "ArrowLeft":
      if ((player.left_player >= 0)) {
        player.left()
        player.update()
      }
      break
    case "ArrowRight":
      if ((player.right_player >= 14)) {
        player.right()
        player.update()
      }
      break
    default:
      return // Quit when this doesn't handle the key event.
  }
  // Cancel the default action to avoid it being handled twice
  event.preventDefault()
}, true)
