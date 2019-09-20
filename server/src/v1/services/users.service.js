const fs = require('fs');

const fileToArray = file => {
    return file
        .split('\n')
        .map(animal =>
            animal
                .toLowerCase()
                .trim()
                .replace(' ', '-')
        )
        .filter(a => a != '');
};

const animals = fileToArray(
    fs.readFileSync(__dirname + '/../../utils/' + 'animals.txt', 'utf8')
);
const adjectives = fileToArray(
    fs.readFileSync(__dirname + '/../../utils/' + 'adjectives.txt', 'utf8')
);

const getUsername = () =>
    adjectives[Math.round(Math.random() * adjectives.length)] +
    '-' +
    animals[Math.round(Math.random() * animals.length)];

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
