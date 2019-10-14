class Users {
    constructor() {
        this.users = {};
    }

    getUsers() {
        return this.users;
    }

    getUserList() {
        return Object.keys(this.users).map(key => {
            return this.users[key].username;
        });
    }

    createUser(user) {
        this.users = Object.assign(
            {
                [user.username]: {
                    username: user.username,
                    sockets: [user.socket_id],
                    rankedPersons: [],
                    currentPersons: [],
                    facePrediction: [],
                },
            },
            this.users
        );
    }

    updateUser(username, newUserObject) {
        this.users[username] = {
            ...this.users[username],
            ...newUserObject,
        };
    }

    addSocketToExistingUser(user) {
        let cur_user = this.users[user.username],
            updated_user = {
                [user.username]: Object.assign(cur_user, {
                    sockets: [...cur_user.sockets, user.socket_id],
                }),
            };
        this.users = Object.assign(this.users, updated_user);
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
        let clone_users = Object.assign({}, this.users);
        delete clone_users[username];
        this.users = clone_users;
    }

    deleteSocketFromUser(user, socketId) {
        let index = user.sockets.indexOf(socketId);
        let updated_user = {
            [user.username]: Object.assign(user, {
                sockets: user.sockets
                    .slice(0, index)
                    .concat(user.sockets.slice(index + 1)),
            }),
        };
        this.users = Object.assign(this.users, updated_user);
    }

    removeSocket(socketId) {
        const username = this.getUsernameFromSocketId(socketId);
        let user = this.users[username];
        user && user.sockets.length > 1
            ? this.deleteSocketFromUser(user, socketId)
            : this.deleteUser(username);
    }
}

module.exports = Users;
