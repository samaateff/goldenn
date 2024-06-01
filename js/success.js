let btn = document.getElementById("btn")
let btn2 = document.getElementById("btn2")
let btn3 = document.getElementById("btn3")


let img1 = document.getElementById("img1")
let img2 = document.getElementById("img2")
let img3 = document.getElementById("img3")


btn.addEventListener("click" , function(){
    img1.style.display = "block"
    img2.style.display = "none"
    img3.style.display = "none"
})
btn2.addEventListener("click" , function(){
    img1.style.display = "none"
    img2.style.display = "block"
    img3.style.display = "none"
})
btn3.addEventListener("click" , function(){
    img1.style.display = "none"
    img2.style.display = "none"
    img3.style.display = "block"
})