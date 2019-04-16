/* -------- Variables --------*/
const borne = document.createElement('div')
const width =  400, height = 600
let top_player = 82 , bot_player = 0, right_player = 50, left_player =50
let x = 0
let ship_nb = 0
let stopped = false
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
    captain_img.setAttribute("src", "images/marvelart.gif")
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
      shipImg.setAttribute('id', 'ship'+ ship_nb)
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
      if(this.top_ship<100){
      this.top_ship += 1
      }
    }

}

/*-----------Bullet class----------*/
class Bullet_Marvel{
  constructor(position_bullet_top, position_bullet_bot, position_bullet_right, position_bullet_left, ennemi){
    this.position_bullet_top = position_bullet_top,
    this.position_bullet_bot = position_bullet_bot,
    this.position_bullet_right = position_bullet_right,
    this.position_bullet_left = position_bullet_left,
    this.ennemi = ennemi
  }
  display(){
    if(!this.ennemi){
      let bullet = document.createElement('img')
      bullet.setAttribute('src', "images/energy.png")
      bullet.setAttribute('id', x)
      bullet.classList.add(`bullet`)
      borne.appendChild(bullet)

    }
    else {
      let bullet = document.createElement('img')
      bullet.setAttribute('src', "images/energy.png")
      bullet.classList.add('ship_image')
      borne.appendChild(bullet)

    }
  }
  update(y) {
    let bulletstyle = document.getElementById(y)
    if(this.position_bullet_top>0)
    {
      this.position_bullet_top -= 5
      this.position_bullet_bot += 5

      bulletstyle.style.top = this.position_bullet_top + '%'
      bulletstyle.style.bot = this.position_bullet_bot + '%'
      bulletstyle.style.right = this.position_bullet_right + '%'
      bulletstyle.style.left = this.position_bullet_left + '%'
    }
    else{
      bulletstyle.style.display = "none"
    }
  }
}

/* -------- Initialisation --------*/
const ship = new Ship(1, 1)
ship_nb++
const player = new Player(right_player, left_player, top_player, bot_player, 6);
const bullets = []
config()
function init() {
  display()
  var loop = setInterval(function() {
      if(!stopped) {
        update()
      }
    }, 1000)
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
    ship.scale()
    ship.ride()
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].update(i)
    }

}


/*---------Movement---------*/
function AABB(ax, ay, aw, ah, bx, by, bw, bh) {
           return ax<bx+bw && ay<by+bh && bx<ax+aw && by<ay+ah;
       }

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return // Do nothing if the event was already processed
  }

  switch (event.keyCode) {
    case 40:
      if((player.bot_player >= 0)){
        player.bot()
        player.update() //temporaire pour les testsx
      }
      break
    case 38:
      if ((player.top_player >= 0)) {
        player.top()
        player.update()
      }
      break
    case 37:
      if ((player.left_player >= 0)) {
        player.left()
        player.update()
      }
      break
    case 39:
      if ((player.right_player >= 14)) {
        player.right()
        player.update()
      }
      break
      case 32:
        let bullet = new Bullet_Marvel(player.top_player-5, player.bot_player, player.right_player, player.left_player, false)
        bullet.display()
        bullet.update(x)
        bullets.push(bullet)
        x++
        break;
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
