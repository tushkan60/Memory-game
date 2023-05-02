import { AmazingCard } from "./classes.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  const appTitle = document.createElement("h1");
  const gameField = document.createElement("div");
  const startForm = document.createElement("form");
  const startInput = document.createElement("input");
  const startButton = document.createElement("button");
  const buttonWrapper = document.createElement("div");
  let cardQuantity = 4;

  function createGameTitle(title) {
    appTitle.innerHTML = title;
    appTitle.classList.add("game__title");
    return appTitle;
  }

  function createStartForm() {
    startForm.classList.add("game__form", "input-group", "mb-3");
    startInput.classList.add("game__input", "form-control");
    startInput.setAttribute("type", "number");
    startInput.placeholder = "Введите четное число от 4 до 10";
    buttonWrapper.classList.add("input-group-append");
    startButton.classList.add("start__btn", "btn-primary", "btn");
    startButton.textContent = "Начать игру";
    startForm.append(startInput);
    buttonWrapper.append(startButton);
    startForm.append(buttonWrapper);

    return { startForm, startInput, startButton };
  }

  function newGame() {
    alert("Победа");
    gameField.innerHTML = "";
  }

  function startGame() {
    container.classList.add("game__container", "container");
    body.append(container);

    const todoAppTitle = createGameTitle("Игра в пары");
    container.append(todoAppTitle);

    const gameForm = createStartForm();
    container.append(gameForm.startForm);

    gameField.classList.add("game__field", "row", "row-cols-4");
    container.append(gameField);

    gameForm.startForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const cards = [];

      if (document.querySelector(".game__card")) {
        gameField.innerHTML = "";
      }

      if (
        gameForm.startInput.value % 2 === 0 &&
        gameForm.startInput.value <= 10 &&
        gameForm.startInput.value >= 4
      ) {
        cardQuantity = gameForm.startInput.value;
      } else {
        cardQuantity = 4;
        gameForm.startInput.value = 4;
        alert("Введите четное число от 4 до 10");
      }

      function createNumbersArray(count) {
        for (let i = 1; i <= count; i++) {
          cards.push(i, i);
        }
        return cards;
      }

      createNumbersArray(cardQuantity);

      function shuffle(array) {
        for (let i = 0; i < array.length; i++) {
          const j = Math.floor(Math.random() * (i + 1));
          const tmp = array[i];
          array[i] = array[j];
          array[j] = tmp;
        }
        return array;
      }
      const shuffleCards = shuffle(cards);

      const gameCards = [];
      for (const cardNumber of shuffleCards) {
        let card = new AmazingCard(gameField, cardNumber);
        gameCards.push(card);
      }

      let temp;
      let winCount = 0;

      for (const card of gameCards) {
        card.element.addEventListener("click", function () {
          if (card.success || card.open) {
            return;
          }
          if (temp) {
            if (temp.cardNumber === card.cardNumber) {
              card.open = true;
              card.success = true;
              temp.success = true;
              temp = null;
              winCount++;
              if (winCount === cardQuantity) {
                setTimeout(newGame, 300);
              }
            } else {
              card.open = true;
              setTimeout(() => {
                card.open = false;
                temp.success = false;
                temp.open = false;
                temp = null;
              }, 600);
            }
          } else {
            temp = card;
            card.open = true;
            card.success = true;
          }
        });
      }
    });
  }
  startGame();
});
