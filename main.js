let squaresColl = document.getElementsByClassName("wordle-square");
for (i = 0; i < squaresColl.length; i++) {
  squaresColl[i].addEventListener("click", cycleWordleChoiceOptions);
}

let inputsColl = document.getElementsByTagName("input");

let fieldsColl = document.getElementsByClassName("field");
for (i = 0; i < fieldsColl.length; i++) {
  fieldsColl[i].addEventListener("click", cycleKeyboardChoiceOptions);
}

let resultsDiv = document.getElementById("results");

let resultsUL = document.getElementById("resultsUL");

let mainResetDiv = document.querySelector("#reset");

mainResetDiv.addEventListener("click", resetPage);

let resultsResetDiv = document.querySelector("#resultsReset");

resultsResetDiv.addEventListener("click", resetPageFromResultsSection);

let inputs = Array.from(inputsColl);

let squares = Array.from(squaresColl);

let fields = Array.from(fieldsColl);

let wordleArray = ["**", "**", "**", "**", "**"];

let excludeArray = new Array(0);

let fiveLetterWordsArray = new Array(0);

let submitButton = document.getElementById("submit");

let = modalFired = false;

const isVisible = "is-visible";

//word-o-matic.herokuapp.com/

// /fiveLetterWords.json

fetch("fiveLetterWords.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach(function (word) {
      // console.log(word.WORD);
      fiveLetterWordsArray.push(word.WORD);
    });
    console.log(`Working with ${fiveLetterWordsArray.length} words`);
  });

inputs.forEach(function (element) {
  element.value = "";
});

submitButton.addEventListener("click", buildArrayAndProcess);

function cycleWordleChoiceOptions(e) {
  console.log(
    e.target.closest("div").classList
    // e.target.closest("div").innerText
  );

  if (e.target.closest("div").classList.contains("wordle-yellow")) {
    e.target.closest("div").classList = "wordle-square wordle-white";
    console.log(
      e.target.closest("div").classList,
      e.target.closest("div").firstChild.value
    );
    return;
  }
  if (e.target.closest("div").classList.contains("wordle-green")) {
    e.target.closest("div").classList = "wordle-square wordle-yellow";
    console.log(
      e.target.closest("div").classList,
      e.target.closest("div").firstChild.value
    );
    return;
  }
  if (e.target.closest("div").classList.contains("wordle-white")) {
    e.target.closest("div").classList = "wordle-square wordle-green";
    console.log(
      e.target.closest("div").classList,
      e.target.closest("div").firstChild.value
    );
    return;
  }
}

function cycleKeyboardChoiceOptions(e) {
  console.log(
    e.target.closest("div").classList,
    e.target.closest("div").innerText
  );

  if (e.target.closest("div").classList.contains("field-grey")) {
    e.target.closest("div").classList = "field field-white";
    console.log(e.target.closest("div").classList);
    return;
  }

  if (e.target.closest("div").classList.contains("field-white")) {
    e.target.closest("div").classList = "field field-grey";
    console.log(e.target.closest("div").classList);
  }
}

