module.exports = {
    listenPort: 3000,
    secret: 'cubechu',
    maxAge: 600000,
    //mongodb配置
    db: 'mongodb://127.0.0.1:27017/myapp',
    github: {
        clientID: "e8e1980d9e7540a1a51e",
        clientSecret: "f8a53f7c930d9cd345561bca08104a1149c29fb8",
        callbackURL: "http://localhost:3000/auth/github/callback"
    }
};
