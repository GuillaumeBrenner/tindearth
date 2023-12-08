import React, { useState, useEffect } from "react";
import "./Quiz.css";

export const Quiz = () => {
  const [nbMaxQuestion, setNbMaxQuestion] = useState(10);
  const [currentQuestionValue, setCurrentQuestionValue] = useState(0);
  const [questionAsk, setQuestionAsk] = useState(0);
  const [questionType, setQuestionType] = useState("r");
  const [point, setPoint] = useState(0);
  const [pointTransport, setPointTransport] = useState(0);
  const [pointConsomation, setPointConsomation] = useState(0);
  const [pointTrash, setPointTrash] = useState(0);
  const [pointMax, setPointMax] = useState(0);
  const [pointTransportMax, setPointTransportMax] = useState(0);
  const [pointConsomationMax, setPointConsomationMax] = useState(0);
  const [pointTrashMax, setPointTrashMax] = useState(0);

  // useEffect pour charger la première question au chargement initial
  useEffect(() => {
    questionLoad();
  }, []);

  // Fonction pour gérer le swipe
  const swipe = (side) => {
    if (nbMaxQuestion > questionAsk) {
      addPoint(side);
      const audio = new Audio(
        side === "left" ? "sound/soundLeft.mp3" : "sound/soundRight.mp3"
      );
      questionLoad();
      audio.play();
      slide(side);
    }
  };

  // Fonction pour ajouter des points
  const addPoint = (side) => {
    setPointMax((prev) => prev + currentQuestionValue);

    switch (questionType) {
      case "transport":
        setPointTransportMax((prev) => prev + currentQuestionValue);
        break;
      case "trash":
        setPointTrashMax((prev) => prev + currentQuestionValue);
        break;
      case "consommation":
        setPointConsomationMax((prev) => prev + currentQuestionValue);
        break;
      default:
        break;
    }

    if (side === "left") {
      setPoint((prev) => prev - currentQuestionValue);

      switch (questionType) {
        case "transport":
          setPointTransport((prev) => prev - currentQuestionValue);
          break;
        case "trash":
          setPointTrash((prev) => prev - currentQuestionValue);
          break;
        case "consommation":
          setPointConsomation((prev) => prev - currentQuestionValue);
          break;
        default:
          break;
      }
    } else {
      setPoint((prev) => prev + currentQuestionValue);

      switch (questionType) {
        case "transport":
          setPointTransport((prev) => prev + currentQuestionValue);
          break;
        case "trash":
          setPointTrash((prev) => prev + currentQuestionValue);
          break;
        case "consommation":
          setPointConsomation((prev) => prev + currentQuestionValue);
          break;
        default:
          break;
      }
    }
  };

  // Gestionnaire d'événements pour les touches du clavier
  const handleKeyDown = (event) => {
    if (event.key === "d" || event.key === "ArrowRight") {
      swipe("right");
    } else if (event.key === "q" || event.key === "ArrowLeft") {
      swipe("left");
    }
  };

  // Fonction pour effectuer l'animation de glissement
  const slide = (direction) => {
    const card = document.getElementById("card-question");
    let currentPosition = 0;
    const targetPosition = 900;
    const step = 50;

    const animate = () => {
      currentPosition += direction === "left" ? -step : step;
      card.style.transform = `translateX(${currentPosition}px) rotate(${currentPosition}deg)`;

      if (
        (direction === "left" && currentPosition > -targetPosition) ||
        (direction === "right" && currentPosition < targetPosition)
      ) {
        requestAnimationFrame(animate);
      } else {
        card.style.transform = "translateX(0px)";
      }
    };

    animate();
  };

  // Fonction pour charger une nouvelle question
  const questionLoad = () => {
    // Utilisez fetch dans React
    fetch("question.json")
      .then((response) => response.json())
      .then((data) => {
        setNbMaxQuestion(data.questions_ecologie.length);

        const question = data.questions_ecologie[questionAsk];

        setCurrentQuestionValue(question.value);
        setQuestionType(question.type);
        setQuestionAsk((prev) => prev + 1);

        if (questionAsk >= nbMaxQuestion) {
          // Cachez la carte de question et affichez la carte de fin
          document.getElementById("card-question").style.display = "none";
          document.getElementById("card-end").style.display = "block";
        }

        logoRandom();
      })
      .catch((error) => console.error("Erreur de chargement du JSON", error));
  };

  // Fonction pour redémarrer le jeu
  const restart = () => {
    // Rechargez la page
    window.location.reload();
  };

  // Fonction pour afficher un logo aléatoire
  const logoRandom = () => {
    const randomIndex = Math.floor(Math.random() * 10);
    const logoElement = document.getElementById("logo");

    if (randomIndex === 1) {
      logoElement.src = "images/Tindearth-w.png";
    } else {
      logoElement.src = "images/Tindearth.png";
    }
  };

  // Rendu du composant
  return (
    <div
      className="Quiz"
      style={{
        backgroundImage: 'url("/images/background.png")',
        height: "100vh",
      }}
    >
      <div className="Quizbackground">
        <div className="card-container" id="card-question">
          <div className="card" id="card">
            <img src="images/tindearth.png" alt="Profile Image" id="logo" />
            <p id="randomQuestion">Question</p>
            <div className="buttons">
              <button onClick={() => swipe("left")}>
                <img src="images/cross.svg" alt="cross" />
              </button>
              <button onClick={() => swipe("right")}>
                <img src="images/check.svg" alt="check" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-container" id="card-end" style={{ display: "none" }}>
        <div className="card" id="card">
          <p id="p-total">points</p>
          <p id="p-transport" style={{ fontSize: "11px" }}>
            points
          </p>
          <p id="p-trash" style={{ fontSize: "11px" }}>
            points
          </p>
          <p id="p-consommation" style={{ fontSize: "11px" }}>
            points
          </p>

          <div className="buttons">
            <button onClick={restart}>Recommencer</button>
          </div>
        </div>
      </div>
    </div>
  );
};
