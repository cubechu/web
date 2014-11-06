var mongoose = require('mongoose');
var cmtSchema = new mongoose.Schema({
    receiverId: {type: String},
    receiverName: {type: String},
    cmtUserId: {type: String},
    cmtUserName: {type: String},
    cmtUserAvatar: {type: String},
    content: {type: String},
    msgId: {type: String},
    sendTime: {type: Date, default: Date.now()}
});

cmtSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort({'sendTime': 'desc'}).exec(cb);
    }
};

module.exports = cmtSchema;