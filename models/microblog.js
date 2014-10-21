var mongoose = require('mongoose');
var microblogSchema = new mongoose.Schema({
    userId: {type: String},
    userName: {type: String},
    avatar: {type: String},
    content: {type: String},
    comment: {type: Array},
    sendTime: {type: Date, default: Date.now()}
});

microblogSchema.statics = {
    fetch: function (lastMbSendTime, cb) {
        var obj = {};
        if (lastMbSendTime) {
            obj = {sendTime: {$gt: lastMbSendTime}};
        }
        return this.find(obj).sort({'sendTime': 'desc'}).exec(cb);
    }
};

module.exports = microblogSchema;