function buildArrayAndProcess() {
  squares.forEach(function (sq) {
    // console.log(sq)
    let index = 0;

    let color = "*";

    let letter = "*";

    let arrayValue = "";

    index = sq.id.replace("SQ", "") * 1 - 1;

    if (sq.firstChild.value.length > 0) {
      letter = sq.firstChild.value.toUpperCase();
    }

    if (sq.classList.value.includes("green")) {
      color = "G";
    }

    if (sq.classList.value.includes("yellow")) {
      color = "Y";
    }
    arrayValue = letter.concat(color);

    wordleArray[index] = arrayValue;
  });

  let allFields;

  allFields = document.getElementsByClassName("field");

  let allFieldsArray = new Array(0);

  allFieldsArray = Array.from(allFields);

  console.log(allFieldsArray);

  excludeArray = [];

  console.log(excludeArray);

  allFieldsArray.forEach(function (element) {
    console.log(element.classList, element.innerText);
    if (element.classList.value.includes("grey")) {
      console.log(element.innerText);
      excludeArray.push(element.innerText);
    }
  });

  console.log(`Wordle Array: ${wordleArray}`);
  console.log(`Exclude Array: ${excludeArray}`);

  let regexArray = ["\\w{1}", "\\w{1}", "\\w{1}", "\\w{1}", "\\w{1}"];

  let yellowMatchArray = new Array(0);

  let yellows = new Array(0);

  let greens = new Array(0);

  let pass = true;

  wordleArray.forEach(function (element, index) {
    if (element[1] === "G" && element[0] !== "*") {
      regexArray[index] = element[0];
      greens.push(element[0]);
    }
    if (element[1] === "Y" && element[0] !== "*") {
      yellows.push(element[0]);
    }
  });

  if (yellows.length === 0 && greens.length === 0) {
    alert("Please select at least one green or yellow letter");
    return;
  }

  const intersection1 = excludeArray.filter((element) =>
    yellows.includes(element)
  );

  const intersection2 = excludeArray.filter((element) =>
    greens.includes(element)
  );

  if (intersection1.length > 0 || intersection2.length > 0) {
    // alert(
    //   "Your selection includes at least one 'Grey' which is also a 'Green' or a 'Yellow'\nHit RESET and start again!"
    // );

    document.getElementById("modal1").classList.add(isVisible);
    modalFired = true;
  }

  let regexstr = [...regexArray].join("");

  console.log(regexstr);
  console.log(yellows);

  let regex1 = new RegExp(regexstr);

  let greenMatchArray = new Array(0);

  fiveLetterWordsArray.forEach(function (word) {
    // console.log(word.toUpperCase());
    let result1 = regex1.exec(word.toUpperCase());

    if (result1) {
      // console.log(`RESULT1: ${result1.input}`);

      greenMatchArray.push(word.toUpperCase());
    }
  });

  console.log(greenMatchArray);

  if (yellows.length > 0) {
    greenMatchArray.forEach(function (word) {
      let pass = true;

      if (yellows.length > 0) {
        for (let i = 0; i < yellows.length; i++) {
          // console.log(yellows[i])

          let regex2 = new RegExp(yellows[i]);

          let result2 = regex2.exec(word);

          // console.log(result2);

          if (result2 === null) {
            pass = false;
          }

          if (i === yellows.length - 1 && pass) {
            yellowMatchArray.push(result2.input);
          }
        }
      }
    });
  } else {
    yellowMatchArray = [...greenMatchArray];
  }

  // console.log(yellowMatchArray);

  let finalArray = new Array(0);

  if (excludeArray.length > 0) {
    yellowMatchArray.forEach(function (word) {
      let matchExcludedWord = false;

      // console.log(word);

      if (excludeArray.length > 0) {
        

        for (let i = 0; i < excludeArray.length; i++) {

          console.log(`This is the array member: ${ excludeArray[i]}`);

          let regex3 = new RegExp(`${(excludeArray[i]).replace("\n","")}`);

          console.log(`Using this REGEX: ${regex3}`)

          let result3 = regex3.exec(word);

          console.log(`now checking ${word}`)

          console.log(result3.input);

          if (result3) {

            console.log(result3);
            console.log(result3.input, excludeArray[i]);
            matchExcludedWord = true;
          }

          if (i === excludeArray.length - 1 && matchExcludedWord === false) {
            console.log(`Block: ${matchExcludedWord}, ${word}`);
            finalArray.push(word);
          }
        }
      }
    });
  } else {
    finalArray = [...yellowMatchArray];
  }

  console.log(finalArray);

  if (finalArray.length > 0) {
    finalArray.forEach(function (word) {
      resultsUL.innerHTML += `<li>${word}</li>`;
    });

    window.location.hash = "#results";

    resultsResetDiv.classList.remove("hidden");
  } else {
    if (modalFired === false) {
      // alert("No Results Found");
      document.getElementById("modal2").classList.add(isVisible);
    }
  }
}

function resetPage() {
  squares.forEach(function (el) {
    el.classList = "wordle-square wordle-white";
  });

  inputs.forEach(function (el) {
    el.value = "";
  });

  fields.forEach(function (el) {
    el.classList = "field field-white";
  });

  let excludeArray = new Array(0);

  let wordleArray = ["**", "**", "**", "**", "**"];

  let regexArray = ["\\w{1}", "\\w{1}", "\\w{1}", "\\w{1}", "\\w{1}"];

  let yellowMatchArray = new Array(0);

  let yellows = new Array(0);

  let greens = new Array(0);

  let greenMatchArray = new Array(0);

  let finalArray = new Array(0);

  let = modalFired = false;

  resultsUL.innerHTML = "";

  // resultsDiv.innerText = "";

  // resultsDiv.innerHTML = "<ul id='resultsUL'></ul>";

  resultsResetDiv.classList.add("hidden");
}

function resetPageFromResultsSection() {
  squares.forEach(function (el) {
    el.classList = "wordle-square wordle-white";
  });

  inputs.forEach(function (el) {
    el.value = "";
  });

  fields.forEach(function (el) {
    el.classList = "field field-white";
  });

  let excludeArray = new Array(0);

  let wordleArray = ["**", "**", "**", "**", "**"];

  let regexArray = ["\\w{1}", "\\w{1}", "\\w{1}", "\\w{1}", "\\w{1}"];

  let yellowMatchArray = new Array(0);

  let yellows = new Array(0);

  let greens = new Array(0);

  let greenMatchArray = new Array(0);

  let finalArray = new Array(0);

  let = modalFired = false;

  window.location.hash = "#frame";

  resultsUL.innerHTML = "";

  // resultsDiv.innerText = "";

  // resultsDiv.innerHTML = "<ul id='resultsUL'></ul>";

  resultsResetDiv.classList.add("hidden");
}

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove("is-visible");
  }
});

document.addEventListener("keyup", (e) => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove("is-visible");
  }
});
