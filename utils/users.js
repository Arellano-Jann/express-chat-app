// everything that is concerend with users comes through here

const users = [];

function userJoin(id, username, room) { // adds user to the users array (joining the chat)
    const user = { id, username, room };
    users.push(user);
    return user;
};

function getCurrentUser(id){
    return users.find(user => user.id === id);
};

module.exports = {
    userJoin,
    getCurrentUser
};