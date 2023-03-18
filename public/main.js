const socket = io();

const chatForm = document.getElementById("form");
const chatMessages = document.querySelector(".interaction");

//Output message to DOM
const outputMessage = (msg, sender) => {
  const p = document.createElement("p");
  p.classList.add(`${sender}`);
  p.innerHTML = `<span>${msg}</span>`
  document.querySelector(".interaction").appendChild(p);

  //scroll down after message 
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

//Receives Messages from server

socket.on("message", message => {
  message.forEach((singleMsg, index) => {
    outputMessage(singleMsg, "me")
  })
})


socket.emit("disconnected", "session ended")

//On Message Submit
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  //Get Message Text
  const msg = e.target.elements.msg.value;

  //Send Message to server
  socket.emit("chatMessage", msg);
  outputMessage(msg, "you");

  //clear input 
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
})