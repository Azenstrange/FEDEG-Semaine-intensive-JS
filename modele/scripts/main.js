/* -------- Variables --------*/
/*const borne = document.querySelector('.borne')
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
  constructor(left_player,top_player,life,speed){
    this.left_player = left_player,
    this.top_player = top_player,
    this.speed = speed,
    this.life = life
  }
  display(game) {
    let captain_img = document.createElement('img')
    captain_img.setAttribute("src", "images/marvelart.gif")
    captain_img.classList.add('player_style')
    game.borne.appendChild(captain_img)
  }
  /*
  */
  update(game) {
    let player_style = document.querySelector('.player_style')
    player_style.style.top = this.top_player + '%'
    player_style.style.left = this.left_player + '%'
    let ship_liste_query = document.querySelectorAll(`.ship${game.ship_nb}`)
    for (let i = 0; i < ship_liste_query.length; i++) {
      let top= parseInt(ship_liste_query[i].style.top.substring(0,ship_liste_query[i].style.top.length-1))
      let left= parseInt(ship_liste_query[i].style.left.substring(0,ship_liste_query[i].style.left.length-1))

      if((ship_liste_query[i].style.display != "none")&&(collision_check(this.top_player,this.left_player,top, left))){
        this.lifeBar()
        ship_liste_query[i].style.display="none"
        if(game.compteur_ship > 0){
          game.compteur_ship -=1
        }
        ship_liste_query[i].style.top = "100%"
    }
  }
  }
  move(mouv){
    switch (mouv) {
      case "left":
        this.left_player -= 4
        break
      case "right":
        this.left_player += 4
        break
      case "top":
        this.top_player -= 2
        break
      case "bot":
        this.top_player += 2
      default:
        return
    }
  }

  lifeBar(){
    /*let coeur = document.querySelector('.heart_main')
    let size = parseInt(coeur.style.width.substring(0,coeur.style.width.length -2))
    if (size > 0) {
       coeur.style.width = size -25 + "px"
    }
    else {
      //gameOver()
    }*/
    let coeur = document.querySelectorAll('.life')
    switch(this.life){
      case 1:
        coeur[0].style.display = "none"
        this.life -= 1
        gameOver()
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
  constructor(type_ship, fire,top_ship = 25, left_ship = 45){
      this.type_ship = type_ship
      this.fire = fire
      this.top_ship = top_ship
      this.left_ship = left_ship
  }
  display(game){
      let shipImg = document.createElement('img')
      shipImg.setAttribute('src', this.type_ship)
      shipImg.setAttribute('class', 'ship'+ game.ship_nb)
      shipImg.classList.add('ship_image')
      game.borne.appendChild(shipImg)
    }
    scale(y,game){
      let ship_liste_query = document.querySelectorAll(`.ship${game.ship_nb}`)
      let ship_image = ship_liste_query[y]
      ship_image.style.top = this.top_ship + '%'
      ship_image.style.left = this.left_ship + '%'
    }
    ride(y,game){
      let ship_liste_query = document.querySelectorAll(`.ship${game.ship_nb}`)
      let ship_image = ship_liste_query[y]
      if(this.top_ship<99){
      this.top_ship += 1
      }
      else if((this.top_ship==99)&& (ship_image.style.display != "none") && (game.compteur_ship > 0)) {
        this.top_ship += 1
        game.compteur_ship -=1
      }
      else {

        ship_image.style.display = "none"
      }
    }

}

/*-----------Bullet class----------*/
class Bullet_Marvel{
  constructor(position_bullet_top, position_bullet_left, ennemi){
    this.position_bullet_top = position_bullet_top,
    this.position_bullet_left = position_bullet_left,
    this.ennemi = ennemi
  }
  display(game){
    if(!this.ennemi){
      let bullet = document.createElement('img')
      bullet.setAttribute('src', "images/energy.png")
      bullet.setAttribute('id', game.x)
      bullet.classList.add(`bullet`)
      game.borne.appendChild(bullet)

    }
    else {
      let bullet = document.createElement('img')
      bullet.setAttribute('src', "images/energy.png")
      bullet.classList.add('ship_image')
      game.borne.appendChild(bullet)

    }
  }
  update(y, game) {
    let bulletstyle = document.getElementById(y)
    let ship_liste_query = document.querySelectorAll(`.ship${game.ship_nb}`)
    if(bulletstyle.style.display != "none"){
      for (let i = 0; i < ship_liste_query.length; i++) {
      let top= parseInt(ship_liste_query[i].style.top.substring(0,ship_liste_query[i].style.top.length-1))


      let left= parseInt(ship_liste_query[i].style.left.substring(0,ship_liste_query[i].style.left.length-1))

      if((ship_liste_query[i].style.display != "none")&&(collision_check(this.position_bullet_top,this.position_bullet_left,top, left))){
        bulletstyle.style.display = "none"
        ship_liste_query[i].style.display="none"
        if(game.compteur_ship > 0){
          game.compteur_ship -=1
        }
        ship_liste_query[i].style.top = "100%"
      }
    }
  }
    if((this.position_bullet_top>0) && (bulletstyle.style.display != "none") )
    {
      this.position_bullet_top -= 5
      bulletstyle.style.top = this.position_bullet_top + '%'
      bulletstyle.style.left = this.position_bullet_left + '%'
    }
    else{
      bulletstyle.style.display = "none"
    }
  }
}
class Game{
  constructor(){
    this.borne = document.querySelector('.borne'), //select the div containing the game
    this.top_player = 82,// x of
    this.left_player =50,
    this.stopped = false,
    this.x = 0,
    this.ship_nb = 0,
    this.stopped = false,
    this.compteur_ship = 0,
    this.ship_path = ["images/ships/shipOne.gif","images/ships/shipTwo.gif","images/ships/shipThree.gif","images/ships/shipFour.gif", "images/ships/shipFive.gif", "images/ships/shipSix.gif", "images/ships/shipSeven.gif"]
    this.player = new Player(this.left_player, this.top_player, 6),
    this.bullets = [],
    this.list_ship = []
  }
}
/* -------- Initialisation --------*/

let game = new Game()
config()

/*-----function to refresh -----*/
function gameOver() {
  game.stopped = true
}
function init() { //start the loot for the refresh

  var loop = setInterval(function() {
      if(!game.stopped) {
        update(game)
        }
    }, 50)
}
function resetship(){
  game.list_ship =[]
  for (let v = 0; v < 5; v++) {
    //positionShip, fire,top_ship = 25, bot_ship = 10, right_ship = 50, left_ship = 45
    let top_rand = Math.floor(Math.random()*(10)+0)
    let left_rand = Math.floor(Math.random()*(80)+10)
    let rand_ship = Math.floor(Math.random()*7)
    const ship = new Ship(game.ship_path[rand_ship], 1, top_rand, left_rand)
    game.list_ship.push(ship)
  }
}
function config() {
  //gameOne.display()
  display()
  init()
}
function display() {
    game.player.display(game)
}
function displayship(){
  for (let i = 0; i < game.list_ship.length; i++) {
    game.list_ship[i].display(game)
  }
}
function update() {
    game.player.update(game)
    if(game.compteur_ship==0){
       resetship()
       game.compteur_ship += 5
       game.ship_nb++
       displayship()
      }
      for (let j = 0; j < game.bullets.length; j++) {
        game.bullets[j].update(j,game)
      }
    for (let i = 0; i < game.list_ship.length; i++) {
      game.list_ship[i].ride(i,game)
      game.list_ship[i].scale(i,game)
    }
}


/*--------Gestion des collisions----------*/
function collision_check(ax, ah, bx, bh) {
           let top = bx - ax
           let left = bh - ah
           if((top>0 && top < 20) && (left>-10 && left < 10)){
             return true
           }
           else {
             return false
           }
       }
/*---------Movement---------*/
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return // Do nothing if the event was already processed
  }
  switch (event.keyCode) {
    case 40:
      if((game.player.top_player < 87)){
        game.player.move("bot") //movement to the bottom

      }
      break
    case 38:
      if ((game.player.top_player >= 0)) {
        game.player.move("top")//movement to the top

      }
      break
    case 37:
      if ((game.player.left_player >= 0)) {
        game.player.move("left")//movement to the left
      }
      break
    case 39:
      if ((game.player.left_player < 86)) {
        game.player.move("right")//movement to the right

      }
      break
    case 32:
      let bullet = new Bullet_Marvel(game.player.top_player-5, game.player.left_player, false) // create an bullet
      bullet.display(game) // display the bullet
      bullet.update(game.x,game) //
      game.bullets.push(bullet)
      game.x++
      break;
    default:
      return // Quit when this doesn't handle the key event.
  }
  // Cancel the default action to avoid it being handled twice
  event.preventDefault()
}, true)


// Initialisation vaisseaux
