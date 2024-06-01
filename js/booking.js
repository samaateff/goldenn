let btn = document.getElementById("btn");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let toBook = document.getElementById("toBook");
let toBook2 = document.getElementById("toBook2");
let toBook3 = document.getElementById("toBook3");
let toBook4 = document.getElementById("toBook4");
let toBook5 = document.getElementById("toBook5");
let toBook6 = document.getElementById("toBook6");
let card = document.getElementById("card");
let card2 = document.getElementById("card2");
let card3 = document.getElementById("card3");
let card4 = document.getElementById("card4");
let card5 = document.getElementById("card5");
let card6 = document.getElementById("card6");
let cardText = document.getElementById("cardText")
let cardText2 = document.getElementById("cardText2")
let cardText3 = document.getElementById("cardText3")
let cardText4 = document.getElementById("cardText4")
let cardText5 = document.getElementById("cardText5")
let cardText6 = document.getElementById("cardText6")

let isClicked = false;

let isClicked2 = false;
let isClicked3 = false;
let isClicked4 = false;
let isClicked5 = false;
let isClicked6 = false;

card.addEventListener("click", function () {
  if (!isClicked) {
    btn.innerHTML = "تم التحديد";
    btn.style.backgroundColor = "#CB1B64";
    btn.style.color = "white";
    toBook.style.display = "block";
    cardText.style.borderColor = "#F52E81";
  } else {
    btn.innerHTML = "تحديد";
    btn.style.backgroundColor = "#b4b4b4";
    btn.style.color = "#707070";
    toBook.style.display = "none";
    cardText.style.borderColor = "transparent";
  }
  isClicked = !isClicked;
});

card2.addEventListener("click", function () {
  if (!isClicked2) {
    btn2.innerHTML = "تم التحديد";
    btn2.style.backgroundColor = "#CB1B64";
    btn2.style.color = "white";
    toBook2.style.display = "block";
    cardText2.style.borderColor = "#F52E81";
  } else {
    btn2.innerHTML = "تحديد";
    btn2.style.backgroundColor = "#b4b4b4";
    btn2.style.color = "#707070";
    toBook2.style.display = "none";
    cardText2.style.borderColor = "transparent";
  }
  isClicked2 = !isClicked2;
});

card3.addEventListener("click", function () {
  if (!isClicked3) {
    btn3.innerHTML = "تم التحديد";
    btn3.style.backgroundColor = "#CB1B64";
    btn3.style.color = "white";
    toBook3.style.display = "block";
    cardText3.style.borderColor = "#F52E81";
  } else {
    btn3.innerHTML = "تحديد";
    btn3.style.backgroundColor = "#b4b4b4";
    btn3.style.color = "#707070";
    toBook3.style.display = "none";
    cardText3.style.borderColor = "transparent";
  }
  isClicked3 = !isClicked3;
});

card4.addEventListener("click", function () {
  if (!isClicked4) {
    btn4.innerHTML = "تم التحديد";
    btn4.style.backgroundColor = "#CB1B64";
    btn4.style.color = "white";
    toBook4.style.display = "block";
    cardText4.style.borderColor = "#F52E81";
  } else {
    btn4.innerHTML = "تحديد";
    btn4.style.backgroundColor = "#b4b4b4";
    btn4.style.color = "#707070";
    toBook4.style.display = "none";
    cardText4.style.borderColor = "transparent";
  }
  isClicked4 = !isClicked4;
});

card5.addEventListener("click", function () {
  if (!isClicked5) {
    btn5.innerHTML = "تم التحديد";
    btn5.style.backgroundColor = "#CB1B64";
    btn5.style.color = "white";
    toBook5.style.display = "block";
    cardText5.style.borderColor = "#F52E81";
  } else {
    btn5.innerHTML = "تحديد";
    btn5.style.backgroundColor = "#b4b4b4";
    btn5.style.color = "white";
    toBook5.style.display = "none";
    cardText5.style.borderColor = "transparent";
  }
  isClicked5 = !isClicked5;
});

card6.addEventListener("click", function () {
  if (!isClicked6) {
    btn6.innerHTML = "تم التحديد";
    btn6.style.backgroundColor = "#CB1B64";
    btn6.style.color = "white";
    toBook6.style.display = "block";
    cardText6.style.borderColor = "#F52E81";
  } else {
    btn6.innerHTML = "تحديد";
    btn6.style.backgroundColor = "#b4b4b4";
    btn6.style.color = "#707070";
    toBook6.style.display = "none";
    cardText6.style.borderColor = "transparent";
  }
  isClicked6 = !isClicked6;
});
