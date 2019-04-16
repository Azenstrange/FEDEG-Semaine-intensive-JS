/* -------- Variables --------*/
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
  lifeBar(){
    let coeur = document.querySelectorAll('.life')
    switch(life){
      case 1: 
        coeur[0].style.display = "none"
        life--
        //gameOver()
        break
      case 2:
        coeur[0].setAttribute('src', "images/lifeDown.png")
        life--
        break
      case 3:
        coeur[1].style.display = "none"
        life --
      break
      case 4:
      coeur[1].setAttribute('src', "images/lifeDown.png")
      life --
      break
      case 5:
      coeur[2].style.display = "none"
      life--
      break
      case 6:
      coeur[2].setAttribute('src', "images/lifeDown.png")
      life --
      default:
        return
    }

  }
}

// Vaisseaux ennemis 
class Ship{
  constructor(positionShip, fire,top_ship = 25, bot_ship = 10, right_ship = 50, left_ship = 45){
      this.positionShip = positionShip
      this.fire = fire
      this.top_ship = top_ship
      this.bot_ship = bot_ship
      this.right_ship = right_ship
      this.left_ship = left_ship
  }
  display(){
      let shipImg = document.createElement('img')
      shipImg.setAttribute('src', "images/shipOne.png")
      shipImg.classList.add('ship_image')
      borne.appendChild(shipImg)
    }
    scale(){
      let ship_image = document.querySelector('.ship_image')
      ship_image.style.top = this.top_ship + '%'
      ship_image.style.bot = this.bot_ship + '%'
      ship_image.style.right = this.right_ship + '%'
      ship_image.style.left = this.left_ship + '%'
    }
    ride(){
      this.top_ship -= 1 
    }

}

/* -------- Initialisation --------*/
const ship = new Ship(1, 1)
const player = new Player(right_player, left_player, top_player, bot_player, 6);
config()
function init() {
  display()
  ship.scale()
  ship.ride()
  update()
}
function config() {
  borne.classList.add("borne")
  document.body.appendChild(borne)
  init()
}
function display() {
    player.display()
    ship.display()
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


// Initialisation vaisseaux

function scale() {
    ship.scale()
}