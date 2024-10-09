//get
document.getElementById("btn1").addEventListener("click", () => {

  fetch("http://localhost:5001/tasks")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
//post
document.getElementById("btn2").addEventListener("click", () => {

  fetch("http://localhost:5001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: "포스팅하기",
      isComplete: false,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});
//put
document.getElementById("btn3").addEventListener("click", () => {

  fetch("http://localhost:5001/tasks/6705443ea54133fc818aa87d", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: "포스팅하기",
      isComplete: true,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});
//delete
document.getElementById("btn4").addEventListener("click", () => {

  fetch("http://localhost:5001/tasks/67053f8b37a449a9bf4f6453", {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});