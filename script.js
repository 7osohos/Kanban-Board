let taskBoolean = false;
let boardBoolean = false;
let dragged_item = null;
let child_pos = null;

// let taskArray = [];
// if (localStorage.getItem("boardData")) {
//   taskArray = JSON.parse(localStorage.getItem("boardData"));
// }
// loadDataFromLocalStorage();

dragAndDrop();

document.addEventListener("click", function (e) {
  if (
    !e.target.classList.contains("color_style") &&
    !e.target.classList.contains("tools_menu") &&
    !e.target.classList.contains("tool")
  ) {
    document.querySelector(".tools_menu").classList.remove("open");
  }
  if (e.target.classList.contains("tools_menu")) {
    document.querySelector(".tools_menu").classList.add("open");
  }
  if (e.target.classList.contains("input_fields")) {
    input_fields.style.display = "none";
    boardBoolean = false;
    taskBoolean = false;
  }

  e.preventDefault();
});
dragAndDrop();

function dragAndDrop() {
  document.querySelectorAll(".task").forEach((task) => {
    task.addEventListener("dragstart", (e) => {
      task.classList.add("dragged");
      dragged_item = task;
      // e.target.style.transform = "rotateZ(2deg)";
    });
    task.addEventListener("dragend", function () {
      task.classList.remove("dragged");
    });

    task.addEventListener("dragover", (e) => {
      for (let i = 0; i < task.parentNode.children.length; i++) {
        if (task.parentNode.children[i].innerHTML === task.innerHTML) {
          child_pos = i;
        }
      }
    });
  });

  document.querySelectorAll(".board").forEach((board) => {
    board.addEventListener("dragover", (e) => {
      e.preventDefault();
      board.classList.add("dragOver");
      board.insertBefore(dragged_item, board.children[child_pos]);
      // console.log(child_pos);
      // if (child_pos > 2) {
      // board.insertBefore(dragged_item, board.children[child_pos + 1]);
      // } else {
      // }
    });

    board.addEventListener("dragleave", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("board")) {
        board.classList.remove("dragOver");
      }
      // board.classList.remove("dragOver");
    });

    board.addEventListener("drop", () => {
      dragged_item = null;
      child_pos = null;
      board.classList.remove("dragOver");
      saveTasksToLocalStorage();
    });
  });
}

let new_task = document.querySelector("#new_task");
let new_board = document.querySelector("#new_board");
let change_style = document.querySelector("#change_style");
let darkMode = document.querySelector("#darkMode");

let input_fields = document.querySelector(".input_fields");
let new_input = document.querySelector(".input_fields input");
let mainBoard = document.getElementById("board_1");

document.addEventListener("click", function (e) {
  if (e.target.id == "new_task") {
    buttons_click("New Task");
    taskBoolean = true;
  }
  if (e.target.id == "submit" && new_input.value != "" && taskBoolean) {
    let newTask = document.createElement("div");
    newTask.setAttribute("draggable", true);
    newTask.classList.add("task");
    newTask.innerHTML = new_input.value;
    mainBoard.appendChild(newTask);
    new_input.value = "";
    new_input.focus();
    dragAndDrop();
  }

  if (e.target.id == "new_board") {
    buttons_click("New Board");
    boardBoolean = true;
  }
  if (e.target.id == "submit" && new_input.value != "" && boardBoolean) {
    let newBoard = document.createElement("div");
    newBoard.classList.add("board");
    newBoard.innerHTML = `
    <h3 class="board_title">${new_input.value}</h3>
    <span id="emptySpan">empty</span>
    
    `;
    document.querySelector(".main_body").appendChild(newBoard);
    new_input.value = "";
    new_input.focus();

    dragAndDrop();
  }
});

function buttons_click(placeholder) {
  input_fields.style.display = "flex";
  new_input.placeholder = placeholder;
  new_input.value = "";
  new_input.focus();
  //   document.querySelector(".tools_menu").classList.toggle("open");
}

//? Styling

//Dark Mode
document.querySelector("#darkMode").addEventListener("click", () => {
  if (document.querySelector("body").id == "dark") {
    document.querySelector("body").id = "";
  } else {
    document.querySelector("body").id = "dark";
  }
});

// Change accent
document.querySelectorAll("span.color_style").forEach((color) => {
  color.addEventListener("click", function (e) {
    document.querySelector("body").className = e.target.id;
  });
});

// function saveTasksToLocalStorage() {

//   taskArray = document.querySelectorAll(".board");
//   for (let i = 0; i < document.querySelectorAll(".board").length; i++) {
//     let board = document.querySelectorAll(".board")[i];
// taskArray = [];
// taskArray.push(board);
// console.log(document.querySelectorAll(".board")[i]);
//     localStorage.setItem("boardData", JSON.stringify(taskArray));
//     console.log(taskArray);
//   }
// }

// function loadDataFromLocalStorage() {
//   console.log(localStorage.getItem("boardData"));
// }
