/* Music play */
let soundActive = document.querySelector(".soundActive")
let soundtrack = document.querySelector(".soundtrack")
let soundOff = 0
soundActive.addEventListener(
  'click',
  function(){
    if(soundOff == 0){
      soundtrack.play()
      soundOff = 1
    }
    else{ 
      soundtrack.pause()
      soundOff = 0
    }
  }
)

/* Functions */
// Beginning of the game "Marvel Space" and button Play
let gameOne = {
  display(borne){
      // Creation div container
      const container = document.createElement('div')
      container.classList.add("gameone")
      // Creation of titles
      let titleOne = document.createElement('p')
      titleOne.innerHTML = "Marvel Space"
      let titleTwo = document.createElement ('p')
      titleTwo.innerHTML = "The Game"

      // Creation of the button
      const containerButton = document.createElement('div')
      const button = document.createElement("a");
      button.classList.add("buttonPlay")
      button.setAttribute('href', '#')
      button.setAttribute ('title', 'Play')
      button.innerHTML = 'Play'

      // Creation of images
      let starImg = document.createElement ('img')
      let starImg_two = document.createElement ('img')

      starImg.setAttribute ("src", "images/logoStar_up.png")
      starImg_two.setAttribute ("src", "images/logoStar_down.png")

      // Attribution of classes
      starImg.classList.add("starDesign")
      starImg_two.classList.add("starDesign_two")
      titleOne.classList.add("titleCaptain")
      titleTwo.classList.add("titleGame")

      // Initialisation
      container.appendChild(starImg)
      container.appendChild(titleOne)
      container.appendChild(titleTwo)
      containerButton.appendChild(button)
      container.appendChild(containerButton)
      container.appendChild(starImg_two)
      borne.appendChild(container)
  },

}
// End of the gameOne

// Second page with characters and Let's Go button
let gameTwo ={
  display(borne){
      //Creation div container
      const pageTwo = document.createElement('div')
      pageTwo.classList.add("gametwo")

      // Creation of titles
      let charactersTitle = document.createElement('p')
      charactersTitle.innerHTML = "Characters"
      let howPlay = document.createElement ('p')
      howPlay.innerHTML = "How to play ?"

      // Creation of the button
      const divButton = document.createElement('div')
      const button = document.createElement("a");
      button.classList.add("buttonGo")
      button.setAttribute('href', '#')
      button.setAttribute ('title', 'Lets Go !')
      button.innerHTML = 'Lets Go !'

      // Creation of images
      let starImg = document.createElement ('img')
      starImg.setAttribute ("src", "images/logoStar_up.png")
      let starImg_two = document.createElement ('img')
      starImg_two.setAttribute ("src", "images/logoStar_down.png")
      let characMarvel = document.createElement('img')
      characMarvel.setAttribute ("src", "images/marvelart.png" )
      let characThanos = document.createElement ('img')
      characThanos.setAttribute("src", "images/thanos_attack.png")
      let characShip = document.createElement ('img')
      characShip.setAttribute("src", "images/spaceship-pixelart.png")

      // Attribution of classes
      starImg.classList.add("starDesign")
      starImg_two.classList.add("starDesign_two")
      charactersTitle.classList.add("charactersTitle")
      characMarvel.classList.add("characMarvel")
      characThanos.classList.add("characThanos")
      characShip.classList.add("characShip")
      howPlay.classList.add("howPlay")

      // Iniatialisation
      pageTwo.appendChild(starImg)
      pageTwo.appendChild(charactersTitle)
      pageTwo.appendChild(characMarvel)
      pageTwo.appendChild(characThanos)
      pageTwo.appendChild(characShip)
      pageTwo.appendChild(howPlay)
      divButton.appendChild(button)
      pageTwo.appendChild(divButton)
      pageTwo.appendChild(starImg_two)
      borne.appendChild(pageTwo)
  }
}
// End of the gameTwo


/* -------- Class --------*/
class Player{
  constructor(left_player,top_player,life,speed){
    this.left_player = left_player, //position y of the player
    this.top_player = top_player, // position x of the player
    this.life = life // life of the player
  }

