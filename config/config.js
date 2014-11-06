module.exports = {
    listenPort: 3006,
    secret: 'cubechu',
    maxAge: 600000,
    restHost: '192.168.22.92',
    msgListPort: 8092,
    loginPort: 8040,
    db: 'mongodb://192.168.22.155:27017/myapp',
    github: {
        clientID: "0c2bf039a80e36880b8a",
        clientSecret: "f39e9b511d70093d329ceaccf435d7a8d411c5ed",
        callbackURL: "http://192.168.22.90:3006/auth/github/callback"
    }
};
