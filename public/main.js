const socket = io();

const chatForm = document.getElementById("form")

socket.on("onConnection", message => {
  console.log(message);
})

socket.emit("disconnected", "session ended")

//On Message Submit
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  //Get Message Text
  const msg = e.target.elements.msg.value;

  //Send Message to server
  socket.emit("chatMessage", msg);
})