  /*
    display the player in the game
  */
  display(game) {
    let captain_img = document.createElement('img')
    captain_img.setAttribute("src", "images/marvelart.gif")
    captain_img.classList.add('player_style')
    game.borne.appendChild(captain_img)
  }
  /*
  update the position of the player in the game
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
        setDamage(1)
        lifeBar()
        ship_liste_query[i].style.display="none"
        if(game.compteur_ship > 0){
          game.compteur_ship -=1
        }
        ship_liste_query[i].style.top = "100%"
    }
  }
  }
  /*
  to move the player
  */
  move(mouv){
    switch (mouv) {
      case "left":
        this.left_player -= 6
        break
      case "right":
        this.left_player += 6
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
}

class Explosion{
  constructor(top_ship, left_ship, count = 1){
    this.top_ship = top_ship,
    this.left_ship = left_ship,
    this.count = count
  }
  display(game){
      let explo_img = document.createElement('img')
      explo_img.setAttribute('src', 'images/ships/explosion.gif')
      explo_img.setAttribute('class', 'explosion')
      explo_img.classList.add('ship_image')
      game.borne.appendChild(explo_img)
      explo_img.style.top = this.top_ship + '%'
      explo_img.style.left = this.left_ship + '%'

    }
    update(explo, game){
      let explosi = document.querySelectorAll('.explosion')
      if(this.count > 12){
        explosi[explo].style.display = "none"
      }
      else {
        this.count += 1
      }
    }
  }
// Vaisseaux ennemis
class Ship{
  constructor(type_ship, fire,top_ship = 25, left_ship = 45){
      this.type_ship = type_ship // type of ship used
      this.fire = fire  //if the ship fire or not
      this.top_ship = top_ship //the position x of the ship
      this.left_ship = left_ship // the position y of the ship
  }
  /*
  display the ship in the game
  */
  display(game){
      let shipImg = document.createElement('img')
      shipImg.setAttribute('src', this.type_ship)
      shipImg.setAttribute('class', 'ship'+ game.ship_nb)
      shipImg.classList.add('ship_image')
      game.borne.appendChild(shipImg)
      if(this.fire){
        let bullet = new Bullet_Marvel(this.top_ship-5, this.left_ship, true) // create an bullet
        bullet.display(game) // display the bullet
        bullet.update(game.x,game) // start the update
        game.bullets.push(bullet) //put the bullet in the bullet list
        game.x++ // update the counter
      }
    }
    /*
    update the position of the ship
    */
  scale(y,game){
      let ship_liste_query = document.querySelectorAll(`.ship${game.ship_nb}`)
      let ship_image = ship_liste_query[y]
      ship_image.style.top = this.top_ship + '%'
      ship_image.style.left = this.left_ship + '%'
    }
    /*
    make the ship move
    */
  ride(y,game){
      let ship_liste_query = document.querySelectorAll(`.ship${game.ship_nb}`)
      let ship_image = ship_liste_query[y]
      if(this.top_ship<99){
      this.top_ship += 1
      }
      else if((this.top_ship==99)&& (ship_image.style.display != "none") && (game.compteur_ship > 0)) {
        this.top_ship += 1
        game.compteur_ship -=1
        game.score -= 50
      }
      else {

        ship_image.style.display = "none"
      }
    }

}
/*-----------Bullet class----------*/
class Bullet_Marvel{
  constructor(position_bullet_top, position_bullet_left, ennemi){
    this.position_bullet_top = position_bullet_top,//origin point x of the bullet
    this.position_bullet_left = position_bullet_left, // origin point y ofthe bullet
    this.ennemi = ennemi // is the bullet from an ennemi?
  }
  /*
  display the bullet in the game
  */
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
      bullet.setAttribute('id', game.x)
      bullet.classList.add(`bullet`)
      game.borne.appendChild(bullet)
    }
  }
  /*
  update the bullet in the game
  */
  update(y, game) {
    let bulletstyle = document.getElementById(y)
    let ship_liste_query = document.querySelectorAll(`.ship${game.ship_nb}`)
    if(bulletstyle.style.display != "none"){
      for (let i = 0; i < ship_liste_query.length; i++) {
      let top= parseInt(ship_liste_query[i].style.top.substring(0,ship_liste_query[i].style.top.length-1))
      let top_p = game.player.top_player
      let left_p = game.player.left_player
      let left= parseInt(ship_liste_query[i].style.left.substring(0,ship_liste_query[i].style.left.length-1))

      if((!this.ennemi)&&(ship_liste_query[i].style.display != "none")&&(collision_check(this.position_bullet_top,this.position_bullet_left,top, left))){
        bulletstyle.style.display = "none"
        let explosion = new Explosion(top,left)
        explosion.display(game)
        game.list_explo.push(explosion)
        game.score += 100
        ship_liste_query[i].style.display="none"
        if(game.compteur_ship > 0){
          game.compteur_ship -=1
        }
      ship_liste_query[i].style.top = "100%"
      }
      if ((this.ennemi)&&(bulletstyle.style.display != "none")&&(collision_check(this.position_bullet_top,this.position_bullet_left,top_p, left_p))) {
        bulletstyle.style.display = "none"
        setDamage(1)
        lifeBar()
      }
    }

  }
  if((this.position_bullet_top>0) && (bulletstyle.style.display != "none")&& (!this.ennemi) )
  {
    this.position_bullet_top -= 5
    bulletstyle.style.top = this.position_bullet_top + '%'
    bulletstyle.style.left = this.position_bullet_left + '%'
  }
  else if((this.position_bullet_top<100) && (bulletstyle.style.display != "none")&& (this.ennemi)){
    this.position_bullet_top += 2
    bulletstyle.style.top = this.position_bullet_top + '%'
    bulletstyle.style.left = this.position_bullet_left + '%'
  }
  else
  {
    bulletstyle.style.display = "none"
  }
}
}


