var mongoose = require('mongoose');
var microblogSchema = new mongoose.Schema({
    userid: {type: String},
    username: {type: String},
    avatar: {type: String},
    content: {type: String},
    sendtime: {type: Date, default: Date.now()}
});

microblogSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort({'sendtime': 'desc'}).exec(cb);
    }
};

module.exports = microblogSchema;