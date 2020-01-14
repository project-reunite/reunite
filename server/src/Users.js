class Users {
    constructor() {
        this.users = {};
    }

    getUsers() {
        return this.users;
    }

    createUser(user) {
        this.users = {
            ...this.users,
            [user.username]: {
                username: user.username,
                sockets: [user.socket_id],
                rankedPersons: [],
                currentPersons: [],
                facePrediction: [],
            },
        };
    }

    updateUser(username, newUserObject) {
        this.users[username] = {
            ...this.users[username],
            ...newUserObject,
        };
    }

    addSocketToExistingUser(user) {
        const cur_user = this.users[user.username];
        const updated_user = {
            [user.username]: {
                ...cur_user,
                sockets: [...cur_user.sockets, user.socket_id],
            },
        };
        this.users = { ...this.users, updated_user };
    }

    getUsernameFromSocketId(socket_id) {
        let username = '';
        Object.keys(this.users).map(key => {
            const sockets = this.users[key].sockets;
            if (sockets && sockets.indexOf(socket_id) !== -1) {
                username = key;
            }
        });
        return username;
    }

    deleteUser(username) {
        const clone_users = { ...this.users };
        delete clone_users[username];
        this.users = clone_users;
    }

    deleteSocketFromUser(user, socketId) {
        const index = user.sockets.indexOf(socketId);
        const updated_user = {
            [user.username]: {
                ...user,
                sockets: user.sockets
                    .slice(0, index)
                    .concat(user.sockets.slice(index + 1)),
            },
        };
        this.users = { ...this.users, ...updated_user };
    }

    removeSocket(socketId) {
        const username = this.getUsernameFromSocketId(socketId);
        const user = this.users[username];
        user && user.sockets.length > 1
            ? this.deleteSocketFromUser(user, socketId)
            : this.deleteUser(username);
    }
}

module.exports = Users;
