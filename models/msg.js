var mongoose = require('mongoose');
var msgSchema = new mongoose.Schema({
    userId: {type: String},
    userName: {type: String},
    avatar: {type: String},
    content: {type: String},
    comment: {type: Array},
    sendTime: {type: Date, default: Date.now()}
});

msgSchema.statics = {
    fetch: function (lastMsgSendTime, cb) {
        var obj = {};
        if (lastMsgSendTime) {
            obj = {sendTime: {$gt: lastMsgSendTime}};
        }
        return this.find(obj).sort({'sendTime': 'desc'}).exec(cb);
    }
};

module.exports = msgSchema;