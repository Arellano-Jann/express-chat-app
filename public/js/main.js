const chatForm = document.getElementById('chat-form');


const socket = io();

socket.on('message', (message) => { // listens for the message event from the server.js file
    console.log(message);
    outputMessage(message);
});

chatForm.addEventListener('submit', (e) => { // listens for a submit event on the chatForm element 
    e.preventDefault();
    const msg = e.target.elements.msg.value; // .target.elements.msg targets the HTML element, .value gets the value of the element/input
    // console.log(e.target.elements.msg);
    socket.emit('chatMessage', msg); // emits the user's msg to the server with value of chatMessage
});

function outputMessage(message) {
    const div = document.createElement('div'); // creates a div
    div.classList.add('message'); // adds a class of message to the div
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>` // adds the message to the div with the metadata (name + time)
    document.querySelector('.chat-messages').appendChild(div); // appends the div that we created above to the chat log with the class of chat-messages
}