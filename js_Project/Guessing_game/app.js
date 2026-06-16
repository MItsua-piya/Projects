let ans = prompt("enter the max number");
let num = Math.floor(Math.random() * ans) + 1;
let guess = prompt("guess the number");

while (true) {
  if (guess == "quit") {
    console.log("quiting game----");
    break;
  }
  if (guess == num) {
    console.log("You guessed it Right!", guess);
    break;
  } else {
    guess = prompt("your guess was Wrong");
  }
}

