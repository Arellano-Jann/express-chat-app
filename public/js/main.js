// frontend javascript

// brings in html elements to be used in the javascript
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();

const { username, room } = Qs.parse(location.search, { // grabs the username and room from the URL with the Qs library (qs cdn on google)
    ignoreQueryPrefix: true // removes the ? from the query string
})

socket.emit('joinRoom', {username, room}); // emits the username and room to the server.js file

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})

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

function outputMessage(message) { // add message to DOM (the users screen)
    const div = document.createElement('div'); // creates a div
    div.classList.add('message'); // adds a class of message to the div
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>` // adds the message to the div with the metadata (name + time)
    document.querySelector('.chat-messages').appendChild(div); // appends the div that we created above to the chat log with the class of chat-messages
}

function outputRoomName(room){ // add room name to DOM
    roomName.innerText = room; // sets the inner text of the roomName HTML element to the room variable which is the current users room
}

function outputUsers(users){
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
        `; // maps each user in the users array to a list item and then joins them together
        // we use the .join() method because the map method returns an array and we need to convert it to a string
}