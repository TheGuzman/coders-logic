const getUserWord = (requiredLetter) => {
  const userWord = prompt(
    `Please enter a word with at least 3 letters and the letter ${requiredLetter}`
  );

  if (!userWord) {
    alert("You must enter a word");
    return getUserWord(requiredLetter);
  }

  if (!userWord.includes(requiredLetter)) {
    alert(`Your word must include the letter ${requiredLetter}`);
    return getUserWord(requiredLetter);
  }

  if (userWord.length < 3) {
    alert("Your word must have at least three letters");
    return getUserWord(requiredLetter);
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
  correctWords.reduce(
    (accumulatedPoints, correctWord) =>
      accumulatedPoints + getWordPoints(correctWord),
    0
  );

const checkIfPlaying = (correctWords, words) => {
  return (
    correctWords.length !== words.length &&
    confirm("Do you want to play again?")
  );
};

const playCodersLogic = () => {
  const gameLetters = ["c", "o", "d", "e", "r", "s"];
  const words = ["doc"];
  const requiredLetter = gameLetters[2];
  const correctWords = [];

  alert(
    `Hi! Welcome to Coders Logic. To play enter a word that it's at least 3 characters and contains ${gameLetters.join(
      ", "
    )}. The required letter is ${requiredLetter}. Let's start🔥!`
  );

  do {
    const userWord = getUserWord(requiredLetter);
    const isValid = checkUserWordIsValid(userWord, words, correctWords);

    if (isValid) {
      correctWords.push(userWord);
    }
  } while (checkIfPlaying(correctWords, words));

  alert(`Congratulations! You have won ${getTotalPoints(correctWords)} points`);

  alert("Goodbye! 🖐");
};

playCodersLogic();
