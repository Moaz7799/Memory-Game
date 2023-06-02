/**
  Features To Be Added
  
  [1] when the player write his name a background sound should start for the whole game till win or lose
  [2] add timer, when time is finished and he didn't find all the matched blocks the game is over and every thing returns to its original place
  [3] add a leaderboard so that if more than one person is playing, the score for each player is saved in local storage and shown down
  [4] make and object with lots of pics that if person wants 50 block javascript wil automatically generate the 50 blocks with their own pictures

 */

// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("What's Your Name ?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = yourName;
  }

  //Remove Splash Screen
  document.querySelector(".control-buttons").remove();
};

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()]; // array of numbers from 0 to 19

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If There Are Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    CheckMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No-Clicking To The Main Container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    // Remove Class No Clicking After the Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Shuffle Function

function shuffle(array) {
  //setting Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    //Get Random Number
    random = Math.floor(Math.random() * current);

    //Decrease Length By One
    current--;

    // [1] Save Current Element In Stash
    temp = array[current];

    // [2] Current Element = Random element
    array[current] = array[random];

    // [3] Random element = The Element Stored in The Stash
    array[random] = temp;
  }

  return array;
}

// Check Matched Block
function CheckMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    // triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    triesElement.innerHTML++;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}