/*-----The Game class, with every const and variable in the game-------*/
class Game{
  constructor(){
    this.borne = document.querySelector('.borne'), //select the div containing the game
    this.top_player = 82,// position x of the player
    this.left_player =50,// position y of the player
    this.stopped = false, // is the game stopped?
    this.life = 6,
    this.x = 0, // counter of the nb of bullet
    this.ship_nb = 0, // number of wave of ship
    this.compteur_ship = 0, // number of ship in the game
    this.ship_path = ["images/ships/shipOne.gif","images/ships/shipTwo.gif","images/ships/shipThree.gif","images/ships/shipFour.gif", "images/ships/shipFive.gif", "images/ships/shipSix.gif", "images/ships/shipSeven.gif"] // the skin of ennemi ship
    this.player = new Player(this.left_player, this.top_player), // to set the player
    this.bullets = [], // a tab with all the active bullets
    this.list_ship = [], // a tab with all the active ennemi ships
    this.list_explo = [], // a list with all the explosion
    this.shield = 6, // the value of the shield
    this.shield_reload = 600, //the time for the shield to refresh
    this.score = 0,
    this.progress = document.querySelector('#avancement')
  }
}
/* -------- Initialisation --------*/
// Show loading animation.

config_menu()
let game
function config_menu() {
  let borne = document.querySelector('.borne')
  borne.classList.add("borne")
  document.body.appendChild(borne)
  gameOne.display(borne)
  // Click on "Play" , the first page disapeared and the second page is popping
  let buttonPlay = document.querySelector('.buttonPlay')
    buttonPlay.addEventListener(
    'click',
    function(){
        let display = document.querySelector(".gameone")
        display.style.display = "none"
        gameTwo.display(borne)
        let buttonTwo = document.querySelector('.buttonGo')
        button_page(buttonTwo)

    })
  }

  // The sentence appeared when click on "Let's go"
  let visible = document.querySelector(".sentence") 
  function start (){
    setTimeout(function(){
      visible.style.display="block"
    }, 1000)
  } 
  function stop(){
    setTimeout(function(){
      visible.style.display="none"
    }, 3000)
  }
// Timer counting down to 0
  let timer = document.querySelector('.compteur')
  let number = 3
  function count(){
    goTimer = setInterval(function(){
      if (number > 0){
        number--
        timer.innerHTML = (number)
        console.log("coucou")
      } else {
        config()
        timer.style.display="none"
        clearInterval(goTimer);
      }
    },1000)
  } 
 // The game is starting after the timer
  function button_page(button){
    button.addEventListener(
      'click',
      function(){
          let display = document.querySelector(".gametwo")
          display.style.display = "none"
          game = new Game()
          start()
          stop()
          count()
          
      }
    )
  }

//let game = new Game() // let's start the game
//config() // let's start the game
function setDamage(damage = 0){
  game.progress.setAttribute('value', game.shield )
  game.progress.setAttribute('max', 6)
  addEventListener('click', function(){
    game.progress.setAttribute('value', game.shield -= damage)
  })
}

