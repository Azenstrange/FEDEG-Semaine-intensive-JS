/* -------- Variables --------*/
const borne = document.createElement('div')
const width =  400, height = 600
let top_player = 82 , bot_player = 0, right_player = 50, left_player =50
let x = 0
let ship_nb = 0
let stopped = false
let compteur_ship = 0
const ship_path = ["images/ships/shipOne.gif","images/ships/shipTwo.gif","images/ships/shipThree.gif","images/ships/shipFour.gif", "images/ships/shipFive.gif", "images/ships/shipSix.gif", "images/ships/shipSeven.gif"]
// Function
/*
let gameOne = {
  display(){
      const michel = document.createElement('div')
      let titleOne = document.createElement('h2')
      titleOne.innerHTML = "Marvel Space"
      let titleTwo = document.createElement ('h2')
      titleTwo.innerHTML = "The Game"

      let starImg = document.createElement ('img')
      let starImg_two = document.createElement ('img')

      starImg.setAttribute ("src", "images/logoStar_up.png")
      starImg_two.setAttribute ("src", "images/logoStar_down.png")

      starImg.classList.add("starDesign")
      starImg_two.classList.add("starDesign_two")
    //  title.classList.add("captainMarvel")
      titleOne.classList.add("titleCaptain")
      titleTwo.classList.add("titleGame")

      michel.appendChild(starImg)
      michel.appendChild(titleOne)
      michel.appendChild(titleTwo)
      michel.appendChild(starImg_two)

      borne.appendChild(michel)
  },

// Créer le bouton Play
  addButton(){
      const button = document.createElement("input");
      button.classList.add("buttonPlay")
      button.type="button";
      button.value="Play";
      borne.appendChild(button);
  }
} */

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
    switch(this.life){
      case 1:
        coeur[0].style.display = "none"
        this.life -= 1
        //gameOver()
        break
      case 2:
        coeur[0].setAttribute('src', "images/lifeDown.png")
        this.life -= 1
        break
      case 3:
        coeur[1].style.display = "none"
        this.life -= 1
      break
      case 4:
      coeur[1].setAttribute('src', "images/lifeDown.png")
      this.life -= 1
      break
      case 5:
      coeur[2].style.display = "none"
      this.life -= 1
      break
      case 6:
      coeur[2].setAttribute('src', "images/lifeDown.png")
      this.life -= 1
      default:
        return
    }

  }
}

// Vaisseaux ennemis
class Ship{
  constructor(type_ship, fire,top_ship = 25, bot_ship = 10, right_ship = 50, left_ship = 45){
      this.type_ship = type_ship
      this.fire = fire
      this.top_ship = top_ship
      this.bot_ship = bot_ship
      this.right_ship = right_ship
      this.left_ship = left_ship
  }
  display(){
      let shipImg = document.createElement('img')
      shipImg.setAttribute('src', this.type_ship)
      shipImg.setAttribute('class', 'ship'+ ship_nb)
      shipImg.classList.add('ship_image')
      borne.appendChild(shipImg)
    }
    scale(y){
      let ship_liste_query = document.querySelectorAll(`.ship${ship_nb}`)
      let ship_image = ship_liste_query[y]
      ship_image.style.top = this.top_ship + '%'
      ship_image.style.bot = this.bot_ship + '%'
      ship_image.style.right = this.right_ship + '%'
      ship_image.style.left = this.left_ship + '%'
    }
    ride(y){
      let ship_liste_query = document.querySelectorAll(`.ship${ship_nb}`)
      let ship_image = ship_liste_query[y]
      if(this.top_ship<99){
      this.top_ship += 1
      }
      else if((this.top_ship==99)&& (ship_image.style.display != "none") && (compteur_ship > 0)) {
        this.top_ship += 1
        compteur_ship -=1
        console.log(compteur_ship)
      }
      else {

        ship_image.style.display = "none"
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
    let ship_liste_query = document.querySelectorAll(`.ship${ship_nb}`)
    if(bulletstyle.style.display != "none"){
      for (let i = 0; i < ship_liste_query.length; i++) {
      let top= parseInt(ship_liste_query[i].style.top.substring(0,ship_liste_query[i].style.top.length-1))

      let right= parseInt(ship_liste_query[i].style.right.substring(0,ship_liste_query[i].style.right.length-1))
      let left= parseInt(ship_liste_query[i].style.left.substring(0,ship_liste_query[i].style.left.length-1))

      if((ship_liste_query[i].style.display != "none")&&(aabb(this.position_bullet_top,this.position_bullet_right,this.position_bullet_left,top, right, left))){
        bulletstyle.style.display = "none"
        ship_liste_query[i].style.display="none"
        if(compteur_ship > 0){
          compteur_ship -=1
        }
        console.log(compteur_ship)
        ship_liste_query[i].style.top = "100%"
      }
    }
  }
    if((this.position_bullet_top>0) && (bulletstyle.style.display != "none") )
    {
      this.position_bullet_top -= 5


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

const player = new Player(right_player, left_player, top_player, bot_player, 6);
const bullets = []
let list_ship = []


config()
function init() {

  var loop = setInterval(function() {
      if(!stopped) {
        update()
        }
    }, 1000/15)
}
function resetship(){
  list_ship =[]
  for (let v = 0; v < 5; v++) {
    //positionShip, fire,top_ship = 25, bot_ship = 10, right_ship = 50, left_ship = 45
    let top_rand = Math.floor(Math.random()*(10)+0)
    let bot_rand = Math.floor(Math.random()*(80)+80)
    let left_rand = Math.floor(Math.random()*(80)+10)
    let right_rand = Math.floor(Math.random()*(80)+10)
    let rand_ship = Math.floor(Math.random()*7)
    const ship = new Ship(ship_path[rand_ship], 1, top_rand, bot_rand, left_rand, right_rand)
    list_ship.push(ship)
}
}
function config() {
  borne.classList.add("borne")
  document.body.appendChild(borne)
  //gameOne.display()
  display()
  init()
}
function display() {
    player.display()
    console.log(compteur_ship)
}
function displayship(){
  for (let i = 0; i < list_ship.length; i++) {
    list_ship[i].display()
  }
}
function update() {
    player.update()
    if(compteur_ship==0){
       resetship()
       compteur_ship += 5
       ship_nb++
       displayship()
      }

      for (let j = 0; j < bullets.length; j++) {
        bullets[j].update(j)
      }
    for (let i = 0; i < list_ship.length; i++) {
      list_ship[i].ride(i)
      list_ship[i].scale(i)
    }


}


/*---------Movement---------*/
function aabb(ax,  aw, ah, bx,  bw, bh) {
           let top = bx - ax


           let right = bw - aw

           let left = bh - ah

           if((top>0 && top < 20) && (right>-20 && right < 20) && (left>-20 && left < 20)){
             return true
           }
           else {
             return false
           }
       }

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return // Do nothing if the event was already processed
  }

  switch (event.keyCode) {
    case 40:
      if((player.bot_player >= 0)){
        player.bot()
 //temporaire pour les testsx
      }
      break
    case 38:
      if ((player.top_player >= 0)) {
        player.top()

      }
      break
    case 37:
      if ((player.left_player >= 0)) {
        player.left()

      }
      break
    case 39:
      if ((player.right_player >= 14)) {
        player.right()

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
