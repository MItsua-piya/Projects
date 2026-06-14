// let arr = [];

// let ans = prompt("enter what you wanna do");

// while (true) {

//     if (ans == "quit") {
//         console.log("Quitting app");
//         break;
//     }

//     else if (ans == "list") {

//         console.log("--------");

//         for (let i = 0; i < arr.length; i++) {
//             console.log(i, arr[i]);
//         }

//         console.log("--------");
//     }

//     else if (ans == "add") {

//         let task = prompt("Enter task you want to add");

//         arr.push(task);

//         console.log("Task added");
//     }

//     else if (ans == "delete") {

//         let del = prompt("Enter task you want to delete");

//         let index = arr.indexOf(del);

//         if (index !== -1) {
//             arr.splice(index, 1);
//             console.log("Task deleted");
//         } else {
//             console.log("Task not found");
//         }
//     }

//     ans = prompt("enter what you wanna do");
// }
let ans = prompt("Enter command");
let arr = [];
while (true) {
  console.log("You entered:", ans);

  if (ans === "quit") {
    console.log("Breaking...");
    break;
  } else if (ans == "list") {
    console.log("--------");

    for (let i = 0; i < arr.length; i++) {
      console.log(i, arr[i]);
    }

    console.log("--------");
  } else if (ans == "add") {
    let task = prompt("Enter task you want to add");

    arr.push(task);

    console.log("Task added");
  } else if (ans == "delete") {
    let del = prompt("Enter task you want to delete");

    let index = arr.indexOf(del);

    if (index !== -1) {
      arr.splice(index, 1);
      console.log("Task deleted");
    } else {
      console.log("Task not found");
    }
  }

  ans = prompt("Enter command");
}
