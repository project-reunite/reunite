const adjectiveAnimal = require('adjective-animal');

const getUsername = () => adjectiveAnimal.generateName();

const addUserToDemo = (username, socket) => {
    socket.emit('newUser', username);
};

const removeUserFromDemo = (username, socket) => {
    socket.emit('removeUser', username);
};

module.exports = {
    addUserToDemo,
    removeUserFromDemo,
    getUsername,
};
