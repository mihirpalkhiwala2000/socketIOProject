const socket = io();
let userName = null;
let groupName = null;
const textarea = document.querySelector("#textarea");
const messageArea = document.querySelector(".message__area");
const connectedTo = document.querySelector(".connectedTo");
const user = document.querySelector(".user");
do {
  userName = prompt("Please enter your name");
  groupName = prompt(
    "Please enter name of the person or group you want to message "
  );
} while (!userName || !groupName);

user.innerHTML = `${userName}'s Device`;
connectedTo.innerHTML = `Sending messages to ${groupName} group`;

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
    textarea.innerHTML = null;
  }
});
socket.emit("groupName", groupName);

const sendMessage = (message) => {
  const msg = {
    user: userName,
    message: message.trim(),
    groupName,
  };
  console.log("🚀 ~ file: client.js:23 ~ sendMessage ~ msg:", msg);

  socket.emit("message", msg);
  appendMessage(msg, "outgoing");
};
const appendMessage = (msg, type) => {
  const date = new Date();
  const hour = date.getHours();
  const mins = date.getMinutes();
  const mainDiv = document.createElement("div");
  const className = type;

  mainDiv.classList.add(className, "message");

  let markup = `<h4>${msg.user}  ${hour}:${mins}</h4>
  <p>${msg.message}</p>`;

  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
};

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
});
