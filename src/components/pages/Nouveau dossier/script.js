var nbMaxQuestion = 10;

var currentQuestionValue = 0;
var questionAsk = 0;
var questionType = "r";

var point = 0 ;
var pointTransport = 0 ;
var pointConsomation = 0 ;
var pointTrash = 0 ;

var pointMax = 0 ;
var pointTransportMax = 0 ;
var pointConsomationMax = 0 ;
var pointTrashMax = 0 ; 

// Tous pour les swipe 
function swipe(side) {
  if (nbMaxQuestion>questionAsk){
    addPoint(side);
    var myAudio = document.createElement("audio");
    questionLoad();
    if (side=="left"){myAudio.src = "sound/soundLeft.mp3";  }
    else {myAudio.src = "sound/soundRight.mp3";  }
    slide(side);
    myAudio.play();
  }
}

function addPoint(side){
  pointMax += currentQuestionValue ;
    switch (questionType){
      case 'transport': pointTransportMax += currentQuestionValue; break;
      case 'trash': pointTrashMax += currentQuestionValue; break;
      case 'consommation': pointConsomationMax += currentQuestionValue; break;
    }
  if (side=="left"){
    point += -currentQuestionValue ;
    switch (questionType){
      case 'transport': pointTransport += -currentQuestionValue; break;
      case 'trash': pointTrash += -currentQuestionValue; break;
      case 'consommation': pointConsomation += -currentQuestionValue; break;
    }
  }
  else {
    point += currentQuestionValue ;
    switch (questionType){
      case 'transport': pointTransport += currentQuestionValue; break;
      case 'trash': pointTrash += currentQuestionValue; break;
      case 'consommation': pointConsomation += currentQuestionValue; break;
    }
  }
}

addEventListener("keydown", (event) => {
  if (event.key === 'd' || event.key === 'ArrowRight') {
    swipe("right");
  } else if (event.key === 'q' || event.key === 'ArrowLeft') {
    swipe("left");
  }
});

function slide(direction) {
  const card = document.getElementById("card-question");
  let currentPosition = 0;
  const targetPosition = 900;
  const step = 50;

  function animate() {
    currentPosition += (direction === "left" ? -step : step);
    card.style.transform = `translateX(${currentPosition}px) rotate(${currentPosition}deg)`;
  
    if ((direction === "left" && currentPosition > -targetPosition) ||
        (direction === "right" && currentPosition < targetPosition)) {
      requestAnimationFrame(animate);
    } else {
      card.style.transform = "translateX(0px)";
    }
  }
  animate();
}

// Tous pour les cartes 
function questionLoad(){
  fetch('question.json')
      .then(response => response.json())
      .then(data => {
        nbMaxQuestion = data.questions_ecologie.length;
        console.log("lenght : "+nbMaxQuestion)
        var question = data.questions_ecologie[questionAsk];
        console.log("question : "+questionAsk)
        console.log("points : "+point)
        
        document.querySelector('#randomQuestion').textContent = question.question;
        document.querySelector('#p-total').textContent = "Scores : " + point+ "/"+pointMax;
        document.querySelector('#p-transport').textContent = "Mobilité durable :  " + pointTransport + "/"+pointTransportMax;
        document.querySelector('#p-trash').textContent = "Gestion écologique : " + pointTrash+ "/"+pointTrashMax;
        document.querySelector('#p-consommation').textContent = "Consommation responsable : " + pointConsomation+ "/"+pointConsomationMax;
        
        currentQuestionValue = question.value;
        questionType = question.type;
        questionAsk ++;

        if (questionAsk>=nbMaxQuestion){
          document.getElementById("card-question").style.display = "none";
          document.getElementById("card-end").style.display = "block";
        }
        logoRandom();
      })
      .catch(error => console.error('Erreur de chargement du JSON', error));
}

function restart(){
  location.reload()
}

function logoRandom(){
  const randomIndex = Math.floor(Math.random() * 10);
  var logoElement = document.getElementById("logo");
  if (randomIndex==1){
    logoElement.src = "img/Tindearth-w.png";
  }
  else{
    logoElement.src = "img/Tindearth.png";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  questionLoad();
});