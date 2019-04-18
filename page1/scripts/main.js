let div1=document.querySelector(".div1")
let div2=document.querySelector(".div2")
let annonceButton=document.querySelector(".annonceButton")
let close=document.querySelector(".close")

annonceButton.addEventListener(
  'click',
  function() {
    div1.style.transform= "translateY(-245px)"
    div1.style.transition="all 3s"
    div2.style.transform= "translateY(225px)"
    div2.style.transition= "all 3s"
  }
)

close.addEventListener(
  'click',
  function() {
    div1.style.transform= "translateY(0px)"
    div1.style.transition="all 3s"
    div2.style.transform= "translateY(0px)"
    div2.style.transition= "all 3s"
  }
)
