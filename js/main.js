let apiKey = "659eaea02681618c591bc9d6";
let todoInput = document.querySelector("#todoInput");
let todoSection = document.querySelector("#todoSection");
let todo;

todoInput.addEventListener("keypress", function (e) {
  if (e.code == "Enter") {
    addTodo();
  }
});

async function addTodo() {
  let body = {
    title: todoInput.value,
    apiKey: apiKey,
  };
  let addReq = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let addRes = await addReq.json();
  console.log(addRes);
  getAllTodo();
  todoInput.value = "";
}

async function getAllTodo() {
  let getReq = await fetch(
    `https://todos.routemisr.com/api/v1/todos/${apiKey}`
  );
  let getRes = await getReq.json();
  console.log(getRes);
  displayAllTodo(getRes.todos);
  todo = document.querySelectorAll("#todo");
}
getAllTodo();

function displayAllTodo(array) {
  let content = "";
  for (let i = 0; i < array.length; i++) {
    content += `
    <div class="fs-3 d-flex justify-content-between">
    ${
      array[i].completed == false
        ? `<p id="todo">${array[i].title}</p>`
        : `<del class="text-success"><p id="todo" >${array[i].title}</p></del>`
    }
    <div>
    <i onclick="completedTodo('${
      array[i]._id
    }',${i})" class=" fa-check-circle fa-solid text-success"style="cursor: pointer;"></i>
    <i onclick="deleteTodo('${
      array[i]._id
    }')" class=" fa-circle-xmark fa-solid text-danger" style="cursor: pointer;"></i>
    </div>
    </div>`;
  }

  todoSection.innerHTML = content;
}

async function deleteTodo(id) {
  let body = {
    todoId: id,
  };
  let deleteReq = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let deleteRes = await deleteReq.json();
  console.log(deleteRes);
  getAllTodo();
}

async function completedTodo(id, index) {
  let body = {
    todoId: id,
  };
  let completeReq = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let completeRes = await completeReq.json();
  console.log(completeRes);
  todo[index].style.textDecoration = "line-through";
  todo[index].classList.add("text-success");
}
