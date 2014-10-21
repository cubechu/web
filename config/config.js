module.exports = {
    listenPort: 3006,
    secret: 'cubechu',
    maxAge: 600000,
    db: 'mongodb://192.168.22.155:27017/myapp',
    github: {
        clientID: "6245ae3122580e682e90",
        clientSecret: "186a34055da5184f9c6144063679b033642c0ab3",
        callbackURL: "http://192.168.22.90:3006/auth/github/callback"
    }
};