/*-----function to refresh -----*/
function gameOver() {
  game.stopped = true
  let borne = game.borne
  let div = document.createElement('div')
  let gameover = document.createElement('p')
  div.classList.add('finalscore_block')
  gameover.classList.add('finalscore')
  gameover.innerHTML = "Game Over! Your score is " + game.score
  div.appendChild(gameover)
  game.borne.appendChild(div)
  let player = document.querySelector('.player_style')
  player.style.display = "none"
  let ship_liste_query = document.querySelectorAll(`.ship${game.ship_nb}`)
  for(let i = 0; i < ship_liste_query.length;i++){
    ship_liste_query[i].style.display = "none"
  }

}
function init() { //start the loop for the refresh

  var loop = setInterval(function() {
      if(!game.stopped) {
        update(game)
        }
    }, 40)
}
/*
if the wave is finish we send a new one
*/
function resetship(){
  game.list_ship =[]
  for (let v = 0; v < 5; v++) {
    //positionShip, fire,top_ship = 25, bot_ship = 10, right_ship = 50, left_ship = 45
    let top_rand = Math.floor(Math.random()*(10)+0)
    let left_rand = Math.floor(Math.random()*(80)+10) // to set the position of new ships but random!
    let rand_ship = Math.floor(Math.random()*7)
    let rand_fire = Math.floor(Math.random()*2)
    let fire_bool = false
    if(rand_fire==1)
    {
      fire_bool= true
    }
    const ship = new Ship(game.ship_path[rand_ship], fire_bool, top_rand, left_rand)
    game.list_ship.push(ship)
  }
}
/*
we display the element in the game then we start the loop
 */
function config() {
  //gameOne.display()
  display()
  init()
}
/*
display the game
*/
function display() {
    game.player.display(game)
}
/*
display ship != from the last one because their are new ship every waves
*/
function displayship(){
  for (let i = 0; i < game.list_ship.length; i++) {
    game.list_ship[i].display(game)
  }
}
/*
let update the game
*/
function update() {
    game.player.update(game)
    if(game.compteur_ship==0){
       resetship()
       game.compteur_ship += 5
       game.ship_nb++
       displayship()
      }
      /*update of bullets*/
      for (let j = 0; j < game.bullets.length; j++) {
        game.bullets[j].update(j,game)
      }
      /* update of ship*/
    for (let i = 0; i < game.list_ship.length; i++) {
      game.list_ship[i].ride(i,game)
      game.list_ship[i].scale(i,game)
    }
    /* update of explosion*/
    for (let v = 0; v < game.list_explo.length; v++){
      game.list_explo[v].update(v, game)
    }
    /* update of the shield*/
    if(game.shield_reload < 0){
      game.shield_reload = 300
      game.shield = 6
    }
    else {
      game.shield_reload --
    }
    setDamage()
    let shield = document.querySelector('.player_style')
    if((game.shield != 0)&&(!shield.classList.contains('shieldDesign')))
    {
      shield.classList.toggle('shieldDesign')
    }
    else if((game.shield == 0)&&(shield.classList.contains('shieldDesign')))
    {
      shield.classList.remove('shieldDesign')
    }
}
/*
to make the player lose health
*/
function lifeBar(){
  /*let coeur = document.querySelector('.heart_main')
  let size = parseInt(coeur.style.width.substring(0,coeur.style.width.length -2))
  if (size > 0) {
     coeur.style.width = size -25 + "px"
  }
  else {
    //gameOver()
  }*/
  let coeur = document.querySelectorAll('.life')
  if(game.shield<=0){
    switch(game.life){
      case 1:
        coeur[0].style.display = "none"
        game.life -= 1
        gameOver()
        break
      case 2:
        coeur[0].setAttribute('src', "images/lifeDown.png")
        game.life -= 1
        break
      case 3:
        coeur[1].style.display = "none"
        game.life -= 1
      break
      case 4:
      coeur[1].setAttribute('src', "images/lifeDown.png")
      game.life -= 1
      break
      case 5:
      coeur[2].style.display = "none"
      game.life -= 1
      break
      case 6:
      coeur[2].setAttribute('src', "images/lifeDown.png")
      game.life -= 1
      break
      default:
        return
    }
  }
    else {

      game.shield--
  }
}
/*--------collision_check----------*/
function collision_check(ax, ah, bx, bh) {
           let top = bx - ax
           let left = bh - ah
           if((top>-5 && top < 5) && (left>-10 && left < 10)){
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
      bullet.update(game.x,game) // start the update
      game.bullets.push(bullet) //put the bullet in the bullet list
      game.x++ // update the counter
      break
    default:
      return // Quit when this doesn't handle the key event.
  }
  // Cancel the default action to avoid it being handled twice
  event.preventDefault()
}, true)
