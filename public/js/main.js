const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

socket.on('message', (message) => { // listens for the message event from the server.js file
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight; // scrolls the chat log to the bottom // i.e. the top of the chat is the height of the chat log which happens to be the bottom
});

chatForm.addEventListener('submit', (e) => { // listens for a submit event on the chatForm element 
    e.preventDefault();
    
    const msg = e.target.elements.msg.value; // .target.elements.msg targets the HTML element, .value gets the value of the element/input
    // console.log(e.target.elements.msg);
    socket.emit('chatMessage', msg); // emits the user's msg to the server with value of chatMessage

    e.target.elements.msg.value = ''; // clears the input element
    e.target.elements.msg.focus(); // focuses on the input element
});

function outputMessage(message) {
    const div = document.createElement('div'); // creates a div
    div.classList.add('message'); // adds a class of message to the div
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>` // adds the message to the div with the metadata (name + time)
    document.querySelector('.chat-messages').appendChild(div); // appends the div that we created above to the chat log with the class of chat-messages
}