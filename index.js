const getUserWord = (requiredLetter) => {
  const wordInput = document.querySelector(".user__word");
  const userWord = wordInput.value;

  if (!userWord) {
    alert("You must enter a word");
    return;
  }

  if (!userWord.includes(requiredLetter)) {
    alert(`Your word must include the letter ${requiredLetter}`);
    return;
  }

  if (userWord.length < 3) {
    alert("Your word must have at least three letters");
    return;
  }

  return userWord.toLowerCase();
};

const checkUserWordIsValid = (word, wordsList, correctWords) => {
  if (!wordsList.includes(word)) {
    alert("Your word is wrong 😔");
    return false;
  }

  if (correctWords.includes(word)) {
    alert("You already used this word");
    return false;
  }

  alert("Congratulations your word is correct 😛");
  return true;
};

const appendWordToDocument = (word) => {
  const container = document.querySelector(".words__container");
  const li = document.createElement("li");
  li.textContent = word;
  li.classList.add("guessed__word");
  container.appendChild(li);
};

const getWordPoints = (word) => {
  switch (word.length) {
    case 3:
      return 1;
    case 4:
      return 2;
    default:
      return word.length;
  }
};

const getTotalPoints = (correctWords) =>
  correctWords.reduce((accumulatedPoints, correctWord) => accumulatedPoints + getWordPoints(correctWord), 0);

const addEventListeners = (words, requiredLetter, correctWords) => {
  //SEND BUTTON
  const sendButton = document.querySelector(".send__button");
  sendButton.addEventListener("click", () => {
    handleUserGuess(words, requiredLetter, correctWords);
  });

  //CLEAR BUTTON
  const clearButton = document.querySelector(".clear__button");
  clearButton.addEventListener("click", () => {
    handleClearGuess();
  });

  //LETTERS
  const letters = document.querySelectorAll(".letter__button");
  letters.forEach((letter) =>
    letter.addEventListener("click", () => {
      handleWordClick(letter);
    })
  );
};

const handleUserGuess = (words, requiredLetter, correctWords) => {
  const userWord = getUserWord(requiredLetter);
  const isValid = checkUserWordIsValid(userWord, words, correctWords);
  if (isValid) {
    correctWords.push(userWord);
    appendWordToDocument(userWord);
    handleClearGuess();
    updateScore(correctWords);
  }
};

const handleClearGuess = () => {
  const wordInput = document.querySelector(".user__word");
  wordInput.value = "";
};

const handleWordClick = (letter) => {
  const wordInput = document.querySelector(".user__word");
  wordInput.value += letter.value.toLowerCase();
};

const updateScore = (correctWords) => {
  const points = getTotalPoints(correctWords);
  const pointsContainer = document.querySelector(".points__container");
  pointsContainer.textContent = points;
};

const playCodersLogic = () => {
  const gameLetters = ["c", "o", "d", "e", "r", "s"];
  const words = ["doc", "code", "codo"];
  const requiredLetter = gameLetters[2];
  const correctWords = [];

  addEventListeners(words, requiredLetter, correctWords);
};

playCodersLogic();
