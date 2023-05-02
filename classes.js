class Card {
  constructor(container, cardNumber) {
    this._cardNumber = cardNumber;
    this.container = container;
    this.isOpen = false;
    this.isSuccess = false;
    this.element = this.createElement();
  }

  createElement() {
    const cardElement = document.createElement("div");
    const buttonElement = document.createElement("button");
    cardElement.classList.add(
      "game__card",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "col",
      "mb-2"
    );
    buttonElement.classList.add("game__btn", "btn");
    buttonElement.innerHTML = `<img class="img" alt="${"js"}" src="img/${"js"}.svg" width=100>`;
    buttonElement.dataset.number = this._cardNumber;
    cardElement.append(buttonElement);
    this.container.append(cardElement);
    return cardElement;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    this.element.querySelector(".game__btn").dataset.number = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this.isOpen = value;
    if (value) {
      this.element.querySelector(".game__btn");
      this.element.innerHTML = this._cardNumber;
    } else {
      this.element.querySelector(".game__btn");
      this.element.innerHTML = "JS";
    }
  }

  get open() {
    return this.isOpen;
  }

  set success(value) {
    this.isSuccess = value;
    if (value) {
      this.element.classList.add("success");
      this.element.querySelector(".img").classList.add("success");
    } else {
      this.element.classList.remove("success");
      this.element.querySelector(".img").classList.remove("success");
    }
  }

  get success() {
    return this.isSuccess;
  }
}

export class AmazingCard extends Card {
  set open(value) {
    this.isOpen = value;
    const imgElement = this.element.querySelector(".img");
    if (value) {
      imgElement.src = `img/${this._cardNumber}.svg`;
      imgElement.alt = this._cardNumber;
    } else {
      imgElement.src = `img/js.svg`;
      imgElement.alt = "js";
    }

    imgElement.onerror = () => {
      const errorMsg = `Failed to load image: img/${this._cardNumber}.svg`;
      console.error(errorMsg);

      imgElement.src = "img/default.svg";
      imgElement.alt = "Image failed to load";
    };
  }
}
