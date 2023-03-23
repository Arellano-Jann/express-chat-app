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

function userLeave(id) { // user leaves the chat
    const i = users.findIndex(user => user.id === id); // finds the index of the user in the users array
    // const i = users.findIndex((user) => {
    //     user.id === id; // triple equals is used to compare the value and the type? idk
    // });
    if (i !== -1) {
        return users.splice(i, 1)[0]; // returns the removed user
    }
}

function getRoomUsers(room){
    return users.filter((user) => {
        user.room === room; // triple equals is used to compare the value and the type? idk
    });
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};