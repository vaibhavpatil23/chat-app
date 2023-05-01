const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const massageInput = document.getElementById("massegeInp");
const massageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");

const append = (massage, position) => {
  const massageElement = document.createElement("div");
  massageElement.innerText = massage;
  massageElement.classList.add("massege");
  massageElement.classList.add(position);
  massageContainer.append(massageElement);
  if(position == 'left'){
      audio.play();
  }
};

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});
socket.on("receive", (data) => {
  append(`${data.name}:${data.massage}`, "left");
});
socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const massege = massageInput.value;
  append(`you: ${massege}`, "right");
  socket.emit("send", massege);
  massageInput.value = "";
});